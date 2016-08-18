/**
 * 博客管理控制逻辑
 * */

var _ = require('lodash');

var marked = require('marked');
var hljs   = require('../../node_modules/highlightjs/highlight.pack.js');
marked.setOptions({
  highlight: function(code, lang) {
    if (typeof lang === 'undefined') {
      return hljs.highlightAuto(code).value;
    } else if (lang === 'nohighlight') {
      return code;
    } else {
      return hljs.highlight(lang, code).value;
    }
  }
});
function updateExistingArticle(article, callback){

  var articleModel,
    categoryModel,
    archiveModel,
    tagsModel;
  var disconnectTagsArrayId = [],
    connectTagsArrayId = [];

  async.waterfall([
    /*Firstly, creating the non-existing related model*/
    function(callback){
      async.parallel([
        function(callback){
          if (article.articleStatus === "drafted"){
            callback(null, "Nothing to create");
          }else {
            Archive.findOrCreate({archiveTime: article.archiveTime.substr(0, 7)}, {archiveTime: article.archiveTime.substr(0, 7)}, callback);
          }
        },
        function(callback){Category.findOrCreate({name: article.cat}, {name: article.cat},callback);},
        function(callback){async.map(article.tagsArray, function(tag,callback){Tags.findOrCreate({name:tag},{name:tag},callback);},callback)}
      ],function(error, results){
        /*If any creating model failure, this process
         should be stop and return the error to client*/
        if (error){
          sails.log.error(error);
          callback(error, null);
        }else {
          archiveModel = results[0];
          categoryModel = results[1];

          tagsModel = results[2];
          for (var index = 0; index < results[2].length; index++){
            connectTagsArrayId.push(results[2][index].id);
          }
          callback(null, results);
        }
      });
    },
    /*Secondly getting the old Archive/Category/Tags Model which association with the Article Model*/
    function(results,callback){
      Article.findOne({id: article.id}).populate('tags').exec(callback);
    },
    function(article,callback){
      for (var index = 0; index < article.tags.length; index++){
        disconnectTagsArrayId.push(article.tags[index].id);
      }
      callback();
    },
    /*Thirdly, updating the Article Model*/
    function(callback){
      var updateArticle = {};
      updateArticle.title = article.title;
      updateArticle.content = article.content;
      updateArticle.previewText = marked(article.content);
      updateArticle.slug = article.slug;
      updateArticle.digest = article.digest;
      updateArticle.articleStatus = article.articleStatus;
      updateArticle.tagsArray = article.tagsArray;
      if (article.articleStatus === "published"){
        updateArticle.archiveTime = article.archiveTime;
        updateArticle.archive = archiveModel.id;
      }
      updateArticle.category = categoryModel.id;
      updateArticle.owner = article.owner.id;

      /*So strange for this: if I want to organise a object to pass to update,
      * it should be use the model id, and if use the inline object, just use
      * model object!!!*/

      Article.update({id: article.id},updateArticle, callback);
    },
    /*Fourthly, Remove the old tags model relation*/
    function (updateArticle, callback){
      console.log('Enter the 4 async');
      articleModel = updateArticle[0];
      articleModel.tags.remove(disconnectTagsArrayId);
      articleModel.save(callback);
    },
    function (callback){
      articleModel.tags.add(connectTagsArrayId);
      articleModel.save(callback);
    }
  ], function(err, result){
    if (err){
      sails.log.error(err);
      callback(err, null);
    }else{
      callback(err, result);
    }
  });
}

function createNewArticle(article, callback){

  var articleModel,
    categoryModel,
    archiveModel,
    tagsModel;

  async.waterfall([
    /*Firstly create the related model which article mapping*/
    function(callback){
      async.parallel([
          function(callback){
            if (article.articleStatus === "drafted"){
              callback(null, "Nothing to create");
            }else{
              Archive.findOrCreate({archiveTime: article.archiveTime.substr(0, 7)}, {archiveTime: article.archiveTime.substr(0, 7)}, callback);
            }
          },
          function(callback){Category.findOrCreate({name: article.cat}, {name: article.cat},callback);},
          function(callback){async.map(article.tagsArray, function(tag,callback){Tags.findOrCreate({name:tag},{name:tag},callback)},callback)}
      ],function(error, results){
        /*If any creating model failure, this process
          should be stop and return the error to client*/
        if (error){
            sails.log.error(error);
            callback(error, null);
        }else{
            archiveModel = results[0];
            categoryModel = results[1];
            tagsModel = results[2];
            callback(null, results);
        }
      })
    },
    /*Secondly Create the article model*/
    function(result, callback){
      var newArticle = {};
      newArticle.title = article.title;
      newArticle.content = article.content;
      newArticle.previewText = marked(article.content);
      newArticle.slug = article.slug;
      newArticle.digest = article.digest;
      newArticle.articleStatus = article.articleStatus;
      newArticle.tagsArray = article.tagsArray;
      if (article.articleStatus === "published"){
        newArticle.archiveTime = article.archiveTime;
        newArticle.archive = archiveModel;
      }
      newArticle.category = categoryModel;
      newArticle.owner = article.owner;
      newArticle.author = article.owner.fullname;
      newArticle.pageViews = [];
      Article.create(newArticle, callback);
    },
    /*Thirdly mapping the Tags model to Article model*/
    function(newArticle, callback){
      articleModel = newArticle;
      var tagsModelId = [];

      for (var index = 0; index < tagsModel.length; index++){
        tagsModelId.push(tagsModel[index].id);
      }
      /*As the tag model is many-to-many association with article,
        so using the array to bind each other*/
      articleModel.tags.add(tagsModelId);
      articleModel.save(callback);
    }
  ],function(err){
    if (err){
      sails.log.error(err);
      callback(err, ~0);
    }else{
      callback(null, articleModel.id);
    }
  });
};

function prepareCommonParameter(req, status){
  var tagsArray = [],
      tags = "";

  tags = req.param('tags');

  /*transfer the tags string to array*/
  if (tags !== ""){
    tagsArray = tags.split("&");
  }

  var article = {
    title: req.param('title'),
    content: req.param('content'),
    slug: req.param('slug'), /*This slug has ensure unique, which format is title-2016-07-07-20-20*/
    owner: req.session.user,
    articleStatus: status,
    /*Now this archiveTime format is 2016-07-10 14:28, and if this article is draft,
    * this parameter is empty, or we should truncate the head part to store in the
    * archive model*/
    archiveTime: req.param('publishTime'),
    digest: req.param('summary'),
    id: req.param('id'), /*If this value equal to undefined, indicates that this article is a new one.*/
    cat: req.param('cat') === undefined ? "未分类" : req.param('cat'),
    tagsArray: tagsArray
  };

  return article;
};

module.exports = {

  saveDraft: function(req,res){
    var article = prepareCommonParameter(req, "drafted");

    /*If this article has not existing in the database*/
    if (article.id === undefined){
      createNewArticle(article, function(err, articleIndex){
        if(err){
          sails.log.error(err);
          return res.json(200, {error: err});
        }else{
          console.log("Send the Ok to client");
          res.json(200, {
            articleIdx: articleIndex,
            title: article.title,
            slug: article.slug
          });
        }
      });
    }else{
      updateExistingArticle(article, function(err, result){
        if(err){
          sails.log.error(err);
          return res.json(200, {error: err});
        }else{
          return res.json(200, {
            articleIdx: article.id,
            title: article.title,
            slug: article.slug
          });
        }
      });
    }
  },
  publish: function (req,res){
    var article = prepareCommonParameter(req, "published");

    /*If this article has not existing in the database*/
    if (article.id === undefined){
      createNewArticle(article,  function(err, articleIndex){
        if(err){
          sails.log.error(err);
          return res.json(200, {error: err});
        }else{
          res.json(200, {
            articleIdx: articleIndex,
            title: article.title,
            slug: article.slug
          });
        }
      });
    }else {
      updateExistingArticle(article, function (err, result){
        if (err) {
          sails.log.error(err);
          return res.json(200, { error: err });
        } else {
          return res.json(200, {
            articleIdx: article.id,
            title: article.title,
            slug: article.slug
          });
        }
      });
    }
  },

  delete: function(req, res){
    var index = req.param('id');

    Article.destroy({id : index}).exec(function deleteCB(err){
      if(err){
        sails.log.error('Failed to find article:', err);
        return res.negotiate(err);
      }
      else{
        return res.redirect('/douMi');
      }
    });
  },

  undoPub: function(req, res){
    var article = prepareCommonParameter(req, "drafted");

    updateExistingArticle(article,function(err, result){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err});
      }else{
        return res.json(200, {
          articleIdx: article.id,
          title: article.title,
          slug: article.slug
        });
      }
    });
  },

  updatePub: function(req, res){
    var article = prepareCommonParameter(req, "published");

    updateExistingArticle(article,function(err, result){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err});
      }else{
        return res.json(200, {
          articleIdx: article.id,
          title: article.title,
          slug: article.slug
        });
      }
    });
  },

  index: function (req,res){
    var page = req.param('page') ? req.param('page') : 1;
    var articleItems = [];
    Article.find({sort: 'updatedAt desc'}).paginate({page: page, limit: 10}).exec(function(error, articles){

      if (error) {
        sails.log.error(error);
        return res.negotiate(error);
      }

      _(articles).forEach(function(article) {
        var title = article.title;
        var content = article.previewText;
        var articleId = article.id;
        var stat = article.articleStatus;
        var timeDesc;
        var curTime = new Date();
        if (article.articleStatus === "published"){
          var publishYear = article.archiveTime.substr(0,4),
              publishMonth = article.archiveTime.substr(5,2),
              publishDay = article.archiveTime.substr(8,2),
              publishMinute = article.archiveTime.substr(11,2),
              publishSecond = article.archiveTime.substr(14,2);
          var yearOffset = curTime.getFullYear() - publishYear,
              monthOffset = (curTime.getMonth() + 1) - publishMonth,
              dayOffset = curTime.getDate() - publishDay,
              hoursOffset = curTime.getHours() - publishMinute,
              minutesOffset = curTime.getMinutes() - publishSecond;
          if (yearOffset > 0){
            timeDesc = yearOffset + ' 年前';
          }else if (monthOffset > 0){
            timeDesc = monthOffset + ' 个月前';
          }else if (dayOffset > 0){
            timeDesc = dayOffset + ' 天前';
          }else if (hoursOffset > 0){
            timeDesc = hoursOffset + ' 小时前';
          }else if (minutesOffset > 0){
            timeDesc = minutesOffset + ' 分钟前';
          }else{
            timeDesc = '30秒前';
          }
        }

        var articleItem = {
          title: title,
          content: content,
          status: stat,
          timeDescription: timeDesc,
          id: articleId
        };
        articleItems.push(articleItem);
      });

      if (page == 1){
        return res.view('blogManagement', {
          articleList: articleItems,
          navIndex: 1
        });
      }else{
        Article.count().exec(function(err, count){
          return res.json(200, {
            articleList: articleItems,
            count: count
          });
        });
      }
    });
  },

  show: function (req,res){

    var index = req.param('id');

    Article.find({id : index}).exec(function(error, articles){

      if (error) {
        sails.log.error(error);
        return res.negotiate(error);
      }
      if (articles.length === 0){
        return res.json({
          "err": "找不到对应的博客",
          "content": ""
        });
      }else{
        return res.json({
          "err": " ",
          "content": articles[0].previewText
        });
      }

    });
  },

  articleEdit: function(req, res){
    var articleId = req.param("id");
    var rule = /^[0-9a-zA-Z]*$/;
    var allNumOrNot = rule.test(articleId);
    if (articleId !== undefined && allNumOrNot == true ){

    async.parallel([
      function(callback){Article.findOne({id:articleId}).exec(callback)},
      function(callback){Article.findOne({id:articleId}).populate('archive').exec(callback)},
      function(callback){Article.findOne({id:articleId}).populate('category').exec(callback)},
      function(callback){Article.findOne({id:articleId}).populate('tags').exec(callback)},
      function(callback){Tags.find().exec(callback)},
      function(callback){Category.find().exec(callback)}
    ],function(error, results){
      if (error){
        sails.log.error(err);
        return res.negotiate(err);
      }
      var article = {
        id: results[0].id,
        title: results[0].title,
        slug: results[0].slug,
        content: results[0].content,
        preview: results[0].previewText,
        status: results[0].articleStatus,
        archive: results[0].archiveTime,
        category: results[2].category.name,
        tags: results[3].tags,
        allTags: results[4],
        allCats: results[5]
      };
      return res.view("articleEditor", {
          article: article,
          navIndex: 0
      });
    });
  }else{
      async.waterfall([
        function(callback){
          Tags.find().exec(callback);
        },

        function(tags, callback){
          Category.find().exec(function(error, cats){
          callback(null, tags, cats);
        });
                         }
        ], function(err, tags, cats){
          if(err){
            sails.log.error(err);
            return res.negotiate(err);
          }else{

            var article = {
              allTags: tags,
              allCats: cats
            };
            return res.view('articleEditor', {
              article: article,
              navIndex: 0
            });
       }
    });
  }
  }
};

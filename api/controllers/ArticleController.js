/**
 * 博客管理控制逻辑
 * */

var articleUtil = require('../../services/articleUtil.js');
var _ = require('lodash');

module.exports = {

  saveDraft: function(req,res){
    var article = articleUtil.prepareCommonParameter(req, "drafted");

    /*If this article has not existing in the database*/
    if (article.id === undefined){
      articleUtil.createNewArticle(article, function(err, articleIndex){
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
    }else{
      articleUtil.updateExistingArticle(article, function(err, result){
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
    var article = articleUtil.prepareCommonParameter(req, "published");

    /*If this article has not existing in the database*/
    if (article.id === undefined){
      articleUtil.createNewArticle(article,  function(err, articleIndex){
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
      articleUtil.updateExistingArticle(article, function (err, result){
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
    var article = articleUtil.prepareCommonParameter(req, "drafted");

    articleUtil.updateExistingArticle(article,function(err, result){
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
    var article = articleUtil.prepareCommonParameter(req, "published");

    articleUtil.updateExistingArticle(article,function(err, result){
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
    Article.find({sort: 'createdAt desc'}).paginate({page: page, limit: 10}).exec(function(error, articles){

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

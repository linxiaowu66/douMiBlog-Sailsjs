/**
 * 博客管理控制逻辑
 * */

var _ = require('lodash');

function updateExistingArticle(articleId, article, category, tagsArray, callback){

  var articleModel,
    categoryModel,
    archiveModel,
    tagsModel;
  var disconnectArchiveId = ~0,
    disconnectCategoryId = ~0,
    disconnectTagsArrayId = ~0;

  async.waterfall([
    function(callback){
      Blog.update(articleId, {
        name: article.name,
        content: article.content,
        createTime: article.createTime,
        blogStatus: article.blogStatus,
        url: article.url + "-" + articleId
      }).exec(callback);
    },
    function(updateArticle, callback){
      if (updateArticle.length !== 0){
        articleModel = updateArticle[0];
        Archive.findOrCreate({name: article.createTime}, {name: article.createTime}, callback);
      }else{
        var err = "article update failure at id: " + articleId;
        sails.log.error(err);
        callback(err, null);
      }
    },
    function(archive,callback){
      archiveModel = archive;
      Category.findOrCreate({name: category}, {name: category},callback);
    },
    function(category, callback){
      categoryModel = category;
      async.map(tagsArray, function(tag,callback){
        Tags.findOrCreate({name:tag},{name:tag},callback);
      },callback)
    },
    function(tags, callback){
      tagsModel = tags;

      async.parallel([
        function(callback){Blog.find({id: articleId}).populate('archive').exec(callback)},
        function(callback){Blog.find({id: articleId}).populate('category').exec(callback)},
        function(callback){Blog.find({id: articleId}).populate('tags').exec(callback)}
      ],function(error, results){
        if (error){
          sails.log.error(error);
          callback(error);
        }else{

          if (article.createTime !== results[0][0].archive[0].name){
            disconnectArchiveId = results[0][0].archive[0].id;
          }

          if (category !== results[1][0].category[0].name){
            disconnectCategoryId = results[1][0].category[0].id;
          }

          async.map(results[2][0].tags, function(tag, callback){
            console.log(tag.name);
            articleModel.tags.remove(tag.id);
            articleModel.save(callback);
          },callback);
        }
      });
    },
    function(result, callback){

      if (disconnectArchiveId >= 0){
        articleModel.archive.remove(disconnectArchiveId);
        articleModel.archive.add(archiveModel.id);
      }
      if (disconnectCategoryId >= 0){
        articleModel.category.remove(disconnectCategoryId);
        articleModel.category.add(categoryModel.id);
      }
      async.map(tagsModel, function(tag, callback){
        articleModel.tags.add(tag.id);
        articleModel.save(callback);
      },callback)
    }
  ], function(err, result){
    callback(err, result);
  });
}

function createNewArticle(article, category, tagsArray,callback){

  var articleModel,
    categoryModel,
    archiveModel,
    tagsModel;

  async.waterfall([
    function(callback){
      Blog.create(article, callback);
    },
    function(newBlog, callback){
      articleModel = newBlog;
      Archive.findOrCreate({name: article.createTime}, {name: article.createTime}, callback);
    },
    function(newArchive,callback){
      archiveModel = newArchive;
      Category.findOrCreate({name: category}, {name: category},callback);
    },

    function(newOrCreatedCat, callback){
      categoryModel = newOrCreatedCat;
      async.map(tagsArray, function(tag,callback){
        Tags.findOrCreate({name:tag},{name:tag},callback);
      },callback)
    },
    function(Tags, callback){
      async.map(Tags, function(tag, callback){
        articleModel.tags.add(tag.id);
        articleModel.save(callback);
      },callback)
    },
    function(result, callback){
      console.log('Enter the last async');
      articleModel.user.add(req.session.user);
      articleModel.category.add(categoryModel.id);
      articleModel.archive.add(archiveModel.id);
      articleModel.save(callback);
    },
    function(results, callback){
      console.log("creating URL......................");
      var newURL = articleModel.url + "-" + articleModel.id;
      Blog.update(articleModel.id, {
        url: newURL
      }).exec(callback);
    }
  ],function(err, result){
    if (){
      
    }
    callback(err, articleModel.id);
  });
}

module.exports = {

  saveDraft: function(req,res){
    var article = {};
    var tags = {},
        category = "",
      /*using this value to distinguish this article is newly created or updated*/
        articleId = ~0;


    articleId = parseInt(req.param('id'));

    article.name = req.param('Name');
    article.content = req.param('text');
    article.url = req.param('url');
    article.owner = req.session.user;
    article.blogStatus = "draft";
    article.createTime = req.param('publishTime');
    tags = req.param('tags');
    category = req.param('cat') === undefined ? "未分类" : req.param('cat');

    /*transfer the tags string to array*/
    var tagsArray = tags.split("&");

    /*If this article has not existing in the database*/
    if (articleId === ~0){
      createNewArticle(article, category, tagsArray, function(err, articleIndex){
        if(err){
          sails.log.error(err);
          return res.json(200, {error: err});
        }else{
          console.log("Send the Ok to client");
          res.json(200, {articleidx: articleIndex});
        }
      });
    }else{
      updateExistingArticle(articleId, article, category, tagsArray, function(err, result){
        if(err){
          sails.log.error(err);
          return res.json(200, {error: err});
        }else{
          return res.json(200, {articleidx: articleId});
        }
      });
    }

  },

  index: function (req,res){
    var blogItems = [];
    var index = 0;
    Blog.find().exec(function(error, articles){

      if (error) {
        sails.log.error(error);
        return res.negotiate(error);
      }

      _(articles).forEach(function(blog) {
        var articleName = blog.name;
        var text = blog.content;
        var blogId = blog.id;
        var stat = blog.blogStatus;
        var timeDesc;
        var curTime = new Date();
        var timeOffset = Math.floor((curTime.getTime() - blog.createdAt.getTime())/1000);
        var leftDay = Math.floor(timeOffset/60/60/24);
        var leftHours = Math.floor(timeOffset/60/60%24);
        var leftMinutes = Math.floor(timeOffset/60%60);
        var leftSeconds = Math.floor(timeOffset%60);

        if (leftDay != 0){
          if (parseInt(leftDay / 365)){
            timeDesc = parseInt(leftDay / 365) + ' 年前';
          }else if (parseInt(leftDay / 30)){
            timeDesc = parseInt(leftDay / 30) + ' 个月前';
          }else{
            timeDesc = leftDay + ' 天前';
          }
        }else if (leftHours != 0){
          timeDesc = leftHours + ' 小时前';
        }else if(leftMinutes != 0){
          timeDesc = leftMinutes + ' 分钟前';
        }else{
          timeDesc = leftSeconds + ' 秒前';
        }

        var blogItem = {
          name: articleName,
          text: text,
          status: stat,
          timeDescription: timeDesc,
          id: blogId
        };
        blogItems.push(blogItem);
      });

      return res.view('blog-management', {
        blogList: blogItems,
        navIndex: 1
      });

    });
  },

  publish: function (req,res){
    var article = {};
    var tags = {},
      category = "",
    /*using this value to distinguish this article is newly created or updated*/
      articleId = ~0;


    articleId = parseInt(req.param('id'));

    article.name = req.param('Name');
    article.content = req.param('text');
    article.owner = req.session.user;
    article.blogStatus = "publish";
    article.createTime = req.param('publishTime');
    tags = req.param('tags');
    category = req.param('cat') === undefined ? "未分类" : req.param('cat');

    /*transfer the tags string to array*/
    var tagsArray = tags.split("&");

    updateExistingArticle(articleId, article, category, tagsArray,function(err, result){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err});
      }else{
        return res.json(200, {articleidx: articleId});
      }
    });

  },

  delete: function(req, res){
    var index = req.param('id');

    Blog.destroy({id : index}).exec(function deleteCB(err){
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
    var article = {};
    var tags = {},
      category = "",
    /*using this value to distinguish this article is newly created or updated*/
      articleId = ~0;


    articleId = parseInt(req.param('id'));

    article.name = req.param('Name');
    article.content = req.param('text');
    article.owner = req.session.user;
    article.blogStatus = "draft";
    article.createTime = req.param('publishTime');
    tags = req.param('tags');
    category = req.param('cat') === undefined ? "未分类" : req.param('cat');

    /*transfer the tags string to array*/
    var tagsArray = tags.split("&");

    updateExistingArticle(articleId, article, category, tagsArray,function(err, result){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err});
      }else{
        return res.json(200, {articleIdx: articleId});
      }
    });
  },

  updatePub: function(req, res){
    var article = {};
    var tags = {},
      category = "",
    /*using this value to distinguish this article is newly created or updated*/
      articleId = ~0;


    articleId = parseInt(req.param('id'));

    article.name = req.param('Name');
    article.content = req.param('text');
    article.owner = req.session.user;
    article.blogStatus = "publish";
    article.createTime = req.param('publishTime');
    tags = req.param('tags');
    category = req.param('cat') === undefined ? "未分类" : req.param('cat');

    /*transfer the tags string to array*/
    var tagsArray = tags.split("&");

    updateExistingArticle(articleId, article, category, tagsArray,function(err, result){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err});
      }else{
        return res.json(200, {articleIdx: articleId});
      }
    });
  },

  show: function (req,res){

    var index = req.param('id');

    Blog.find({id : index}).exec(function(error, articles){

      if (error) {
        sails.log.error(error);
        return res.negotiate(error);
      }

      return res.json({
        "err": " ",
          "content": articles[0].content
      });
    });
  },

  update: function(req, res){
    var articleId = req.param("id");
    var rule = /^[0-9]*$/;
    var allNumOrNot = rule.test(articleId);
    if (articleId !== undefined && rule == true ){

    async.parallel([
      function(callback){Blog.find({id:articleId}).exec(callback)},
      function(callback){Blog.find({id:articleId}).populate('category').exec(callback)},
      function(callback){Blog.find({id:articleId}).populate('tags').exec(callback)},
      function(callback){Tags.find().exec(callback)},
      function(callback){Category.find().exec(callback)}
    ],function(error, results){

      var article = {
        id: results[0][0].id,
        title: results[0][0].name,
        content: results[0][0].content,
        status: results[0][0].blogStatus,
        archive: results[0][0].createTime,
        category: results[1][0].category[0].name,
        tags: results[2][0].tags,
        allTags: results[3],
        allCats: results[4]
      };
      return res.view("blog-creation", {
          article: article
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
            return res.view('blog-creation', {
              article: article
            });
       }
    });
  }
  }
};

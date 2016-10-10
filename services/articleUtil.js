'user strict';

var marked = require('marked');
var hljs   = require('../node_modules/highlightjs/highlight.pack.js');
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
module.exports = {

  updateExistingArticle: function(article, callback){

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
      /*Secondly getting the old Tags Model which association with the Article Model*/
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
        } else {
          updateArticle.archiveTime = undefined;
          updateArticle.archive = undefined;
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
        articleModel = updateArticle[0];
        articleModel.tags.remove(disconnectTagsArrayId);
        articleModel.save(callback);
      },
      /*Finally, Add the new tags model relation*/
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
  },

  createNewArticle: function(article, callback){

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
  },

  prepareCommonParameter: function(req, status){
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
  }

}

/**
 * 博客管理控制逻辑
 * */

var _ = require('lodash');

module.exports = {

  saveDraft: function(req,res){
    var newArticle = {};
    var tags = {},
        category = "",
        articleName = "";
    var newPostModel,
        newCatModel,
        newArchModel;

    articleName = req.param('Name');

    newArticle.name = articleName;
    newArticle.content = req.param('text');
    newArticle.owner = req.session.user;
    newArticle.blogStatus = "draft";
    newArticle.createTime = req.param('publishTime');
    tags = req.param('tags');
    category = req.param('cat');

    /*transfer the tags string to array*/
    var tagsArray = tags.split("&");

    Blog.findOne({name: articleName}).exec(function(error, article){
        /*if error has found*/

        /*If this article has not existing in the database*/
        if (article === undefined){
  	              
    	async.waterfall([
      function(callback){
        Blog.create(newArticle, callback);
      },
      function(newBlog, callback){
          newPost = newBlog;
          Archive.findOrCreate({name: createTime}, {name: createTime}, callback);
      },
      function(newArchive,callback){
	    newArchModel = newArchive;
        Category.findOrCreate({name: category}, {name: category},callback);
      },
      	
      function(newOrCreatedCat, callback){
	newCatModel = newOrCreatedCat;
	async.map(tagsArray, function(tag,callback){
	  console.log(tag);
	  Tags.findOrCreate({name:tag},{name:tag},callback);
	},callback)
      },
      function(Tags, callback){
	async.map(Tags, function(tag, callback){
	  console.log(tag.name);
	  newPost.tags.add(tag.id);
	  newPost.save(callback);
	},callback)
      },
      function(callback){
        console.log('Enter the last async');	
        newPost.user.add(req.session.user);
	newPost.category.add(newCatModel.id);
	newPost.save(callback);
      }
    ], function(err){
      if(err){
        sails.log.error(err);
        return res.json(200, {error: err);
      }else{
          return res.json(200);
      }

    });
        }
    });

  },

  index: function (req,res){
    var blogItems = [];
    Blog.find().exec(function(error, articles){

      if (error) {
        sails.log.error(error);
        return res.negotiate(error);
      }

      _(articles).forEach(function(blog) {
        var articleName = blog.name;
        var text = blog.content;
        var blogId = blog.id;
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

  doCreate: function (req,res){

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
        console.log(tags.length);
        console.log(cats.length);
        return res.view('blog-creation', {
          navIndex: 0,
          tags: tags,
          cats: cats
        });
      }

    });


  },

  show: function (req,res){

    var index = parseInt(req.body.reqIndex);

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
  }
};

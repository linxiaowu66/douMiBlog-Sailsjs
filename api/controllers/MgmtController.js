/**
 * 博客管理控制逻辑
 * */

var _ = require('lodash');

module.exports = {

  createBlog: function(req,res){
    var newArticle = {};
    var tags = {},
        category;

    newArticle.name = req.param('Name');
    newArticle.content = req.param('text');
    newArticle.owner = req.session.user;

    tags = req.param('tags');
    category = req.param('cat');

    console.log(newArticle.name);
    console.log(newArticle.content);
    console.log(newArticle.owner);
    console.log(tags);

    /*transfer the tags string to array*/
    var tagsArray = tags.split(";");

    for (var index = 0; index < tagsArray.length; index++){
      Tags.findOrCreate({name: tagsArray[index]}, {name: tagsArray[index]}).exec(function createFindCB(error, createdOrFoundRecords){
        console.log('Create a tag named = ' + createdOrFoundRecords.name);
      });
    }

    Category.findOrCreate({name: category}, {name: category}).exec(function createFindCB(error, createdOrFoundRecords){
      console.log('Create a Category named = ' + createdOrFoundRecords.name);
    });

    async.waterfall([
      function(callback){
        Blog.create(newArticle, callback);
      },

      function(newBlog, callback){
        newBlog.user.add(req.session.user);
        newBlog.category.add(req.param('category'));
        newBlog.archive.add(newBlog.createdAt);
        for (var index = 0; index < tagsArray.length; index++) {
          newBlog.tags.add(tagsArray[index]);
        }
        newBlog.save(callback);
      }
    ], function(err, createdBlog){
      if(err){
        sails.log.error(err);
        return res.negotiate(err);
      }else{
          return res.redirect('/blog-management');
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

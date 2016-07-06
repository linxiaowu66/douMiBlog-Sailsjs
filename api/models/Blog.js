/**
 * Blog.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var map = function () {
  // 分类依据组成为："用户ID:标签"
  this.tags.forEach(function (tag) {
    emit(tag, 1);
  });
};
var reduce = function (k, values) {
  var total = 0;
  for (var i = 0; i < values.length; i++) {
    total += values[i];
  }
  return total;
};

module.exports = {

  attributes: {
    name: 'string',
    content: 'string',
    createTime: 'string',
    url: "string",
    description: "string",
    blogStatus: {
      type: 'string',
      enum: ['draft', 'publish']
    },
    tagsArray:  {
      type: 'array'
    },
    catString: 'string',
    owner: {
      model: 'user'
    },
    user: {
      collection: 'User',
      via: 'blog'
    },
    tags: {
      collection: 'Tags',
      via: 'blog',
      dominant: true
    },
    archive: {
      collection: 'Archive',
      via: 'blog'
    },
    category: {
      collection: 'Category',
      via: 'blog'
    }

  },

  /*beforeValidate: function(article,cb){
    if(article.tags.length) {
      var rowTags = article.tags[0].split(" ");
      article.tags = [];
      // 去除空标签及重复标签
      for(var i=0;i<rowTags.length;i++){
        var tag = rowTags[i].replace(" ","");
        if(tag.length>0 && (article.tags.indexOf(tag)<0)){
          article.tags.push(tag);
        }
      }
    }
    cb();
  },
  // 每次文章创建完成，更新标签统计
  afterCreate: function (article, cb) {
   this.updateTags();
   cb();
   },
  //custom
  updateTags: function () {
    Blog.native(function (err, collection) {
      if (err) return res.serverError(err);
      collection.mapReduce(map, reduce, {out: "tags"});
    });
  }*/
};

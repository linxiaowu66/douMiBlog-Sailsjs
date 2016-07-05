/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
DEFAULT_NAME = "未分类";
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    numOfArticle: 'integer',
    blog: {
      collection: 'blog',
      via: 'category'
    },
    // 获得默认分类名
    getDefault: function(){
      return DEFAULT_NAME;
    }
  },

/*  afterCreate: function(category, cb){
    //this.updateNumOfArticles(category, cb);
    Category.find({name: category.name}).populate('blog').exec(function(err, blogs){
      sails.log.error("===[%d]",blogs.length);
      this.numOfArticle = blogs.length;
      cb();
    });
  },

  afterUpdate: function(category, cb){
    Category.find({name: category.name}).populate('blog').exec(function(err, blogs){
      sails.log.error("===[%d]",blogs.length);
      this.numOfArticle = blogs.length;
      cb();
    });
  },

  updateNumOfArticles: function(category, cb){

  }*/
};

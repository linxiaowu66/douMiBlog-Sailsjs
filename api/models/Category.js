/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      defaultsTo: "未分类"
    },
    numOfArticles: 'integer',
    articles: {
      collection: 'article',
      via: 'category'
    }
  },

  /*afterCreate: function(category, cb){
    //this.updateNumOfArticles(category, cb);
    Category.find({name: category.name}).populate('articles').exec(function(err, articles){
      sails.log.error("===[%d]",articles.length);
      this.numOfArticle = articles.length;
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

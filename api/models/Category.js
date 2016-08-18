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
    articles: {
      collection: 'article',
      via: 'category'
    }
  },

  afterCreate: function(category, cb){
    Category.findOne({id: category.id}).populate('articles').exec(function(err, category){
      this.numOfArticles = category.articles.length;
      cb();
    });
  },

  afterUpdate: function(category, cb){
    Category.findOne({id: category.id}).populate('articles').exec(function(err, category){
      this.numOfArticles = category.articles.length;
      cb();
    });
  },

  updateNumOfArticles: function(category, cb){
    Category.findOne({id: category.id}).populate('articles').exec(function(err, category){
      this.numOfArticles = category.articles.length;
      cb();
    });
  }
};

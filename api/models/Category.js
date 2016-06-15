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
    blog: {
      collection: 'blog',
      via: 'category'
    },
    // 获得默认分类名
    getDefault: function(){
      return DEFAULT_NAME;
    }
  },
};

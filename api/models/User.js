/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
    fullname: {
      type: 'string',
      defaultsTo: 'Anonymous'
    },
    description: {
      type: 'string'
    },
    email: {
      type: 'email',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    numOfArticles: {
      type: 'integer',
      defaultsTo: 0
    },
    articles: {
      collection: 'article',
      via: 'owner'
    },
  },

  // 创建（注册）用户前，对用户密码加密
  beforeCreate: function (values, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(values.password, salt, function(err, hash) {
        if(err) return cb(err);
        values.password = hash;
        // 执行用户定义回调
        cb();
      });
    });
  },

  afterCreate: function (createdUser, cb) {
    this.updateSite(createdUser);
    this.updateNumOfArticles(createdUser);
    cb();
  },

// 用户信息更新时，更新站点信息
  afterUpdate: function (user,cb) {
    this.updateSite(user);
    this.updateNumOfArticles(user);
    cb();
  },

// 更新站点信息
  updateSite: function(user){
    if (user.email === "linguang661990@126.com"){
      sails.config.douMi.miMiName = user.fullname;
      sails.config.douMi.miMiDesc = user.description;
    }else{
      sails.config.douMi.douDouName = user.fullname;
      sails.config.douMi.douDouDesc = user.description;
    }
  },

  updateNumOfArticles: function(createdUser){
    User.findOne({id: createdUser.id}).populate('articles').exec(function(err, user){
      this.numOfArticles = user.articles.length;
    });
  }
};

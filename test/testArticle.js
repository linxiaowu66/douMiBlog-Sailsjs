'use strict';

var supertest = require('supertest');
var should  = require('should');
var articleUtil = require('../services/articleUtil.js');

var init_user = function(user_name, email, password){
  var user = {};
  user.fullname = user_name;
  user.email = email;
  user.password = password;
  return user;
};

var init_article = function(userModel){
  return {
    title: '新建博客测试',
    content: '## 测试博客的内容',
    slug: 'xin-jian-bo-ke-ce-shi-1',
    owner: userModel,
    articleStatus: 'drafted',
    archiveTime: '2016-10-10 22:28',
    digest: '测试博客的内容',
    cat: '测试',
    tagsArray: ['测试一','测试二'],
  }
};

var update_article_title = function(userModel, id){
  return {
    title: '修改博客测试',
    content: '## 测试博客的内容',
    slug: 'xin-jian-bo-ke-ce-shi-1',
    owner: userModel,
    articleStatus: 'drafted',
    archiveTime: '2016-10-10 22:28',
    digest: '测试博客的内容',
    cat: '测试',
    tagsArray: ['测试一','测试二'],
    id: id
  }
}

var update_article_category_tags = function(userModel, id){
  return {
    title: '修改博客测试',
    content: '## 测试博客的内容',
    slug: 'xin-jian-bo-ke-ce-shi-1',
    owner: userModel,
    articleStatus: 'drafted',
    archiveTime: '2016-10-10 22:28',
    digest: '测试博客的内容',
    cat: '测试一',
    tagsArray: ['测试三','测试二'],
    id: id
  }
}

var update_article_status = function(userModel, id, status){
  return {
    title: '修改博客测试',
    content: '## 测试博客的内容',
    slug: 'xin-jian-bo-ke-ce-shi-1',
    owner: userModel,
    articleStatus: status,
    archiveTime: '2016-10-10 22:28',
    digest: '测试博客的内容',
    cat: '测试一',
    tagsArray: ['测试三','测试二'],
    id: id
  }
}

describe('article CRUD', function() {

  var userModel;

  before(function(done){
    var user = init_user('linxiaowu', 'linguang661990@126.com', '123456');

    User.create(user)
    .then(function(user){
      userModel = user;
      done();
    })
    .catch(done);
  })
  it('should create a new drafted article successfully', function(done) {
    var article = init_article(userModel);
    articleUtil.createNewArticle(article, function(err, articleIndex){
      if(err){
        done(err)
      }else{
        async.parallel([
          function(callback){Article.findOne({title: '新建博客测试'}).exec(callback)},
          function(callback){Article.findOne({title: '新建博客测试'}).populate('archive').exec(callback)},
        ],function(error, results){
          results[0].slug.should.be.equal('xin-jian-bo-ke-ce-shi-1');
          should.not.exist(results[1].archiveTime);
          should.not.exist(results[1].archive);
          done(err);
        })
      }
    });
  });
  it('should update a drafted article title successfully', function(done) {
    Article.findOne({title: '新建博客测试'}).exec(function(err, record){
      var article = update_article_title(userModel, record.id);
      articleUtil.updateExistingArticle(article, function(err, articleIndex){
        if(err){
          done(err)
        }else{
          Article.findOne({title: '修改博客测试'}).exec(function(err, result){
            record.slug.should.be.equal('xin-jian-bo-ke-ce-shi-1');
            done(err);
          });
        }
      });
    })
  });
  it('should update a drafted article category successfully', function(done) {
    Article.findOne({title: '修改博客测试'}).exec(function(err, record){
      var article = update_article_category_tags(userModel, record.id);
      articleUtil.updateExistingArticle(article, function(err, articleIndex){
        if(err){
          done(err)
        }else{
          async.parallel([
            function(callback){Article.findOne({title: '修改博客测试'}).populate('category').exec(callback)},
            function(callback){Article.findOne({title: '修改博客测试'}).populate('tags').exec(callback)},
          ],function(error, results){
            results[0].category.name.should.be.equal('测试一');
            results[1].tags.length.should.be.equal(2);
            results[1].tags[0].name.should.be.equal('测试二');
            results[1].tags[1].name.should.be.equal('测试三');
            done(err);
          })
        }
      });
    })
  });
  it('should change article statue to from draft to publish successfully', function(done) {
    Article.findOne({title: '修改博客测试'}).exec(function(err, record){
      var article = update_article_status(userModel, record.id, 'published');
      articleUtil.updateExistingArticle(article, function(err, articleIndex){
        if(err){
          done(err)
        }else{
          async.parallel([
            function(callback){Article.findOne({title: '修改博客测试'}).exec(callback)},
            function(callback){Article.findOne({title: '修改博客测试'}).populate('archive').exec(callback)},
          ],function(error, results){
            results[0].articleStatus.should.be.equal('published');
            results[1].archive.archiveTime.should.be.equal('2016-10');
            done(err);
          })
        }
      });
    })
  });
  it('should change article statue from publish to draft successfully', function(done) {
    Article.findOne({title: '修改博客测试'}).exec(function(err, record){
      var article = update_article_status(userModel, record.id, 'drafted');
      articleUtil.updateExistingArticle(article, function(err, articleIndex){
        if(err){
          done(err)
        }else{
          async.parallel([
            function(callback){Article.findOne({title: '修改博客测试'}).exec(callback)},
            function(callback){Article.findOne({title: '修改博客测试'}).populate('archive').exec(callback)},
          ],function(error, results){
            //console.log(results);
            should.not.exist(results[1].archiveTime);
            should.not.exist(results[1].archive);
            done(err);
          })
        }
      });
    })
  });
});

'use strict';

var supertest = require('supertest');
var should  = require('should');

describe('blog auth', function() {

  before(function(done){
    // clean all user model before this test case begin
    User.destroy({})
    .then(function(){
      done();
    })
    .catch(done);
  })

  it('should redirect to register page when none users existing in the system', function(done) {

    supertest(sails.hooks.http.app)
      .get('/login')
      .expect(302)
      .expect('location', '/register', done);
      /*.end(function(err, res) {
        if (err) return done(err);
        //res.header.should.have.property('location', '/register');
        // also we can use the should-http to use 'res.should.have.header'
        // should.equal(res.header.location, '/register')
        res.header['location'].should.equal('/register');
        done(err);
      });*/
  });

  describe('User creation', function(){
    it('should create a user sucessfully', function(done) {

      supertest(sails.hooks.http.app)
        .post('/register')
        .send({
          email: 'linguang661990@126.com',
          password: '123456',
          fullname: 'linxiaowu'
        })
        .expect(302)
        .expect('location', '/login', done);
    });

    it('should login sucessfully', function(done) {

      supertest(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'linguang661990@126.com',
          password: '123456'
        })
        .expect(200)
        .end(function(err, res) {
          if (err) {
            console.log(res.text);
            return done(err);
          }
          done();
        });
    });
    it('should not create two more users', function(done) {

      supertest(sails.hooks.http.app)
        .post('/register')
        .send({
          email: 'linguang881990@163.com',
          password: '123456',
          fullname: 'linxiaowu66'
        })
        .expect(302)
        .end(function(err, res) {
          if (err) {
            console.log(res.text);
            return done(err);
          } /*It only intercept when you jump to register page, so...*/
          supertest(sails.hooks.http.app)
            .get('/register')
            .expect(302)
            .expect('location', '/login', done);
        });
    });
  });

  describe('User login failure cases', function(){
    /*beforeEach(function(done){
      var user = init_user('linxiaowu', 'linguang661990@126.com', '123456');

      User.create(user)
      .catch(done);
    })*/
    // the test still use the last test condition, so not need to create user

    it('should login failure when the email is wrong', function(done) {

      supertest(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'linguang601990@126.com',
          password: '123456'
        })
        .expect(200)
        .expect('{\n  "error": "Incorrect email."\n}')
        .end(function(err, res) {
          if (err) {
            console.log(res.text);
            return done(err);
          }
          done();
        });
    });
    it('should login failure when the password is wrong', function(done) {

      supertest(sails.hooks.http.app)
        .post('/login')
        .send({
          email: 'linguang661990@126.com',
          password: '1234567'
        })
        .expect(200)
        .expect('{\n  "error": "Invalid Password"\n}')
        .end(function(err, res) {
          if (err) {
            console.log(res.text);
            return done(err);
          }
          done();
        });
    });
  });

});

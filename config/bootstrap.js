/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var schedule = require('node-schedule');
var _ = require('lodash');

function clearTodayVisitCounts(){
  console.log('New Day Has begun, current date is ', new Date());
  async.parallel([
    function(callback){Statistics.update({key: 0}, {todayVisitCounts: 0}, callback)},
    function(callback){Article.find({where: {articleStatus:"published"}}).exec(callback)}
  ],function(error, results){
    if (error){
      sails.log.error('update db has happened error: ' + error);
    }else{
      async.map(results[1], function(article, callback){
        Article.update({id: article.id}, {pageViews: []}, callback);
      },function(err,results) {
        if (error){
          sails.log.error('update db has happened error: ' + error);
        }else{
          /*ToDo....*/
        }
      });
    }
  });
}

module.exports.bootstrap = function(cb) {


  Statistics.findOrCreate({key: 0},{
    totalVisitCounts: 0,
    todayVisitCounts: 0,
    key: 0
  }).exec(function(err, record){

  })

  var rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(0, 6)];
  rule.hour = 0;
  rule.minute = 0;


  schedule.scheduleJob(rule, clearTodayVisitCounts);

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  // 启动时刷新站点信息
  User.find().exec(function(err,users){
    if(users.length > 0){
      for (var i = 0; i < users.length; i++){
        if (users.email === "linguang661990@126.com"){
          sails.config.douMi.miMiName = users[i].fullname;
          sails.config.douMi.miMiDesc = users[i].description;
        }else{
          sails.config.douMi.douDouName = users[i].fullname;
          sails.config.douMi.douDouDesc = users[i].description;
        }
      }
    }
    cb();
  });
};

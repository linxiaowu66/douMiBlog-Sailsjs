module.exports = function (req, res, next) {
  // 检查数据库中是否已经有两个用户，目前博客支持豆豆和米喳两位用户
  User.count().exec(function(err,count){
    if(count === 2){
      res.redirect('/login');
    }else {
      next();
    }
  });
};

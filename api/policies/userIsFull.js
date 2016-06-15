module.exports = function (req, res, next) {
  // 检查数据库中是否已经有两个用户，目前博客支持豆豆和米喳两位用户
  User.find().exec(function(err,users){
    if(users.length == 2){
      res.redirect('/login');
    }else {
      next();
    }
  });
};

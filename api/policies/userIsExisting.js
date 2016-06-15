module.exports = function (req, res, next) {
  // 检查数据库中是否已经有用户
  User.find().exec(function(err,users){
    if(users.length){
      next();
    }else {
      res.redirect('/register');
    }
  });
};

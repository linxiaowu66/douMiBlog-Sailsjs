

module.exports = {
  index: function(req, res){
    Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 5 }).exec(function(err, articles){
      if (err){
        return res.negotiate();
      }
      return res.view('index', {hotterArticles: articles});
    });
  }
}

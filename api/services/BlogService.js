module.exports = {
  fetchHottestArticles: function (limit) {
    return new Pormise((resolve, reject) => {
      Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit}).exec(function(err, articles){
        if (err){
          return reject(err);
        }
        return resolve(articles)
      });
    })
  }
}

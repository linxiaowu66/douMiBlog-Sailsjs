const { fetchHottestArticles } = require('../services/BlogService')

module.exports = {
  index: async function(req, res){
    try {
      const result = await fetchHottestArticles(5)

      return res.view('index', {hotterArticles: result})
    } catch(err) {
      return res.negotiate()
    }
  },
  fetchHottestArticle: function(req, res) {
    try {
      const { limit } = req.query
      const result = await fetchHottestArticles(limit)

      return res.json(result)
    } catch(err) {
      return res.status(200).json({
        status: 0,
        msg: '系统出错，请稍后重试'
      })
    }
  }
}

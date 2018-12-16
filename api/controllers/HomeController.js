const { fetchHottestArticles } = require('../services/BlogService')

module.exports = {
  index: async function(req, res){
    try {
      const result = await fetchHottestArticles(5)

      return res.view('index', {hotterArticles: result})
    } catch(err) {
      sails.log.error('fetch homepage error: ', err)
      return res.negotiate()
    }
  },
  fetchHottestArticle: async function(req, res) {
    try {
      const { limit } = req.query
      const result = await fetchHottestArticles(limit)

      return res.json({
        status: 1,
        data: result
      })
    } catch(err) {
      sails.log.error('fetch hottest articles error: ', err)
      return res.status(200).json({
        status: 0,
        msg: '系统出错，请稍后重试'
      })
    }
  }
}

const { fetchBlogStatistics, websiteChangelog } = require('../services/CommonService')

module.exports = {
  fetchWebsiteStat: async function(req, res) {
    try {
      const result = await fetchBlogStatistics()

      return res.json({
        status: 1,
        result
      })
    } catch(err) {
      console.log('****', err)
      return res.status(200).json({
        status: 0,
        msg: '系统出错，请稍后重试'
      })
    }
  },
  fetchWebsiteChangelog: function(req, res) {
    return res.json({
      status: 1,
      result: websiteChangelog()
    })
  }
}

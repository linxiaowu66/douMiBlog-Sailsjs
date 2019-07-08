const banner = require('./banner.json')
const allGoodsList = require('./allGoodsList.json')
const goodsCats = require('./goodsCats.json')
const goodsDetail = require('./allGoodsDetail.json')
const hottestKeys = require('./hottestKeywords.json')

module.exports = {
  index: function (req, res) {
    const hotGoodsList = []
    Object.keys(allGoodsList).map(cat => allGoodsList[cat].map(good => {
      if (good.isHot){
        hotGoodsList.push(good)
      }
    }))

    return res.json(200, {
      "errno": 0,
      "data": {
        "banner": banner,
        "hotGoodsList": hotGoodsList.slice(0, 4),
        "floorGoodsList": [{
          "name": "鱼类",
          "goodsList": allGoodsList['1000000'].slice(0, 4),
          "id": 1000000
        }, {
          "name": "虾类",
          "goodsList": allGoodsList['2000000'].slice(0, 4),
          "id": 2000000
        }, {
          "name": "蟹类",
          "goodsList": allGoodsList['1000000'].slice(0, 4),
          "id": 3000000
        }, {
          "name": "软足类",
          "goodsList": allGoodsList['1000000'].slice(0, 2),
          "id": 4000000
        }]
      },
      "errmsg": "成功"
    })
  },
  goodsCount: function(req, res) {
    let goodsCount = 0
    Object.keys(allGoodsList).map(cat => goodsCount += allGoodsList[cat].length)
    return res.json(200, {
      "errno": 0,
      "data": goodsCount,
      "errmsg": "成功"
    })
  },
  categories: function(req, res) {
    const { catId } = req.query
    return res.json(200, {
      "errno": 0,
      "data": {
        "currentCategory": goodsCats[catId],
        "brotherCategory": goodsCats
      },
      "errmsg": "成功"
    })
  },
  goodsList: function(req, res) {
    const { categoryId, isHot, keyword } = req.query
    const hotGoodsList = []
    const searchGoodsList = []
    Object.keys(allGoodsList).map(cat => allGoodsList[cat].map(good => {
      if (good.isHot){
        hotGoodsList.push(good)
      }
      if (keyword && good.brief.match(keyword)) {
        searchGoodsList.push(good)
      }
    }))
    const list = isHot === 'true' ? hotGoodsList : keyword ? searchGoodsList : allGoodsList[categoryId]
    return res.json(200, {
      "errno": 0,
      "data": {
        "total": list.length,
        "pages": 1,
        "limit": 20,
        "page": 1,
        "list": list,
      },
      "errmsg": "成功"
    })
  },
  detail: function(req, res) {
    const { id } = req.query
    return res.json(200, {
      "errno": 0,
      "data": goodsDetail[id],
      "errmsg": "成功"
    })
  },
  hottestSearchKeywords: function(req, res) {
    return res.json(200, {
      "errno": 0,
      "data": hottestKeys,
      "errmsg": "成功"
    })
  }
}

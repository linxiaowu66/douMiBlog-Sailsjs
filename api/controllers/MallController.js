const banner = require('./banner.json')
const allGoodsList = require('./allGoodsList.json')
const goodsCats = require('./goodsCats.json')
const goodsDetail = require('./allGoodsDetail.json')

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
      "data": {
        "hotKeywordList": [{
          "id": 1,
          "keyword": "营养丰富",
          "url": "",
          "isHot": true,
          "isDefault": false,
          "sortOrder": 100,
          "addTime": "2018-02-01 00:00:00",
          "updateTime": "2019-04-18 16:04:15",
          "deleted": false
        }, {
          "id": 3,
          "keyword": "当季海鲜",
          "url": "",
          "isHot": true,
          "isDefault": false,
          "sortOrder": 100,
          "addTime": "2018-02-01 00:00:00",
          "updateTime": "2018-02-01 00:00:00",
          "deleted": false
        }, {
          "id": 4,
          "keyword": "容易烹饪",
          "url": "",
          "isHot": true,
          "isDefault": false,
          "sortOrder": 100,
          "addTime": "2018-02-01 00:00:00",
          "updateTime": "2018-02-01 00:00:00",
          "deleted": false
        }, {
          "id": 7,
          "keyword": "好吃不贵",
          "url": "",
          "isHot": true,
          "isDefault": true,
          "sortOrder": 8,
          "addTime": "2018-02-01 00:00:00",
          "updateTime": "2018-02-01 00:00:00",
          "deleted": false
        }],
        "historyKeywordList": []
      },
      "errmsg": "成功"
    })
  }
}

// 文章查询顺序：以创建时间逆序
FIND_ORDER = 'createdAt desc';
// 文章每页条目数
FIND_PER_PAGE = 5;

module.exports = {
  fetchHottestArticles: function (limit) {
    return new Promise((resolve, reject) => {
      Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit}).exec(function(err, articles){
        if (err){
          return reject(err);
        }
        return resolve(articles)
      });
    })
  },
  fetchArticleList: function(page) {
    return new Promise((resolve, reject) => {
      Article.find({
        sort: FIND_ORDER,
        where: {articleStatus:"published"}
      })
      .paginate({page: page, limit: FIND_PER_PAGE})
      .then(function (articles) {
        // 每篇文章转换
        // 查找分类,及标签
        return [
          articles,
          Article.count({where: {articleStatus:"published"}}),
        ];
      })
      .spread(function (articles,numOfArticles) {
        resolve({
          articles: articles.map(function(item){item.archiveTime = item.archiveTime.substr(0, 10);  return item;}),
          currentPage: page,
          pageUrl: '/blog/page',
          pageNum: Math.ceil(numOfArticles/FIND_PER_PAGE),
          breadcrumb: [],
        })
      })
    })
  },
  fetchCatList: function() {
    return new Promise((resolve, reject) => {
      Category
      .find()
      .populate('articles',{where: {articleStatus:"published"}})
      .exec((err, cats) => {
        if (err) {
          reject(err)
        }
        resolve(cats)
      })
    })
  },
  fetchTagsList: function() {
    return new Promise((resolve, reject) => {
      Tags.find().populate('articles',{where: {articleStatus:"published"}})
      .exec((err, tags) => {
        if (err) {
          reject(err)
        }
        resolve(tags)
      })
    })
  },
  fetchArchiveList: function() {
    return new Promise((resolve, reject) => {
      Archive.find().populate('articles',{where: {articleStatus:"published"}})
      .exec((err, archives) => {
        if (err) {
          reject(err)
        }
        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].articles.length
          };

          archiveArray.push(archive);
        }
        resolve(archiveArray)
      })
    })
  },
  fetchArticleDetail: function(articleUrl) {
    return new Promise((resolve, reject) => {
      Article.findOne({slug: articleUrl})
      .exec((err, article) => {
        if (err) {
          reject(err)
        }
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        // 改造显示归档时间
        article.archiveDay = article.archiveTime.substr(8, 2);
        article.archiveMonth = months[parseInt(article.archiveTime.substr(5, 2)) - 1];

        // 替换所有的http//: 为//:满足https的改造
        article.previewText = article.previewText.replace(/http:\/\//ig, '//')
        resolve(article)
      })
    })
  },
  fetchArticlesByCat: function(queryCategory, page) {
    return new Promise((resolve, reject) => {
      Category.findOne({name: queryCategory})
      .populate('articles',{
        where: {
          articleStatus:"published"
        },
        sort: FIND_ORDER,
        limit: FIND_PER_PAGE,
        skip: (page - 1) * FIND_PER_PAGE
      })
      .then((categories) => {
        return [
          categories.articles,
          Category.find({name: queryCategory}).populate('articles',{where: {articleStatus:"published" }})
        ]
      })
      .spread((articles,totalQueryArticles) => {
        resolve({
          articles,totalQueryArticles
        })
      })
    })
  },
  fetchArticlesByTag: function(queryTag, page) {
    return new Promise((resolve, reject) => {
      Tags.findOne({name: queryTag}).populate('articles',{
        where: {
          articleStatus:"published"
        },
        sort: FIND_ORDER,
        limit: 5,
        skip: (page - 1) * FIND_PER_PAGE
      })
      .then((tags) => {
        return [
          tags.articles,
          Tags.find({name: queryTag}).populate('articles',{where: {articleStatus:"published" }}),
        ]
      })
      .spread((articles,totalQueryArticles) => {
        resolve({
          articles,totalQueryArticles
        })
      })
    })
  },
  fetchArticlesByArchive: function(queryArchive, page) {
    return new Promise((resolve, reject) => {
      Archive.findOne({archiveTime: queryArchive}).populate('articles',{
        where: {
          articleStatus:"published"
        },
        sort: FIND_ORDER,
        limit: FIND_PER_PAGE,
        skip: (page - 1) * FIND_PER_PAGE
      })
      .then((archives) => {
        return [
          archives.articles,
          Archive.find({archiveTime: queryArchive}).populate('articles',{where: {articleStatus:"published" }})
        ]
      })
      .spread((articles,totalQueryArticles) => {
        resolve({
          articles,totalQueryArticles
        })
      })
    })
  },
  fetchArticlesByUser: function(queryUser, page) {
    return new Promise((resolve, reject) => {
      User.findOne({fullname: queryUser}).populate('articles',{
        where: {
          articleStatus:"published"
        },
        sort: FIND_ORDER,
        limit: FIND_PER_PAGE,
        skip: (page - 1) * FIND_PER_PAGE
      })
      .then((users) => {
        return [
          users.articles,
          User.find({fullname: queryUser}).populate('articles',{where: {articleStatus:"published" }})
        ]
      })
      .spread((articles,totalQueryArticles) => {
        resolve({
          articles,totalQueryArticles
        })
      })
    })

  }
}

// 文章查询顺序：以更新时间逆序
FIND_ORDER = 'updatedAt desc';
// 文章每页条目数
FIND_PER_PAGE = 5;

var marked = require('marked');
var hljs   = require('../../node_modules/highlightjs/highlight.pack.js');
marked.setOptions({
  highlight: function(code, lang) {
    if (typeof lang === 'undefined') {
      return hljs.highlightAuto(code).value;
    } else if (lang === 'nohighlight') {
      return code;
    } else {
      return hljs.highlight(lang, code).value;
    }
  }
});

module.exports = {

  index: function (req, res){
    // 获得当前需要加载第几页
    var page = req.param('page') ? req.param('page') : 1;
    Article.find({
      sort: FIND_ORDER,
      where: {articleStatus:"published"}
    }).paginate({page: page, limit: FIND_PER_PAGE})
      .then(function (articles) {
        // 每篇文章转换
        // 查找分类,及标签
        var now = new Date();
        //Format the current time to year/month/day
        var matchString = '';
        matchString = '' + now.getFullYear();
        matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
        matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());
        return [
          articles,
          Article.count({where: {articleStatus:"published"}}),
          Category.find(),
          Tags.find(),
          Archive.find(),
          Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }),
          Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}),
          Statistics.findOne({key: 0})
        ];
      })
      .spread(function (articles,numOfArticles, categories, tags, archives, hotterArticles, newArticlesToday, statistics) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }
        var newVisitCounts = statistics.totalVisitCounts + 1;
        var newTodayCounts = statistics.todayVisitCounts + 1;

        Statistics.update({key: 0}, {totalVisitCounts: newVisitCounts, todayVisitCounts: newTodayCounts}).exec(function(err, record){
          if(err){
            console.log(err);
          }else{
            //console.log(record);
          }
        });

        return res.view(
          'articleLists',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            currentPage: page,
            pageNum: Math.ceil(numOfArticles/FIND_PER_PAGE),
            breadcrumb: [],
            hotterArticles: hotterArticles,
            numOfArticles: numOfArticles,
            newArticlesToday: newArticlesToday.length,
            totalVisitCounts: statistics.totalVisitCounts + 1,
            todayVisitCounts: statistics.todayVisitCounts + 1
          });
      });
  },

  showOneArticle: function (req, res){
    var articleUrl = req.param('url');
    Article.findOne({slug: articleUrl})
      .then(function(article){
        var now = new Date();
        //Format the current time to year/month/day
        var matchString = '';
        matchString = '' + now.getFullYear();
        matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
        matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());
        return [
          article,
          Category.find(),
          Tags.find(),
          Archive.find(),
          Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }),
          Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}),
          Statistics.findOne({key: 0}),
          Article.count({where: {articleStatus:"published"}})
        ];
      })
      .spread(function(article, categories, tags, archives,hotterArticles, newArticlesToday, statistics,numOfArticles){
        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        if (article.pageViews.indexOf(req.ip) === -1){

          article.pageViews.push(req.ip);

          Article.update(article.id,
            {
             pageViews: article.pageViews,
             pageViewsCount: article.pageViews.length
            }
          ).exec(function(err, article){
            /*todo errors*/
          });
        }

        return res.view('articleShow',
        {
          categories: categories,
          tags: tags,
          archives: archiveArray,
          content: marked(article.content),
          slug: article.slug,
          title: article.title,
          breadcrumb: [article.title],
          hotterArticles: hotterArticles,
          numOfArticles: numOfArticles,
          newArticlesToday: newArticlesToday.length,
          totalVisitCounts: statistics.totalVisitCounts,
          todayVisitCounts: statistics.todayVisitCounts
        });
      })
      .catch(function(err){
        console.log(err);
        /*ToDo.....*/
      })
  },
  showOneCategory: function (req, res){
    // 获得当前需要加载第几页
    var page = req.param('page') ? req.param('page') : 1;
    var queryCategory = req.param('url');

    Category.find({name: queryCategory}).populate('articles',{
      where: {
        articleStatus:"published"
      },
      sort: FIND_ORDER
    }).paginate({page: page, limit: FIND_PER_PAGE})
      .then(function (categories) {
        var now = new Date();
        //Format the current time to year/month/day
        var matchString = '';
        matchString = '' + now.getFullYear();
        matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
        matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());
        return [
          categories[0].articles,
          Category.find({name: queryCategory}).populate('articles',{where: {articleStatus:"published" }}),
          Category.find(),
          Tags.find(),
          Archive.find(),
          Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }),
          Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}),
          Statistics.findOne({key: 0}),
          Article.count({where: {articleStatus:"published"}})
        ];
      })
      .spread(function (articles,totalQueryArticles, categories, tags, archives,hotterArticles, newArticlesToday, statistics,numOfArticles) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view(
          'articleLists',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            currentPage: page,
            pageNum: Math.ceil(totalQueryArticles[0].articles.length/FIND_PER_PAGE),
            breadcrumb: ['分类', queryCategory],
            hotterArticles: hotterArticles,
            numOfArticles: numOfArticles,
            newArticlesToday: newArticlesToday.length,
            totalVisitCounts: statistics.totalVisitCounts,
            todayVisitCounts: statistics.todayVisitCounts
          });
      });
  },

  showOneTag: function (req, res){
    // 获得当前需要加载第几页
    var page = req.param('page') ? req.param('page') : 1;
    var queryTag = req.param('url');

    Tags.find({name: queryTag}).populate('articles',{
      where: {
        articleStatus:"published"
      },
      sort: FIND_ORDER
    }).paginate({page: page, limit: FIND_PER_PAGE})
      .then(function (tags) {
        var now = new Date();
        //Format the current time to year/month/day
        var matchString = '';
        matchString = '' + now.getFullYear();
        matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
        matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());
        return [
          tags[0].articles,
          Tags.find({name: queryTag}).populate('articles',{where: {articleStatus:"published" }}),
          Category.find(),
          Tags.find(),
          Archive.find(),
          Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }),
          Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}),
          Statistics.findOne({key: 0}),
          Article.count({where: {articleStatus:"published"}})
        ];
      })
      .spread(function (articles, totalQueryArticles, categories, tags, archives,hotterArticles, newArticlesToday, statistics,numOfArticles) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view(
          'articleLists',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            currentPage: page,
            pageNum: Math.ceil(totalQueryArticles[0].articles.length/FIND_PER_PAGE),
            breadcrumb: ['标签', queryTag],
            hotterArticles: hotterArticles,
            numOfArticles: numOfArticles,
            newArticlesToday: newArticlesToday.length,
            totalVisitCounts: statistics.totalVisitCounts,
            todayVisitCounts: statistics.todayVisitCounts
          });
      });
  },

  showOneArchive: function (req, res){
// 获得当前需要加载第几页
    var page = req.param('page') ? req.param('page') : 1;
    var queryArchive = req.param('url');
    console.log(queryArchive);
    Archive.find({archiveTime: queryArchive}).populate('articles',{
      where: {
        articleStatus:"published"
      },
      sort: FIND_ORDER
    }).paginate({page: page, limit: FIND_PER_PAGE})
      .then(function (archives) {
        var now = new Date();
        //Format the current time to year/month/day
        var matchString = '';
        matchString = '' + now.getFullYear();
        matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
        matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());
        return [
          archives[0].articles,
          Archive.find({archiveTime: queryArchive}).populate('articles',{where: {articleStatus:"published" }}),
          Category.find(),
          Tags.find(),
          Archive.find(),
          Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }),
          Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}),
          Statistics.findOne({key: 0}),
          Article.count({where: {articleStatus:"published"}})
        ];
      })
      .spread(function (articles, totalQueryArticles, categories, tags, archives,hotterArticles, newArticlesToday, statistics,numOfArticles) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: archives[index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view(
          'articleLists',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            currentPage: page,
            pageNum: Math.ceil(totalQueryArticles[0].articles.length/FIND_PER_PAGE),
            breadcrumb: ['归档', queryArchive],
            hotterArticles: hotterArticles,
            numOfArticles: numOfArticles,
            newArticlesToday: newArticlesToday.length,
            totalVisitCounts: statistics.totalVisitCounts,
            todayVisitCounts: statistics.todayVisitCounts
          });
      });
  },
  showOneUser: function(req, res){

  },

  aboutSite: function (req, res){

    var now = new Date();
    //Format the current time to year/month/day
    var matchString = '';
    matchString = '' + now.getFullYear();
    matchString += ((now.getMonth() + 1) < 10) ? ('-0' + (now.getMonth() + 1)) : ('-' + (now.getMonth() + 1));
    matchString += (now.getDate() < 10) ? ('-0' + now.getDate()) : ('-' + now.getDate());

    async.parallel([
      function(callback){Category.find().exec(callback)},
      function(callback){Tags.find().exec(callback)},
      function(callback){Archive.find().exec(callback)},
      function(callback){Article.find({ where: { articleStatus: 'published' }, sort: 'pageViewsCount DESC', limit: 10 }).exec(callback)},
      function(callback){Article.find({where:{articleStatus:'published',archiveTime: {'contains': matchString}}}).exec(callback)},
      function(callback){Statistics.findOne({key: 0}).exec(callback)},
      function(callback){Article.count({where: {articleStatus:"published"}}, callback)}
    ],function(error, results){
      /*If any creating model failure, this process
       should be stop and return the error to client*/
      if (error){
        sails.log.error(error);
        callback(error, null);
      }else{
        var archiveArray = [];
        for (var index = 0; index < results[2].length; index++){
          var year = results[2][index].archiveTime.substr(0,4);
          var month = results[2][index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            oldArchiveTime: results[2][index].archiveTime,
            archiveTime: newFormat,
            numOfArticles: results[2][index].numOfArticles
          };

          archiveArray.push(archive);
        }
        return res.view('aboutSite', {
          breadcrumb: ['关于本站'],
          categories: results[0],
          tags: results[1],
          archives: archiveArray,
          hotterArticles: results[3],
          numOfArticles: results[6],
          newArticlesToday: results[4].length,
          totalVisitCounts: results[5].totalVisitCounts,
          todayVisitCounts: results[5].todayVisitCounts
        })
      }
    });
  }
};

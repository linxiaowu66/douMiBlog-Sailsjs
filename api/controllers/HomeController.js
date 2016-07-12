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
        return [
          articles,
          Category.find(),
          Tags.find(),
          Archive.find()
        ];
      })
      .spread(function (articles, categories, tags, archives) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view(
          'blogHome',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            page: page,
            breadcrumb: ['博文概览']
          });
      });
  },

  showOneArticle: function (req, res){
    var articleUrl = req.param('url');

    Article.findOne({slug: articleUrl})
      .then(function(article){
        return [
          article,
          Category.find(),
          Tags.find(),
          Archive.find()
        ];
      })
      .spread(function(article, categories, tags, archives){
        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view('articleShow',
        {
          categories: categories,
          tags: tags,
          archives: archiveArray,
          content: marked(article.content),
          title: article.title,
          breadcrumb: ['博文概览', article.title]
        });
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
        return [
          categories[0].articles,
          Category.find(),
          Tags.find(),
          Archive.find()
        ];
      })
      .spread(function (articles, categories, tags, archives) {

        var archiveArray = [];
        for (var index = 0; index < archives.length; index++){
          var year = archives[index].archiveTime.substr(0,4);
          var month = archives[index].archiveTime.substr(5,2);
          var newFormat = year + "年" + month + "月";

          var archive = {
            archiveTime: newFormat,
            numOfArticles: archives[index].numOfArticles
          };

          archiveArray.push(archive);
        }

        return res.view(
          'categoryShow',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archiveArray,
            page: page,
            breadcrumb: ['分类', queryCategory]
          });
      });
  },

  showOneTag: function (req, res){

  },

  showOneArchive: function (req, res){

  }
};

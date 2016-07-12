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
            page: page
          });
      });
  },

  show: function (req, res){
    var articleUrl = req.param('url');

    Article.findOne({slug: articleUrl}).exec(function(error, article){

      if (error){
        sails.log.error(err);
        return res.negotiate(err);
      }
      return res.view(
       'article',
        {
          content: marked(article.content),
          name: article.title,
          url: article.slug
        });
      });
    }
};

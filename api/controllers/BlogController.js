// 文章查询顺序：以更新时间逆序
FIND_ORDER = 'updatedAt desc';
// 文章每页条目数
FIND_PER_PAGE = 5;

var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});


module.exports = {

  index: function (req, res){
    // 获得当前需要加载第几页
    var page = req.param('page') ? req.param('page') : 1;
    console.log("==========================================");
    Blog.find({
      sort: FIND_ORDER,
      where: {blogStatus:"publish"}
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

        return res.view(
          'blog-overview',
          {
            articles: articles,
            categories: categories,
            tags: tags,
            archives: archives,
            page: page
          });
      });
  },

  show: function (req, res){
    var articleUrl = req.param('url');
    Blog.find({url: articleUrl}).exec(function(error, article){

      if (error){
        sails.log.error(err);
        return res.negotiate(err);
      }
      return res.json(
       200,
        {
          content: article[0].content,
          name: article[0].name,
          url: article[0].url
        });
    });
  }
};

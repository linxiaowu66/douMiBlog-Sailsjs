
{% extends 'partial/layoutBlog.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link href='/vender/highlightjs/styles/monokai-sublime.css' rel='stylesheet'>
<link rel='stylesheet' href='/styles/articleShow.css'>
{% endblock %}

{% block content %}
<main class='col-md-8'>
  <header class='post-header'><h1 class='post-title'>{{ article.title }}</h1></header>
  <section class='article-info row'>
    <div class='col-sm-10 col-xs-10 col-md-10'>
      <span class='col-xs-8 col-sm-8 col-md-4 glyphicon glyphicon-time'><a href='#'>{{ article.archiveTime }}</a></span>
      <span class='col-xs-4 col-sm-4 col-md-2 author glyphicon glyphicon-user'>
       <a href = '/blog/user/{{article.author}}' >{{article.author}}</a>
      </span>
      <span class='col-xs-8 col-sm-8 col-md-4 tags-array glyphicon glyphicon-tags'>
       {% for tag in article.tagsArray %}
       <a href = '/blog/tag/{{tag}}'>{{ tag }}</a>
       {% endfor %}
      </span>
      <span class='col-xs-4 col-sm-4 col-md-2 glyphicon glyphicon-heart'><a href='#'>{{ article.pageViewsCount }}</a>
      </span>
    </div>
  </section>
  <section class='article-body'>{{ article.previewText |safe}}</section>
  <footer class='post-footer'>
    <figure class='author-image'>
      <a class='img' href='/aboutDouMi'><span class='hidden'>豆米的头像</span></a>
    </figure>
    <section class='author'>
      <h4><a href='/aboutDouMi'>小米喳和大洋芋</a></h4>
      <p>豆米目前生活在“上有天堂，下有苏杭”的杭州，美不胜收的美景之地也收获着甜蜜恩爱的生活。豆米热爱前端，热爱互联网，豆米是洋芋(土豆-豆)和米喳(米)的简称。</p>
      <div class='author-meta'>
        <span class='glyphicon glyphicon-map-marker'>杭州</span>
        <span class='glyphicon glyphicon-link'><a href='http://www.5udou.cn'>http://www.5udou.cn</a></span>
      </div>
    </section>
    <section class='share'>
      <h4>分享此博文</h4>
      <div class='bdsharebuttonbox bdshare-button-style1-24' data-bd-bind='1470122130117'>
        <a href='#' class='bds_more' data-cmd='more'></a>
        <a href='#' class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'></a>
        <a href='#' class='bds_weixin' data-cmd='weixin' title='分享到微信'></a>
        <a href='#' class='bds_douban' data-cmd='douban' title='分享到豆瓣网'></a>
        <a href='#' class='bds_renren' data-cmd='renren' title='分享到人人网'></a></div>
      <script>window._bd_share_config={'common':{'bdSnsKey':{},'bdText':'','bdMini':'2','bdMiniList':false,'bdPic':'','bdStyle':'1','bdSize':'24'},'share':{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
    </section>
  </footer>
  <div id='disqus_thread'>
    评论正在加载，请稍后...
   <br>
   <br>
   <strong>注意：</strong>如果长时间无法加载，那么说明你的网络被墙掉了，请使用代理或者VPN访问。
  </div>
  <aside id="page-top" style="display: block;">
    <a href="#wrapper" class="glyphicon glyphicon-menu-up"></a>
  </aside>
  <script>

  /**
  *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables */

  var disqus_config = function () {
    this.page.url = 'http://blog.5udou.cn/blog/{{article.slug}}';  // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = '{{ article.slug }}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };

  (function() { // DON'T EDIT BELOW THIS LINE
     var d = document, s = d.createElement('script');
     s.src = '//doumiblog2016.disqus.com/embed.js';
     s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>
</main>
<script type='text/javascript'>
  require(['../js/articleShow']);
</script>
{% endblock %}

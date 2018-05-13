
{% extends 'partial/layoutBlog.swig' %}

{% block keywords %}{{ article.tagsArray }}{% endblock %}
{% block description %}{{ article.digest }}{% endblock %}
{% block title %}{{ article.title }}{% endblock %}

{% block style %}
{% parent %}
<link href='/vender/highlightjs/styles/github.css' rel='stylesheet'>
<link rel='stylesheet' href='/styles/articleShow.css'>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" integrity="sha384-wITovz90syo1dJWVh32uuETPVEtGigN07tkttEqPv+uR2SE/mbQcG7ATL28aI9H0" crossorigin="anonymous">
{% endblock %}

{% block content %}
<main class='col-md-8 widget'>
  <header class='post-header'>
    <span class="blog-view-count">{{ article.pageViewsCount }}℃</span>
    <span class="blog-date">
      <time class="dt-published" datetime="{{ article.archiveTime }}">
        <span>{{ article.archiveDay }}</span>
        <em>{{ article.archiveMonth }}</em>
      </time>
    </span>
    <h1 class='post-title'>{{ article.title }}</h1>
  </header>
  <div class='tags'>
    {% for tag in article.tagsArray %}
    <span><a href = '/blog/tag/{{tag}}'>{{ tag }}</a></span>
    {% endfor %}
  </div>
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
        <span class='glyphicon glyphicon-link'><a href='https://www.5udou.cn'>https://www.5udou.cn</a></span>
      </div>
    </section>
    <!-- <section class='share'>
      <h4>分享此博文</h4>
      <div class='bdsharebuttonbox bdshare-button-style1-24' data-bd-bind='1470122130117'>
        <a href='#' class='bds_more' data-cmd='more'></a>
        <a href='#' class='bds_tsina' data-cmd='tsina' title='分享到新浪微博'></a>
        <a href='#' class='bds_weixin' data-cmd='weixin' title='分享到微信'></a>
        <a href='#' class='bds_douban' data-cmd='douban' title='分享到豆瓣网'></a>
        <a href='#' class='bds_renren' data-cmd='renren' title='分享到人人网'></a></div>
      <script>window._bd_share_config={'common':{'bdSnsKey':{},'bdText':'','bdMini':'2','bdMiniList':false,'bdPic':'','bdStyle':'1','bdSize':'24'},'share':{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>
    </section> -->
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
    this.page.url = 'https://blog.5udou.cn/blog/{{article.slug}}';  // Replace PAGE_URL with your page's canonical URL variable
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

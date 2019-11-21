
{% extends 'partial/layoutBlog.swig' %}

{% block keywords %}{{ article.tagsArray }}{% endblock %}
{% block description %}{{ article.content.slice(0, 100) }}{% endblock %}
{% block title %}{{ article.title }}{% endblock %}
{% block slug %}{{ article.slug }}{% endblock %}

{% block style %}
{% parent %}
<link href='/vender/highlightjs/styles/github.css' rel='stylesheet'>
<link rel='stylesheet' href='/styles/articleShow.css'>
<link rel="dns-prefetch" href="https://cdn.bootcss.com" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" integrity="sha384-wITovz90syo1dJWVh32uuETPVEtGigN07tkttEqPv+uR2SE/mbQcG7ATL28aI9H0" crossorigin="anonymous">
<link href="https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.css" rel="stylesheet">
<script src="https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.js"></script>
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
      <span class="dot"></span>
      <span>{{ article.archiveYear}}</span>
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
    <section class='micro-program'>
      <h4>小程序关注一波~</h4>
      <img src='/images/xiaochengxu.jpeg' />
    </section>
    <section class='comments'>
      <h4>关于评论和留言</h4>
      <p>如果对本文 <a>{{ article.title }}</a> 的内容有疑问，请在下面的评论系统中留言，谢谢。</p>
    </section>
    <blockquote class='github'>
      <p>网站源码：<a href="https://github.com/linxiaowu66/douMiBlog-Sailsjs">linxiaowu66 · 豆米的博客</a></p>
      <p>Follow：<a href="https://github.com/linxiaowu66">linxiaowu66 · Github</a></p>
    </blockquote>
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
  <div id="gitalk-container"></div>
  <script>
    const gitalk = new Gitalk({
      clientID: '16018f2091e0cd02d37c',
      clientSecret: 'c1c36729e8fdb3c309cd6e24939ad047cf904884',
      repo: 'doumi-blog-comments',
      owner: 'linxiaowu66',
      admin: ['linxiaowu66'],
      id: location.pathname.slice(0, 50),      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })

    gitalk.render('gitalk-container')
  </script>
  <aside id="page-top" style="display: block;">
    <a href="#wrapper" class="glyphicon glyphicon-menu-up"></a>
  </aside>
</main>
<script type='text/javascript'>
  require(['../js/articleShow']);
</script>
{% endblock %}

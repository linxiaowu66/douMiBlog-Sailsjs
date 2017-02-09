{% extends 'partial/layoutBlog.swig' %}

{% block keywords %}豆米的博客 版本历史 功能更新 时间线{% endblock %}
{% block description %}豆米的博客网站的历史，对于每次网站功能更新的记录与回顾。{% endblock %}
{% block title %}关于本站 - 豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/aboutSite.css'>
{% endblock %}

{% block content %}
<main class='col-md-8'>
  <section class='site-history'>
    <div class='update-log'>
      <h3 class=''>本站正式上线</h3>
      <p>8月8号，完成所有博客的基本功能，除了关于豆米的网页暂时没完成之外。</p>
      <p>豆米的博客意在分享web开发的点点滴滴，前端和后台都会有所涉及，再适当分享些生活的精彩。</p>
      <div class='update-time'>
        <span>2016/08</span>
        <span>08&nbsp;&nbsp;周一</span>
      </div>
    </div>
    <div class='update-log'>
      <h3>完成文章搜索功能</h3>
      <p>9月11号，完成网站的首页以及后台的文章搜索功能。</p>
      <p>暂时只提供对博客的标题搜索，不支持全文搜索。</p>
      <div class='update-time'>
        <span>2016/09</span>
        <span>11&nbsp;&nbsp;周日</span>
      </div>
    </div>
    <div class='update-log'>
      <h3>改进网站的SEO</h3>
      <p>10月10号，修改部分代码，增强网站的SEO。</p>
      <p>修改页面的title、description等meta，提高网站的SEO。添加google的verification文件，提高谷歌收录网站的可能性</p>
      <div class='update-time'>
        <span>2016/10</span>
        <span>10&nbsp;&nbsp;周一</span>
      </div>
    </div>
    <div class='update-log'>
      <h3>博文列表改版</h3>
      <p>12月03号，博文列表改版，使之更加简洁大方。</p>
      <p>新增博客首页图片，方便显示博文列表中的大图,增加网站形象性</p>
      <div class='update-time'>
        <span>2016/12</span>
        <span>03&nbsp;&nbsp;周六</span>
      </div>
    </div>
    <div class='update-log'>
      <h3>增加友情链接面板</h3>
      <p>01月05号，增加友情链接面板，加大文章标题的可存长度</p>
      <p>新增博客的友情链接，外链到一些推荐的博客网站</p>
      <div class='update-time'>
        <span>2017/01</span>
        <span>05&nbsp;&nbsp;周四</span>
      </div>
    </div>
    <div class='update-log'>
      <h3>优化管理后台和统计数据</h3>
      <p>02月09号，优化管理后台，增加操作信息框</p>
      <p>优化网站统计数据，修复若干bug</p>
      <div class='update-time'>
        <span>2017/02</span>
        <span>09&nbsp;&nbsp;周四</span>
      </div>
    </div>
  </section>
</main>
{% endblock %}


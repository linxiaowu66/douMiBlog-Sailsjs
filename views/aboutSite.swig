{% extends 'partial/layoutBlog.swig' %}

{% block title %}豆米的博客{% endblock %}

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
  </section>
</main>
{% endblock %}


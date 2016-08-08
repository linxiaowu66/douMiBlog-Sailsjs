{% extends 'partial/layoutBlog.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
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
  </section>
</main>
{% endblock %}


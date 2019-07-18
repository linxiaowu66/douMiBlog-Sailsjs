{% extends 'partial/layoutIndex.swig' %}

{% block title %}关于豆米 - 豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/resume.css'>
{% endblock %}

{% block content %}
<section class='wrapper'>
  <section class="personal-info">
    <figure class='author-image'>
      <a class='img' ><span class='hidden'>豆米的头像</span></a>
    </figure>
    <p class="name">林光</p>
    <p class="summary">全栈的忠实粉丝，努力为前端发展添砖加瓦</p>
    <div class="another">
      <span>1990.07.07</span>
      <span>杭州</span>
      <span>151****53</span>
      <span>linguang661990@126.com</span>
    </div>
  </section>
  <section class="experiment">
      <div class='title'>
        <p>工作经历</a>
      </div>
      <section class="dianwoda">
        <div class="company">
          <span>点我达</span>
          <span>2016.08 ~ 至今</span>
        </div>
        <div class="project">
          <p class="name">待补充</p>
          <ul>
            <li>待补充</li>
            <li>待补充</li>
          </ul>
        </div>
      </section>
  </section>
</section>
{% endblock %}

{% block script %}

{% endblock %}

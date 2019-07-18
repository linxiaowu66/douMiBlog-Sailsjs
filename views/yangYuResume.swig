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
    <p class="name">张玉娟</p>
    <p class="summary">想个啥~先留着吧</p>
    <div class="another">
      <span>19**.**.**</span>
      <span>杭州</span>
      <span>182****98</span>
      <span>heyang_xing@126.com</span>
    </div>
  </section>
  <section class="experiment">
      <div class='title'>
        <p>工作经历</a>
      </div>
      <section class="dianwoda">
        <div class="company">
          <span>阿里巴巴</span>
          <span>2017.01 ~ 至今</span>
        </div>
        <div class="project">
          <p class="name">未补充</p>
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

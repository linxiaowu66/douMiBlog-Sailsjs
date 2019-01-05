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
    {% for change in changeLogs %}
      <div class='update-log'>
        <h3 class=''>{{ change.title }}</h3>
        <p>{{ change.desc1 }}</p>
        <p>{{ change.desc2 }}</p>
        <div class='update-time'>
          <span>{{ change.date }}</span>
          <span>{{ change.time }}</span>
        </div>
      </div>
    {% endfor %}
  </section>
</main>
{% endblock %}

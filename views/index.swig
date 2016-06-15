{% extends 'partial/layout.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
  {% parent %}
  <link rel="stylesheet" href="./styles/index.css">
{% endblock %}

{% block content %}
<div class="main-wrapper">
    <div id = "title">
        <div class = "first-title"><span class = "first-letter">豆米</span><span class = "second-letter">博客</span></div>
        <div class = "second-title">有趣、五味杂陈的前端生活博客</div>
    </div>
    <div id = "action">
        <a href="/blog">博客</a>
        <a href="/aboutDouMi" class = "detail">关于豆米</a>
    </div>
</div>
{% endblock %}

{% block script %}

{% endblock %}

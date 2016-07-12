
{% extends 'partial/layoutHome.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../vender/bootstrap/dist/css/bootstrap.min.css">
<link href="../vender/highlightjs/styles/monokai-sublime.css" rel="stylesheet">
<link rel="stylesheet" href="../styles/blogHome.css">
{% endblock %}

{% block content %}
<main class="col-md-8">
  <header class="post-header"><h1 class="post-title">{{ title }}</h1></header>
  <section>{{ content |safe}}</section>
  <footer></footer>
</main>
{% endblock %}

{% extends 'partial/layout-overview.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../styles/blog-overview.css">
{% endblock %}
{% block content %}
<main class="col-md-8">
  {{ articles }}
</main>
{% endblock %}

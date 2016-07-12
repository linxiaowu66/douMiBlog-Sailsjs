
{% extends 'partial/layoutHome.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link href="../vender/highlightjs/styles/monokai-sublime.css" rel="stylesheet">
<link rel="stylesheet" href="../styles/blogHome.css">
{% endblock %}

{% block content %}
<main class="col-md-8">
    {{ content |safe}}
</main>
{% endblock %}

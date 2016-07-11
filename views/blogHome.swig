{% extends 'partial/layoutHome.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../styles/blogHome.css">
{% endblock %}

{% block content %}
<main class="col-md-8">
  {% for article in articles %}
  <article class="post" url-data="{{ article.slug }}">
    <header class="post-header">
      <h2 class="blog-single-post-title"><a href="#{{ article.slug }}">{{ article.title }}</a></h2>
    </header>
    <div class="post-content">
      <p class="post-excerpt">
        {{ article.description }}
        <a href="#{{ article.slug }}" class = "articleLink">阅读全文</a>
      </p>
      <div class="row">
        <div class="col-sm-12">
          <div class="post-meta">
            <div class="row">
              <div class="col-sm-6">
                <span class="post-date"><b>发布于: </b>{{ article.createTime }}</span>
              </div>
              <div class="col-sm-6 comment-count">
                <a href="#">0  comments</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
  {% endfor %}
</main>
{% endblock %}


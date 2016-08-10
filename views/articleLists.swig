{% extends 'partial/layoutBlog.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/articleLists.css'>
{% endblock %}

{% block content %}
<main class='col-md-8'>
 {% for article in articles %}
 <!-- Article Box -->
  <article class='post' url-data='{{ article.slug }}'>
    <header class='post-header'>
      <h2 class='blog-single-post-title'><a href='/blog/{{ article.slug }}'>{{ article.title }}</a></h2>
    </header>
    <div class='post-content'>
    <p class='post-excerpt'>
      {{ article.digest }}
      <a href='/blog/{{ article.slug }}' class = 'articleLink'>阅读全文</a>
    </p>
    <!-- Article Info Box -->
    <div class='row'>
      <div class='col-sm-12'>
        <div class='post-meta'>
           <div class='row'>
              <div class='col-sm-10'>
                 <span class='post-date glyphicon glyphicon-time'><a href='#' style='padding-left:5px'>{{ article.archiveTime }}</a></span>
                 <span class='tags-array glyphicon glyphicon-tags'>
                   {% for tag in article.tagsArray %}
                   <a href = '/blog/tag/{{tag}}'>{{ tag }}</a>
                   {% endfor %}
                  </span>
                  <span class='author glyphicon glyphicon-user'>
                  <a href = '/blog/user/{{article.author}}' >{{article.author}}</a>
                  </span>
                  <span class='pageViews glyphicon glyphicon-heart'><a href='#' style='padding-left:5px'>{{ article.pageViews.length }}</a>
                  </span>
                </div>
                <div class='col-sm-2 comment-count'>
                   <a href='/blog/{{ article.slug }}#disqus_thread' class='glyphicon glyphicon-comment'></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  {% endfor %}
  <!-- Pagination Box -->
  {% if pageNum > 1 %}
  <nav id='page-nav'>
     {% if currentPage != 1 %}
        <a class='extend prev' rel='prev' href='{{pageUrl}}/{{ currentPage-1 }}'>上一页</a>
        <a class='page-number' href='{{pageUrl}}/1/'>1</a>
    {% endif %}
    {% if currentPage - 3 > 1 %}
       <span class='space'>…</span>
    {% endif %}
    {% if currentPage - 2 > 1 %}
        <a class='page-number' href='{{pageUrl}}/{{currentPage-2}}'>{{ currentPage-2 }}</a>
    {% endif %}
    {% if currentPage - 1 > 1 %}
        <a class='page-number' href='{{pageUrl}}/{{currentPage-1}}'>{{ currentPage-1 }}</a>
    {% endif %}
    <span class='page-number current'>{{ currentPage }}</span>
    {% if parseInt(currentPage) + 1 <= parseInt(pageNum) %}
        <a class='page-number' href='{{pageUrl}}/{{parseInt(currentPage) + 1}}'>{{parseInt(currentPage) + 1}}</a>
    {% endif %}
    {% if parseInt(currentPage) + 2 <= parseInt(pageNum) %}
        <a class='page-number' href='{{pageUrl}}/{{parseInt(currentPage) + 2}}'>{{ parseInt(currentPage) + 2 }}</a>
    {% endif %}
    {% if parseInt(currentPage) + 3 <= parseInt(pageNum) %}
    <a class='page-number' href='{{pageUrl}}/{{parseInt(currentPage) + 3}}'>{{ parseInt(currentPage) + 3 }}</a>
    {% endif %}
    {% if parseInt(currentPage) + 5 <= parseInt(pageNum) %}
        <span class='space'>…</span>
    {% endif %}
    {% if parseInt(currentPage) + 4 <= parseInt(pageNum) %}
      <a class='page-number' href='{{pageUrl}}/{{pageNum}}'>{{ pageNum }}</a>
    {% endif %}
    {% if parseInt(currentPage) != parseInt(pageNum)  %}
      <a class='extend next' rel='next' href='{{pageUrl}}/{{parseInt(currentPage) + 1}}'>下一页</a>
    {% endif %}
  </nav>
  {% endif %}
  <script id='dsq-count-scr' src='//doumiblog2016.disqus.com/count.js' async></script>
</main>
{% endblock %}


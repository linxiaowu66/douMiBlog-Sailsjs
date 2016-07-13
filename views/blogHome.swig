{% extends 'partial/layoutHome.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../vender/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="../styles/blogHome.css">
{% endblock %}

{% block content %}
<main class="col-md-8">
 {% for article in articles %}
  <article class="post" url-data="{{ article.slug }}">
    <header class="post-header">
      <h2 class="blog-single-post-title"><a href="/home/{{ article.slug }}">{{ article.title }}</a></h2>
    </header>
    <div class="post-content">
    <p class="post-excerpt">
      {{ article.digest }}
      <a href="/home/{{ article.slug }}" class = "articleLink">阅读全文</a>
    </p>
    <div class="row">
      <div class="col-sm-12">
        <div class="post-meta">
           <div class="row">
              <div class="col-sm-9">
                 <span class="post-date"><b>发布于: </b>{{ article.archiveTime }}</span>
                 <span class="tags-array"><b>标签: </b>
                   {% for tag in article.tagsArray %}
                   <a href = "/home/tags/{{tag}}">{{ tag }}</a>
                   {% endfor %}
                  </span>
                  <span><b>作者：</b>xiaomizha</span>
                </div>
                <div class="col-sm-3 comment-count">
                   <a href="#">0  comments</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  {% endfor %}
  {% if pageNum > 1 %}
  <nav id="page-nav">
     {% if currentPage != 1%}
        <a class="extend prev" rel="prev" href="/home/page/{{ currentPage-1 }}">« Prev</a>
        <a class="page-number" href="/home/page/1/">1</a>
    {% endif %}
    {% if currentPage - 3 > 0 %}  
       <span class="space">…</span>
    {% endif %}
    {% if currentPage - 2 > 0 %}
        <a class="page-number" href="/home/page/{{currentPage-2}}">{{ currentPage-2 }}</a>     
    {% endif %}
    {% if currentPage - 1 > 0 %}
        <a class="page-number" href="/home/page/{{currentPage-1}}">{{ currentPage-1 }}</a>     
    {% endif %}
    <span class="page-number current">{{ currentPage }}</span>
    {% if currentPage + 1 < pageNum %}
        <a class="page-number" href="/home/page/{{currentPage+1}}">{{ currentPage+1 }}</a>     
    {% endif %}
    {% if currentPage + 2 < pageNum %}
        <a class="page-number" href="/home/page/{{currentPage+2}}">{{ currentPage+2 }}</a>     
    {% endif %}
    {% if currentPage + 3 < pageNum %}
        <span class="space">…</span>
    {% endif %}
    {% if currentPage != pageNum  %}
      <a class="extend next" rel="next" href="/home/page/{{currentPage+1}}">Next</a>
    {% endif %}
  </nav>
  {% endif %}
</main>
{% endblock %}


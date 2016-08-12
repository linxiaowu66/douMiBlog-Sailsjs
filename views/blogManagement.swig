{% extends 'partial/layoutManagement.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/blogManagement.css'>
<link href='/vender/highlightjs/styles/monokai-sublime.css' rel='stylesheet'>
{% endblock %}

{% block content %}
<main class='dm-blog content-viwer'>
  <section class='dm-blog content-container'>
    <header class='view-header'>
      <h2 class='view-title'>博文列表</h2>
      <section class='new-btn'>
        <a class='btn btn-success' href='/douMi/editor'>新建博文</a>
      </section>
    </header>
    <div class = 'content-wrapper'>
      <section class = 'blog-list'>
        <section class='content-scroll'>
          <ol class='post-list'>
            {% for article in articleList %}
            <a href='#{{ article.id }}' data-set='{{ article.id }}' class='blogIndex'>
              <li {% if loop.first %}class='active'{% endif %}>
                <div class='media'>
                  <div class='media-left'>
                      <img class='media-object' src='../images/icon-img.jpg' alt='douMiAvatar'>
                  </div>
                  <div class='media-body'>
                    <h4 class='media-heading'>{{ article.title }}</h4>
                    {% if article.status == 'published' %}发布于 {{ article.timeDescription }}
                    {% else %} <span>草稿</span>
                    {% endif %}
                  </div>
                </div>
              </li>
            </a>
            {% endfor %}
          </ol>
        </section>
      </section>
      <section class='blog-content'>
        <section class='post-controls'>
          <a {% if articleList.length %}href='/douMi/editor/{{ articleList[0].id }}' {% endif %} title='编辑此博文' class='blog-edit'><span class='glyphicon glyphicon-pencil'></span></a>
        </section>
        <section class='content-preview' {% if articleList.length %}data-set='{{ articleList[0].id }}'{% endif %}>
         {% if articleList.length %}{{ articleList[0].content | safe}}{% endif %}
        </section>
      </section>
    </div>
  </section>
</main>
<script type='text/javascript'>
  require(['../js/blogManagement']);
</script>
{% endblock %}


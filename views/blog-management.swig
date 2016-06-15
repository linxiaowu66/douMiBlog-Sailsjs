{% extends 'partial/layout-management.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../styles/blog-management.css">
{% endblock %}

{% block content %}
<main class="dm-blog content-viwer">
  <section class="dm-blog content-container">
    <header class="view-header">
      <h2 class="view-title">博文列表</h2>
      <section class="new-btn">
        <a class="btn btn-success" href="/blog-creation">新建博文</a>
      </section>
    </header>
    <div class = "content-wrapper">
      <section class = "blog-list">
        <section class="content-scroll">
          <ol class="post-list">
            {% for blog in blogList %}
            <a href="#" data-set="{{ blog.id }}" class="blogIndex">
              <li {% if loop.first %}class="active"{% endif %}>
                <div class="media">
                  <div class="media-left">
                      <img class="media-object" src="../images/icon-img.jpg" alt="douMiAvatar">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{ blog.name }}</h4>
                    发布于 {{ blog.timeDescription }}
                  </div>
                </div>
              </li>
            </a>
            {% endfor %}
          </ol>
        </section>
      </section>
      <section class="blog-content">
        <section class="post-controls">
          <a href="#" title="编辑此博文" class="blog-edit"><span class="glyphicon glyphicon-pencil"></span></a>
        </section>
        <section class="content-preview">
          {{  blogList[0].text }}
        </section>
      </section>
    </div>
  </section>
</main>
{% endblock %}


{% block script %}
{% parent %}
<script type="text/javascript" src="js/blog-mgmt.js"></script>
{% endblock %}


{% extends 'partial/layout-management.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../styles/blog-creation.css">
{% endblock %}

{% block content %}
<main class="dm-blog content-viwer">
  <section class="dm-blog content-container">
    <header class="view-header">
      <h2 class="view-title">
        <input id="entry-title" autofocus="" placeholder="博文标题" tabindex="1" type="text" class="blog-content-header">
      </h2>
      <section class="blog-actions">
        <div class="dropdown">
          <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            保存草稿
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="#">保存草稿</a></li>
            <li><a href="#">立即发布</a></li>
            <li role="separator" class="divider"><a href="#">删除博文</a></li>
          </ul>
        </div>
      </section>
    </header>
    <section class="blog-editor">
      <section class="edit-textarea">
        <section id="markdown-content" class="markdown-content">
          <textarea  spellcheck="true" tabindex="1" class="markdown-realtext"><!----></textarea>
        </section>
      </section>

      <section class="preview-area">
        <header class="preview-header">
          <span class="desktop-tabs">预览</span>
            <span class="mobile-tabs">
              <a href="#" class="active">Markdown</a>
              <a href="#" class="">预览</a>
            </span>
          <span class="entry-word-count">5 个字</span>
        </header>
        <section class="preview-content">
          <div class="preview-text">
            <p>ddddd</p>
          </div>
        </section>
      </section>
    </section>
    </section>
</main>
{% endblock %}

{% block script %}

{% endblock %}


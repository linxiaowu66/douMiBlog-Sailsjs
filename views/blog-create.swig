{% extends 'partial/layout_admin.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="../styles/blog-create.css">
{% endblock %}

{% block content %}
<main id="ember1051" role="main" class="ember-view gh-main">            <section id="ember1405" class="ember-view gh-view">    <header class="view-header">
  <h2 id="ember1406" class="ember-view view-title gh-editor-title"><button class="gh-mobilemenu-button" role="presentation" data-ember-action="1407"><i class="icon-gh"><span class="sr-only">菜单</span></i></button>
    <input id="entry-title" placeholder="博文标题" tabindex="1" type="text" class="ember-view ember-text-field gh-input">

  </h2>        <section class="view-actions">
  <button type="button" class="post-settings" title="博文设置" data-ember-action="1408">
    <i class="icon-settings"></i>
  </button>
  <section id="ember1409" class="ember-view splitbtn js-publish-splitbutton"><button id="ember1410" type="button" class="btn btn-sm js-publish-button btn-blue  ember-view">        保存草稿
  </button>

    <button id="ember1411" role="button" class="btn btn-sm btn-blue  dropdown-toggle up  ember-view closed">    <i class="options icon-arrow2"></i>
      <span class="sr-only">Toggle Settings Menu</span>
    </button><div id="ember1412" class="ember-view dropdown editor-options closed fade-out closed">    <ul class="dropdown-menu dropdown-triangle-bottom-right">
      <li class="post-save-publish ">
        <a href="#" data-ember-action="1413">立即发布</a>
      </li>
      <li class="post-save-draft active">
        <a href="#" data-ember-action="1414">保存草稿</a>
      </li>
      <li class="divider delete"></li>
      <li class="delete">
        <a href="#" data-ember-action="1415">删除博文</a>
      </li>
    </ul>
    </div></section>
</section>
</header>

  <section class="view-container view-editor">
    <section class="entry-markdown js-entry-markdown active">
      <header class="floatingheader">
        <span class="desktop-tabs">Markdown</span>
                <span class="mobile-tabs">
                    <a href="#" class="active" data-ember-action="1416">Markdown</a>
                    <a href="#" class="" data-ember-action="1417">预览</a>
                </span>
        <a class="markdown-help" href="" title="Markdown 手册" data-ember-action="1418"><i class="icon-markdown"></i></a>
      </header>
      <section id="entry-markdown-content" class="entry-markdown-content">
        <textarea id="ember1419" spellcheck="true" tabindex="1" class="ember-view ember-text-area markdown-editor js-markdown-editor"><!----></textarea>
      </section>
    </section>

    <section class="entry-preview js-entry-preview ">
      <header class="floatingheader">
        <span class="desktop-tabs">预览</span>
                <span class="mobile-tabs">
                    <a href="#" class="active" data-ember-action="1420">Markdown</a>
                    <a href="#" class="" data-ember-action="1421">预览</a>
                </span>
        <span class="entry-word-count">0 个字</span>
      </header>
      <section class="entry-preview-content js-entry-preview-content">
        <div id="ember1422" class="ember-view rendered-markdown js-rendered-markdown"><h5 id="">#</h5>
        </div>
      </section>
    </section>
  </section>

</section>
</main>
{% endblock %}

{% block script %}

{% endblock %}


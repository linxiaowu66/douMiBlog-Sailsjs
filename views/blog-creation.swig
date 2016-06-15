{% extends 'partial/layout-management.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link href="../../vender/highlightjs/styles/solarized_dark.css" type="text/css" rel="stylesheet"/>
<link rel="stylesheet" href="../../styles/blog-creation.css">
{% endblock %}

{% block content %}
<main class="dm-blog content-viwer">
  <section class="dm-blog content-container">
    <header class="view-header">
      <h2 class="view-title">
        <input id="entry-title" autofocus="" placeholder="博文标题" tabindex="1" type="text" class="blog-content-header">
      </h2>
      <button type="button" class="post-settings" title="博文设置">
        <span class="glyphicon glyphicon-cog"></span>
      </button>
      <section class="blog-actions">
        <div class="dropdown">
          <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
            保存草稿
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuDivider" >
            <li><a id="save" href="#">保存草稿</a></li>
            <li><a id="publish" href="#">立即发布</a></li>
            <li role="separator" class="divider"></li>
            <li><a id="delete" href="#">删除博文</a></li>
          </ul>
        </div>
      </section>
    </header>
    <section class="blog-editor">
      <section class="edit-textarea">
        <section id="markdown-content" class="markdown-content">
          <textarea  spellcheck="true" tabindex="1" class="markdown-realtext"></textarea>
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
          </div>
        </section>
      </section>
    </section>
    </section>
</main>
<div id="entry-controls" class="settings-menu-container">
  <div id="entry-controls">
    <div class="settings-menu-pane-in settings-menu settings-menu-pane">
      <div class="settings-menu-header">
        <h4>博文设置</h4>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    <div class="settings-menu-content">
      <form>
        <div class="form-group">
          <label for="post-setting-date">发布日期</label>
            <span class="input-icon glyphicon glyphicon-calendar">
              <input id="post-setting-date" name="post-setting-date" type="text" class="post-setting-date">
            </span>
            <p class="response" style="display: none;"><!----></p>
        </div>
        <div class="form-group">
          <div style="position:relative;">
            <label for="tags">标签</label>
            <div id="tags">
              <span title="单击删除该标签">2010</span>
              <span title="单击删除该标签">actor</span>
              <span title="单击删除该标签">dhcp</span>
            </div>
            <input type="text" id="txtTag2" style="width: 300px; height: 35px; padding-left: 138px;" maxlength="100">（最多添加3个标签，多个标签之间用“,”分隔）
            <div id="tag2box" style="display: block;">
              <table>
                <tbody>
                  <tr>
                    <th>常用标签</th>
                    <td id="td_tag21" class="tracking-ad" data-mod="">
                      {% for tag in tags %}
                        <a onclick="javascript:setTag2(this);return false;" class="act">{{ tag.name }}</a>
                      {% endfor %}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" multiple="multiple" autocomplete="off" class="" tabindex="-1" style="display: none;">
            <option selected="selected">ddd</option>
          </select>
          <div class="selectize-control multi plugin-remove_button">
            <div class="selectize-input items not-full ui-sortable has-options has-items focus input-active dropdown-active">
              <div data-value="111111"  class="item">ddd<a href="javascript:void(0)" class="remove" tabindex="-1" title="Remove">×</a></div>
              <input type="text" autocomplete="off" tabindex="0" style="width: 4px; opacity: 1; position: relative; left: 0px;">
            </div>
            <div class="selectize-dropdown multi ember-view ember-selectize plugin-remove_button plugin-drag_drop" style="display: block; width: 301px; top: 35px; left: 0px; visibility: visible;">
              <div class="selectize-dropdown-content">
                {% for cat in cats %}
                  <div data-value="222222" data-selectable="" class="option active">{{ cat.name }}</div>
                {% endfor %}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
{% endblock %}

{% block script %}
{% parent %}
<script type="text/javascript" src="../js/blog-creation.js"></script>
{% endblock %}


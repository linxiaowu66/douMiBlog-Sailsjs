{% extends 'partial/layoutManagement.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link href='/vender/highlightjs/styles/monokai-sublime.css' rel='stylesheet'>
<link rel='stylesheet' href='/styles/articleEditor.css'>
<link rel='stylesheet' href='/styles/jquery.datetimepicker.css'>
{% endblock %}

{% block content %}
<main class='dm-blog content-viwer' {% if article.id !== undefined %} data-set = '{{ article.id }}' {% endif %} >
  <section class='dm-blog content-container'>
    <header class='view-header'>
      <h2 class='view-title'>
        <input id='entry-title' autofocus='' placeholder='博文标题' tabindex='1' type='text' class='blog-content-header' {% if article.title !== undefined%}value='{{ article.title }}' {% endif %}>
      </h2>
      <button type='button' class='post-settings' title='博文设置'>
        <span class='glyphicon glyphicon-cog'></span>
      </button>
      <section class='blog-actions'>
        <div class='dropdown'>
          <button class='btn btn-success dropdown-toggle' type='button' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'>
            {% if article.status === undefined || article.status === 'drafted' %}保存草稿{% else %}更新博文{% endif %}
            <span class='caret'></span>
          </button>
          <ul class='dropdown-menu' aria-labelledby='dropdownMenuDivider' >
            {% if article.status === undefined || article.status === 'drafted' %}
            <li><a id='save' href='#'>保存草稿</a></li>
            <li><a id='publish' href='#'>立即发布</a></li>
            {% else %}
            <li><a id='update' href='#'>更新博文</a></li>
            <li><a id='undoPublish' href='#'>撤销发布</a></li>
            {% endif %}
            {% if article.status !== undefined %}
            <li role='separator' class='divider'></li>
            <li><a id='delete' href='/douMi/delete/{{ article.id }}'>删除博文</a></li>
            {% endif %}
          </ul>
        </div>
      </section>
    </header>
    <section class='blog-editor'>
      <section class='edit-textarea'>
        <section id='markdown-content' class='markdown-content'>
          <textarea  spellcheck='true' tabindex='1' class='markdown-realtext'>{% if article.content !== undefined %}{{ article.content }} {% endif %}</textarea>
        </section>
      </section>

      <section class='preview-area'>
        <header class='preview-header'>
          <span class='desktop-tabs'>预览</span>
            <span class='mobile-tabs'>
              <a href='#' class='active'>Markdown</a>
              <a href='#' class=''>预览</a>
            </span>
          <span class='entry-word-count'>0 个字</span>
        </header>
        <section class='preview-content'>
          <div class='preview-text'>
            {% if article.preview !== undefined %}{{ article.preview | safe}}{% endif %}
          </div>
        </section>
      </section>
    </section>
    </section>
</main>
<div id='entry-controls' class='settings-menu-container'>
  <div id='entry-controls'>
    <div class='settings-menu-pane-in settings-menu settings-menu-pane'>
      <div class='settings-menu-header'>
        <h4>博文设置</h4>
        <button type='button' class='close' data-dismiss='alert' aria-label='Close'>
          <span aria-hidden='true'>&times;</span>
        </button>
      </div>
    <div class='settings-menu-content'>
      <form action='/douMi/saveDraft'>
        <div class='form-group'>
          <label for='post-setting-date'>发布日期</label>
            <span class='input-icon glyphicon glyphicon-calendar'>
              <input id='articleTime' name='post-setting-date' type='text' class='post-setting-date' {% if article.archive !== undefined %}value='{{ article.archive }}'{% endif %}>
            </span>
            <p class='response' style='display: none;'><!----></p>
        </div>
        <div class='form-group'>
          <div style='position:relative;'>
            <label for='tags'>标签</label>
            <div id='tags'>
{% if article.tags !== undefined %}{% for tag in article.tags %}<span title='单击删除该标签'>{{ tag.name }}</span>{% endfor %}{% endif %}
            </div>
            <input type='text' id='txtTag2' style='width: 300px; height: 35px; padding-left: 2px;' maxlength='100'>（最多添加3个标签，多个标签之间用“,”分隔）
            <div id='tag2box' style='display: block;'>
              <table>
                <tbody>
                  <tr>
                    <th>常用标签</th>
                    <td id='td_tag21' class='tracking-ad' data-mod=''>
                      {% for alltag in article.allTags %}
                        {% set isMatch = 0 %}
                        {% for tag in article.tags %}
                          {% if alltag.name === tag.name %}
                            <a class='existingTag act'>{{ alltag.name }}</a>
                            {% set isMatch = 1 %}
                          {% endif %}
                        {% endfor %}
                        {% if isMatch === 0%}
                          <a class='existingTag'>{{ alltag.name }}</a>
                        {% endif %}
                      {% endfor %}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class='form-group'>
          <div style='position:relative;'>
            <label for='category'>分类</label>
            <select id='category' autocomplete='off' style='display: none;'>
            </select>
            <div id='item'>
{% if article.category !== undefined %}<span title='单击删除该分类'>{{ article.category }}</span>{% endif %}
            </div>
            <input type='text' id='cat-input' style='width: 300px; height: 35px; padding-left: 2px;' maxlength='100'>(最多添加1个分类)
            <div id='all-cats' style='display:none'>
              <div class='cat-dropdown'>
                {% for cat in article.allCats %}
                <div class='option'>{{ cat.name }}</div>
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
<script type='text/javascript'>
  require(['../js/articleEdit']);
</script>
{% endblock %}




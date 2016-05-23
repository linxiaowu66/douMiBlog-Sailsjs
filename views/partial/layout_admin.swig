<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel="stylesheet" href="./vender/bootstrap/dist/css/bootstrap.min.css">
  {% endblock %}
</head>
<body>
<div class="container-fluid">
  <div class="row-fluid">
    <nav class = "col-sm-3" id="left-nav">
      <header class = "nav-header row">
        <div class="nav-img img-circle col-sm-4" style="background-image: url(../images/blog-img.jpg)"></div>
        <div class="nav-menu-name col-sm-6">豆米的博客</div>
        <i class="icon-switch col-sm-2"></i>
      </header>
      <hr>
      <section class = "nav-body">
        <ul class="nav-list">
          <li><a id="" href="/ghost/editor/" class=""><span class="icon-plus"></span>新建博文</a></li>
          <li><a id="" href="/ghost/" class=""><span class="icon-list2"></span>博文列表</a></li>
          <li><a id="" href="/ghost/team/" class=""><span class="icon-user"></span>用户管理</a></li>
        </ul>
      </section>
      <footer class="nav-footer row">
        <div id="menu-toggle"><span role="button" class="icon-shrink2"></span></div>
        <a class="sitelink" target="_blank" href="http://blog.5udou.cn/">访问博客</a>
        <div class="help-menu">
          <div id="" role="button" class="">
            <div class="help-button">
              <i class="icon-question"><span class="hidden">帮助</span></i>
            </div>
          </div>
        </div>
      </footer>
    </nav>
    <section class = "col-sm-9" id="main-content">
      {% block content %}{% endblock %}
    </section>
  </div>
</div>

{% block script %}
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery" src="./vender/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="bootstrap" src="./vender/bootstrap/dist/js/bootstrap.min.js"></script>
{% endblock %}
</body>
</html>


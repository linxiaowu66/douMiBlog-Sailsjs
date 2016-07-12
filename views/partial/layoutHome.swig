<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel="stylesheet" href="../vender/bootstrap/dist/css/bootstrap.min.css">

  {% endblock %}
  <script type="text/javascript"  src="/js/requirejs/require.min.js"></script>
  <script type="text/javascript"  src="/js/config.js"></script>
</head>
<body>
<div id="wrapper">
  <header id="dm-header">
    <div class="container">
      <div class="row">
        <div id="dm-logo" class="col-xs-8 col-sm-3 col-md-2">
          <div class="dm-column ">
            <a class="logo" href="/">
              <h1>豆米的博客</h1>
            </a>
          </div>
        </div>
        <div id="dm-search" class="col-sm-4 col-md-6 hidden-xs">
          <div class="dm-column ">
            <form id="blog-search" action="/search" method="get">
              <span class="glyphicon glyphicon-search dm-icon-search" aria-hidden="true"></span>
              <input type="text" name="search" placeholder="搜索" value="">
            </form>
          </div>
        </div>
        <div id="dm-account" class="col-xs-4 col-sm-5 col-md-4">
          <div class="dm-column ">
            <ul>
              <li><a class="btn btn-success btn-login hidden-sm hidden-xs" href="/login">登录</a></li>
              <li><a class="btn btn-link btn-login visible-sm visible-xs" href="/login"><span class="glyphicon glyphicon-user"></span></a></li>
              <li><a class="btn btn-link btn-login visible-sm visible-xs" id="offcanvas-toggler" href="#"><span class="glyphicon glyphicon-list"></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <nav id="dm-navbar-sticky-wrapper" class="sticky-wrapper" style="height: 45px;">
    <section id="dm-navbar" class=" hidden-xs">
      <div class="container">
        <div class="row" style="position: relative;">
          <div id="dm-categories" class="col-sm-4 col-md-2">
              <div class="has-sub">
                <a href="/home/categories" class="cat-name">分类<span class="caret"></span></a>
                <div class="sub-nav">
                  <span class="triangle"></span>
                  <div class="sub-nav-list">
                    {% for cat in categories %}
                    <a href="/home/categories/{{ cat.name }}">{{ cat.name }}</a>
                    {% endfor %}
                  </div>
                </div>
              </div>
          </div>
          <div id="dm-menu" class="col-sm-8 col-md-7" style="position: static;">
            <div class="dm-column ">
              <div class="dm-megamenu-wrapper">
                <ul class="dm-megamenu-parent menu-fade hidden-xs">
                  <li class="dm-menu-item"><a href="/">首页</a></li>
                  <li class="dm-menu-item"><a href="/home/archives">归档</a></li>
                  <li class="dm-menu-item"><a href="/home/tags">标签</a></li>
                  <li class="dm-menu-item"><a href="/aboutDouMi">关于豆米</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </nav>
  <section id="dm-page-title">
    <div class="row">
      <div id="dm-title" class="col-sm-12 col-md-12">
        <div class="dm-column ">
          <div class="dm-page-title">
            <div class="container">
              <ol class="breadcrumb">
               <li>
                 <a href="/" class="pathway">首页</a>
               </li>
                <li><a href="/home#index" class="active">博文概览</a></li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="blog-main-content">
    <div class="container">
      <div class="row">
        <!-- Main content -->
        {% block content %}
        {% endblock %}
        <!-- sidebar content -->
        <aside class="col-md-4 sidebar">
          <div id="secondary" class="widget-area" role="complementary">
            <aside id="archives-2" class="widget widget_archive">
              <h4 class="title">归档</h4>
              <ul>
                {% for archive in archives %}
                <li><a href="/home/archives/{{ archive.archiveTime }}">{{ archive.archiveTime }}</a><span>({{ archive.numOfArticles}})</span></li>
                {% endfor %}
              </ul>
            </aside>
            <aside id="text-6" class="widget widget_text">
              <div class="textwidget">
                <h4 class="title">
                  标签
                </h4>
                <div class = "tag-cloud">
                {% for tag in tags %}
                <a href="/home/tags/{{ tag.name }}">{{ tag.name }}</h2></a>
                {% endfor %}
                </div>
              </div>
            </aside>
            <aside id="categories-4" class="widget widget_categories">
              <h4 class="title">热门文章</h4>
              <ul>

              </ul>
            </aside>
            <aside id="text-4" class="widget widget_text">
              <h4 class="widget-title">订阅到RSS</h4>
              <div class="textwidget"><a href="#">通过RSS订阅</a></div>
            </aside>
          </div><!-- #secondary -->
        </aside>
      </div><!-- row -->
    </div><!-- container -->
  </div>
  <div class="offcanvas-menu">
    <a href="#" class="close-offcanvas"><i class="fa fa-remove"></i></a>
    <div class="offcanvas-inner">
      <div class="dm-module "><h3 class="dm-module-title">ShapeBootstrap</h3><div class="dm-module-content"><ul class="nav menu">
        <li class="item-101"><a href="/">Home</a></li>
        <li class="item-105"><a href="/items">All Items</a></li>
        <li class="item-111"><a href="/popular-items">Popular Items</a></li>
        <li class="item-106"><a href="/free-templates">Free Templates</a></li>
        <li class="item-118"><a href="/blog">Blog</a></li>
        <li class="item-125 deeper parent">
          <a href="#">Help</a>
          <span class="offcanvas-menu-toggler collapsed" data-toggle="collapse" data-target="#collapse-menu-125" role="button" aria-expanded="false" aria-controls="collapse-menu-125">
            <i class="fa fa-plus"></i>
            <i class="fa fa-minus"></i>
          </span>
          <ul class="collapse" id="collapse-menu-125">
            <li class="item-126"><a href="/forum">Community Forum</a></li>
            <li class="item-123"><a href="/help/contact">Contact Us</a></li>
            <li class="item-129"><a href="/licenses">Licenses</a></li>
          </ul>
        </li>
        <li class="item-131"><a href="/affiliates">Affiliates</a></li>
      </ul>
      </div></div>
    </div>
  </div>
  <div class="offcanvas-overlay"></div>
</div>
</body>
<script type="text/javascript">
  require(['../../js/articleShow']);
</script>
</html>



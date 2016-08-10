<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>{% block title %}{% endblock %}</title>
  {% block style %}
    <link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
    <link rel='stylesheet' href='/styles/blogFramwork.css'>
  {% endblock %}
  <script type='text/javascript'  src='/js/requirejs/require.min.js'></script>
  <script type='text/javascript'  src='/js/config.min.js'></script>
</head>
<body>
<div id='wrapper'>
  <!-- navigation header -->
  <header id='dm-header'>
    <div class='container'>
      <div class='row'>
      <!-- logo box -->
        <div id='dm-logo' class='col-xs-8 col-sm-3 col-md-2'>
          <div class='dm-column'>
            <a class='logo' href='/'>
              <h1>豆米的博客</h1>
            </a>
          </div>
        </div>
        <!-- search box -->
        <div id='dm-search' class='col-sm-4 col-md-6 hidden-xs'>
          <div class='dm-column '>
            <form id='blog-search' action='/search' method='get'>
              <span class='glyphicon glyphicon-search dm-icon-search' aria-hidden='true'></span>
              <input type='text' name='search' placeholder='搜索' value=''>
            </form>
          </div>
        </div>
        <!-- Login box -->
        <div id='dm-account' class='col-xs-4 col-sm-5 col-md-4'>
          <div class='dm-column '>
            <ul>
              <li><a class='btn btn-success btn-login hidden-sm hidden-xs' href='/login'>登录</a></li>
              <li><a class='btn btn-link btn-login visible-sm visible-xs' href='/login'><span class='glyphicon glyphicon-user'></span></a></li>
              <li><a class='btn btn-link btn-login visible-sm visible-xs' id='offcanvas-toggler' href='#'><span class='glyphicon glyphicon-list'></span></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Navigation Body -->
  <nav id='dm-navbar-sticky-wrapper' class='sticky-wrapper' style='height: 45px;'>
    <section id='dm-navbar' class=' hidden-xs'>
      <div class='container'>
        <div class='row' style='position: relative;'>
          <div id='dm-categories' class='col-sm-4 col-md-2'>
              <div class='has-sub'>
                <a href='#' class='cat-name'>分类<span class='caret'></span></a>
                <div class='sub-nav'>
                  <span class='triangle'></span>
                  <div class='sub-nav-list'>
                    {% for cat in categories %}
                    <a href='/blog/category/{{ cat.name }}'>{{ cat.name }}</a>
                    {% endfor %}
                  </div>
                </div>
              </div>
          </div>
          <!-- Navigation Menu Box -->
          <div id='dm-menu' class='col-sm-8 col-md-7' style='position: static;'>
            <div class='dm-column '>
              <div class='dm-megamenu-wrapper'>
                <ul class='dm-megamenu-parent menu-fade hidden-xs'>
                  <li class='dm-menu-item'><a href='/'>首页</a></li>
                  <li class='dm-menu-item'><a href='/aboutDouMi'>关于豆米</a></li>
                  <li class='dm-menu-item'><a href='/aboutSite'>关于本站</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </nav>
  <!-- Breadcrumb navigation Box -->
  <section id='dm-page-title'>
    <div class='row'>
      <div id='dm-title' class='col-sm-12 col-md-12'>
        <div class='dm-column '>
          <div class='dm-page-title'>
            <div class='container'>
              <ol class='breadcrumb'>
               <li>
                 <a href='/' class='pathway'>首页</a>
               </li>
                <li>
                  <a href='/blog' class='pathway'>博文概览</a>
                </li>
                {% for navTitle in breadcrumb%}
                {% if loop.last %}<li><a class='active'>{{ navTitle }}</a></li>
                {% else %} <li><a>{{ navTitle }}</a></li>
                {% endif %}
                {% endfor %}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Blog Content Box -->
  <div class='blog-main-content'>
    <div class='container'>
      <div class='row'>
        <!-- Main content -->
        {% block content %}
        {% endblock %}
        <!-- sidebar content -->
        <aside class='col-md-4 sidebar'>
          <div id='secondary' class='widget-area' role='complementary'>
            <!-- archive Box -->
            <aside id='archives' class='widget widget_archive'>
              <h4 class='title'>归档</h4>
              <ul>
                {% for archive in archives %}
                <li><a href='/blog/archive/{{ archive.oldArchiveTime }}'>{{ archive.archiveTime }}</a><span>({{ archive.numOfArticles}})</span></li>
                {% endfor %}
              </ul>
            </aside>
            <!-- tags cloud Box -->
            <aside class='widget'>
              <div class='tagsWidget'>
                <h4 class='title'>
                  标签
                </h4>
                <div class = 'tag-cloud'>
                {% for tag in tags %}
                <a href='/blog/tag/{{ tag.name }}'>{{ tag.name }}</a>
                {% endfor %}
                </div>
              </div>
            </aside>
            <!-- hotter Post Box -->
            <aside class='widget' id='hotterArticle'>
              <h4 class='title'>热门文章</h4>
              <ul>
              {% for article in hotterArticles %}
              <li><a href='/blog/{{ article.slug }}'>{{ article.title }}</a><span>({% if article.pageViewsCount != undefined %}{{ article.pageViewsCount}}){% else %}0{% endif%}</span></li>
              {% endfor %}
              </ul>
            </aside>
            <!-- blog statistics Box -->
            <aside class='widget blog-statistics'>
              <h4 class='title'>博客统计</h4>
              <ul>
                <li>
                  <span>{{ numOfArticles  }}</span>文章数:
                </li>
                <li>
                  <span>{{ newArticlesToday }}</span>今日新增文章数:
                </li>
                <li>
                  <span>{{ totalVisitCounts }}</span>网站访问量:
                </li>
                <li>
                  <span>{{ todayVisitCounts }}</span>今日访问量:
                </li>
              </ul>
            </aside>
          </div>
        </aside>
      </div><!-- row -->
    </div><!-- container -->
  </div>
  <!-- Responsive navigation -->
  <div class='offcanvas-menu'>
    <a href='#' class='close-offcanvas'><i class='fa fa-remove'></i></a>
    <div class='offcanvas-inner'>
      <div class='dm-module '><h3 class='dm-module-title'>ShapeBootstrap</h3><div class='dm-module-content'><ul class='nav menu'>
        <li class='item-101'><a href='/'>Home</a></li>
        <li class='item-105'><a href='/items'>All Items</a></li>
        <li class='item-111'><a href='/popular-items'>Popular Items</a></li>
        <li class='item-106'><a href='/free-templates'>Free Templates</a></li>
        <li class='item-118'><a href='/blog'>Blog</a></li>
        <li class='item-125 deeper parent'>
          <a href='#'>Help</a>
          <span class='offcanvas-menu-toggler collapsed' data-toggle='collapse' data-target='#collapse-menu-125' role='button' aria-expanded='false' aria-controls='collapse-menu-125'>
            <i class='fa fa-plus'></i>
            <i class='fa fa-minus'></i>
          </span>
          <ul class='collapse' id='collapse-menu-125'>
            <li class='item-126'><a href='/forum'>Community Forum</a></li>
            <li class='item-123'><a href='/help/contact'>Contact Us</a></li>
            <li class='item-129'><a href='/licenses'>Licenses</a></li>
          </ul>
        </li>
        <li class='item-131'><a href='/affiliates'>Affiliates</a></li>
      </ul>
      </div></div>
    </div>
  </div>
  <div class='offcanvas-overlay'></div>
  <!-- Footer Box -->
  <footer class='footer'>
    <div>
      Copyright © <a href='/'>豆米博客</a>. 2016 • All rights reserved. | 浙ICP备15041819号-1
    </div>
  </footer>
</div>
</body>
</html>



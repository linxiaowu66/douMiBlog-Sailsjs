<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>{% block title %}{% endblock %}</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keywords" content="豆米 前端 博客 后台管理">
  <meta name="description" content="豆米博客的管理后台，包含文章的增删改查，用户管理以及标签管理，后期功能增加中....">
  {% block style %}
  <link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
  <link rel='stylesheet' href='/styles/navOfManagement.css'>
  {% endblock %}
  <script type='text/javascript'  src='/js/requirejs/require.min.js'></script>
  <script type='text/javascript'  src='/js/config.js'></script>

</head>
<body>
<!--   outer container -->
<div class='dm-blog'>
    <div class='dm-blog blog-app'>
      <div class='blog-realview'>
        <!-- Left navigator -->
        <nav class='dm-blog dm-sidebar' role='navigation'>
          <header class='dm-nav-header'>
            <div class='square'></div>
            <h1>豆米的博客</h1>
          </header>
          <section class='dm-nav-body'>
            <div class='profile-photo-container'>
              <img src='../../images/blog-img.jpg' alt='Profile Photo' class='img-responsive'>
              <div class='profile-photo-overlay'></div>
            </div>
            <!-- Search box -->
            <div class='dm-search-form' role='search'>
              <div class='input-group'>
                <button type='submit' class='glyphicon glyphicon-search icon dm-search'></button>
                <input type='text' class='form-control' placeholder='Search' id='search-input'>
                <div id='query-results' style='display:none'>
                  <div class='res-dropdown'>
                  </div>
                </div>
              </div>
            </div>
            <div class='mobile-menu-icon'>
              <i class='glyphicon glyphicon-align-justify icon'></i>
            </div>
            <!-- navigation menu box -->
            <ul class='dm-left-nav'>
              <li {% if (navIndex == 0) %}class='active'{% endif %}><a href='/douMi/editor'><i class='glyphicon glyphicon-pencil icon'></i>新建博文</a></li>
              <li {% if (navIndex == 1) %}class='active'{% endif %}><a href='/douMi' ><i class='glyphicon glyphicon-list icon'></i>博文列表</a></li>
              <li {% if (navIndex == 2) %}class='active'{% endif %}><a href='/douMi/users'><i class='glyphicon glyphicon-user icon'></i>用户管理</a></li>
              <li {% if (navIndex == 3) %}class='active'{% endif %}><a href='/logout'><i class='glyphicon glyphicon-eject icon'></i>退出</a></li>
            </ul>
          </section>
          <footer class='dm-nav-footer'>
            <p>Copyright &copy; 2017
              | Designed by <a href='/blog' target='_blank'>豆米博客</a></p>
          </footer>
        </nav>
        <!-- Main content -->
        {% block content %}
        {% endblock %}
      </div>
    </div>
  </div>
</body>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85522412-1', 'auto');
  ga('send', 'pageview');

</script>
</html>

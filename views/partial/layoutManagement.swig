<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel="stylesheet" href="../../vender/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../../styles/navOfManagement.css">
  {% endblock %}

  <script type="text/javascript"  src="../../js/requirejs/require.min.js"></script>
  <script type="text/javascript"  src="../../js/config.js"></script>

</head>
<body>
  <div class="dm-blog">
    <div class="dm-blog blog-app">
      <div class="blog-realview">
        <!-- Left navigator -->
        <nav class="dm-blog dm-sidebar" role="navigation">
          <header class="dm-nav-header">
            <div class="square"></div>
            <h1>豆米的博客</h1>
          </header>
          <section class="dm-nav-body">
            <div class="profile-photo-container">
              <img src="../../images/blog-img.jpg" alt="Profile Photo" class="img-responsive">
              <div class="profile-photo-overlay"></div>
            </div>
            <!-- Search box -->
            <form class="dm-search-form" role="search">
              <div class="input-group">
                <button type="submit" class="glyphicon glyphicon-search icon dm-search"></button>
                <input type="text" class="form-control" placeholder="Search" name="srch-term" id="srch-term">
              </div>
            </form>
            <div class="mobile-menu-icon">
              <i class="glyphicon glyphicon-align-justify icon"></i>
            </div>
            <ul class="dm-left-nav">
              <li {% if (navIndex == 0) %}class="active"{% endif %}><a href="/douMi/editor"><i class="glyphicon glyphicon-pencil icon"></i>新建博文</a></li>
              <li {% if (navIndex == 1) %}class="active"{% endif %}><a href="/douMi" ><i class="glyphicon glyphicon-list icon"></i>博文列表</a></li>
              <li {% if (navIndex == 2) %}class="active"{% endif %}><a href="/douMi/users"><i class="glyphicon glyphicon-user icon"></i>用户管理</a></li>
              <li {% if (navIndex == 3) %}class="active"{% endif %}><a href="/logout"><i class="glyphicon glyphicon-eject icon"></i>退出</a></li>
            </ul>
          </section>
          <footer class="dm-nav-footer">
            <p>Copyright &copy; 2016
              | Designed by <a href="/home" target="_parent">豆米博客</a></p>
          </footer>
        </nav>
        <!-- Main content -->
        {% block content %}
        {% endblock %}
      </div>
    </div>
  </div>
</body>
</html>


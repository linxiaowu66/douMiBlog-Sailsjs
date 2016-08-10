<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
  {% endblock %}

  <script type='text/javascript'  src='/js/requirejs/require.min.js'></script>
  <script type='text/javascript'  src='/js/config.min.js'></script>
</head>
<body>
  {% block content %}{% endblock %}
  <footer class='footer'>
  <div>
    Copyright © <a href='/'>豆米博客</a>. 2016 • All rights reserved. | 浙ICP备15041819号-1
  </div>
</footer>
</body>
</html>

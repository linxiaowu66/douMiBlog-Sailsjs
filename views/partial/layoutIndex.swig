<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="Keywords" content="豆米 前端 博客 服务器 生活">
  <meta name="Description" content="豆米博客，用心、用爱、用力拥抱热爱前端">
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
  {% endblock %}

  <script type='text/javascript'  src='/js/requirejs/require.min.js'></script>
  <script type='text/javascript'  src='/js/config.js'></script>
  <script>
	var _hmt = _hmt || [];
	(function() {
  	var hm = document.createElement("script");
  	hm.src = "//hm.baidu.com/hm.js?3152c3de98b0032125ac07f988e65bb2";
  	var s = document.getElementsByTagName("script")[0]; 
  	s.parentNode.insertBefore(hm, s);
	})();
</script>
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

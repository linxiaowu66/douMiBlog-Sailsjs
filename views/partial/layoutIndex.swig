<!doctype html>
<html>
<head>
  <meta charset='utf-8'>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="keywords" content="豆米 前端 博客 服务器 生活">
  <meta name="description" content="豆米博客，用心、用爱、用力拥抱热爱前端">
  <meta name="HandheldFriendly" content="True">
  <meta name="referrer" content="origin">
  <meta property="og:site_name" content="豆米的博客">
  <meta property="og:type" content="website">
  <meta property="og:title" content="豆米的博客">
  <meta property="og:description" content="豆米博客，用心、用爱、用力拥抱热爱前端">
  <meta property="og:url" content="https://blog.5udou.cn">
  <meta property="og:image" content="../../images/blog-img.jpg">
  <script type="application/ld+json">
    {
    "@context": "http://schema.org",
    "@type": "Website",
    "publisher": "linxiaowu66",
    "url": "https://blog.5udou.cn",
    "image": "../../images/blog-img.jpg",
    "description": "豆米博客，用心、用爱、用力拥抱热爱前端"
    }
  </script>
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel='stylesheet' href='/vender/bootstrap/dist/css/bootstrap.min.css'>
  {% endblock %}
  <script type='text/javascript'  src='/js/requirejs/require.min.js'></script>
  <script type='text/javascript'  src='/js/config.js'></script>

</head>
<body>
  {% block content %}{% endblock %}
  <footer class='footer'>
  <div>
    Copyright © <a href='/'>豆米博客</a>. 2017 • All rights reserved. | 浙ICP备15041819号-1
  </div>
</footer>
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

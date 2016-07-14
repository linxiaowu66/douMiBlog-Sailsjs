<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}{% endblock %}</title>

  {% block style %}
  <link rel="stylesheet" href="/vender/bootstrap/dist/css/bootstrap.min.css">
  {% endblock %}

  <script type="text/javascript"  src="/js/requirejs/require.min.js"></script>
  <script type="text/javascript"  src="/js/config.js"></script>
</head>
<body>
  {% block content %}{% endblock %}
</body>
</html>

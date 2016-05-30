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
  {% block content %}{% endblock %}

    {% block script %}
    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="jquery" src="./vender/jquery/dist/jquery.min.js"></script>
    <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="bootstrap" src="./vender/bootstrap/dist/js/bootstrap.min.js"></script>
    {% endblock %}
</body>
</html>

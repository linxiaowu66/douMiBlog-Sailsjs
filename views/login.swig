{% extends 'partial/layout.swig' %}

{% block title %}豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" type="text/css" href="./styles/login-basic-styles.css">
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Josefin+Sans:400,700,700italic,600'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
<link rel="stylesheet" href="./styles/login-main-styles.css">
<!--[if IE]>
<script src="http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js"></script>
<![endif]-->
{% endblock %}

{% block content %}
<div class="htmleaf-container">
  <div class="cont_principal">
    <header class="htmleaf-header">
      <h1>豆米的博客 <span>有趣、五味杂陈的前端生活博客</span></h1>
      <div class="htmleaf-links">
        <a class="htmleaf-icon icon-htmleaf-home-outline" href="/" title="博客首页"><span> 豆米的博客</span></a>
        <a class="htmleaf-icon icon-htmleaf-arrow-forward-outline" href="/" title="返回文章"><span> 返回文章</span></a>
      </div>
    </header>
    <div class="cont_join  ">
      <div class="cont_letras">
        <p>We</p>
        <p>LOVE</p>
        <p>LIFE</p>
      </div>

      <div class="cont_form_join">
        <h2>JOIN</h2>

        <p>用户名:</p>
        <input type="text" class="input_text" />

        <p>密　码:</p>
        <input type="text" class="input_text" />

        <p>验证码:</p>
        <input type="password" class="input_text" />
      </div>

      <div class="cont_join_form_finish">
        <h2>Finish <i class="material-icons">&#xE5CA;</i></h2>
      </div>

      <div class="cont_btn_join">
        <a href="#" onclick='join_1()'>JOIN</a>
      </div>
    </div>
  </div>
</div>
{% endblock %}

{% block script %}
<script type="text/javascript" src="js/index.js"></script>
{% endblock %}

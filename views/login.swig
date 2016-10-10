{% extends 'partial/layoutIndex.swig' %}
{% set module='login' %}
{% block title %}登录 - 豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' type='text/css' href='/styles/loginBasicStyles.css'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/css?family=Josefin+Sans:400,700,700italic,600'>
<link rel='stylesheet prefetch' href='https://fonts.googleapis.com/icon?family=Material+Icons'>
<!--[if IE]>
<script src='http://libs.useso.com/js/html5shiv/3.7/html5shiv.min.js'></script>
<![endif]-->
{% endblock %}

{% block content %}
<div class='htmleaf-container'>
  <div class='cont_principal'>
    <!--Header Box-->
    <header class='htmleaf-header'>
      <h1>豆米的博客 <span>有趣、五味杂陈的前端生活博客</span></h1>
      <div class='htmleaf-links'>
        <a class='icon' href='/' title='博客首页'><span class='glyphicon glyphicon-home'></span></a>
        <a class='icon' href='/blog' title='返回文章'><span class='glyphicon glyphicon-share-alt'></span></a>
      </div>
    </header>
    <!--Form Box-->
    <form id='login-form' action='/login' method='post'>
      <div class='cont_join  '>
        <div class='cont_letras'>
          <p>We</p>
          <p>LOVE</p>
          <p>LIFE</p>
        </div>

        <div class='cont_form_join'>
          <h2>JOIN</h2>

          <p>邮箱:</p>
          <input type='text' class='input_text' name='email' id='email'/>

          <p>密码:</p>
          <input type='password' class='input_text' name='password' id='password' />

          <div class='login_error'>
            <h2>邮箱或密码不正确</h2>
          </div>
        </div>

        <div class='cont_join_form_finish'>
          <h2>登录成功 <i class='material-icons'>&#xE5CA;</i></h2>
        </div>

        <div class='cont_btn_join' id='login_btn'>
          <a href='#'>登录</a>
        </div>
      </div>
    </form>
  </div>
</div>
<script type='text/javascript'>
  require(['../js/login']);
</script>
{% endblock %}

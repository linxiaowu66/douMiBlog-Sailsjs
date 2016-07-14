{% extends 'partial/layoutIndex.swig' %}
{% set module='register' %}
{% block title -%}注册{%- endblock %}

{% block style %}
{% parent %}
<link rel="stylesheet" href="/styles/register.css">
{% endblock%}

{% block content -%}
<div id = "flex-flow">
<div id = "wrapper">
<section class="content">
<form id = "sign-up" action="/register" method="post">
  <h1 class="ui dividing header">欢迎注册</h1>
  {% if err -%}
  <div class="ui error message" style="display: block">
    <div class="header">注册失败</div>
    <p>邮箱已被注册</p>
  </div>
  {%- endif %}

  <div class="field">
    <span class="glyphicon glyphicon-envelope">
    <input id="email" name="email" type="email" placeholder="填写邮箱">
    </span>
  </div>
  <div class="field">
    <span class="glyphicon glyphicon-lock">
    <input id="password" name="password" type="password" placeholder="填写密码（不少于6个字符）"/>
    </span>
  </div>
  <div class="field">
    <span class="glyphicon glyphicon-user">
    <input id="name" name="fullname" placeholder="请输入您的昵称"/>
    </span>
  </div>

  <div class="field">
    <div class="ui buttons">
      <button class="button btn-success" type="submit">注册</button>
    </div>
  </div>
</form>
</section>
</div>
</div>
{%-endblock %}

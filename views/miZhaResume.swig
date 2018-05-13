{% extends 'partial/layoutIndex.swig' %}

{% block title %}关于豆米 - 豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/resume.css'>
{% endblock %}

{% block content %}
<section class='wrapper'>
  <section class="personal-info">
    <figure class='author-image'>
      <a class='img' ><span class='hidden'>豆米的头像</span></a>
    </figure>
    <p class="name">林光</p>
    <p class="summary">全栈的忠实粉丝，努力为前端发展添砖加瓦</p>
    <div class="another">
      <span>1990.07.07</span>
      <span>杭州</span>
      <span>151****53</span>
      <span>linguang661990@126.com</span>
    </div>
  </section>
  <section class="experiment">
      <div class='title'>
        <p>工作经历</a>
      </div>
      <section class="dianwoda">
        <div class="company">
          <span>点我达</span>
          <span>2016.08 ~ 至今</span>
        </div>
        <div class="project">
          <p class="name">骑手和商家混合APP</p>
          <ul>
            <li>参与项目的优化和维护，需求迭代</li>
            <li>参与网关的开发优化、部署、监控</li>
          </ul>
        </div>
        <div class="project">
          <p class="name">React UI组件库</p>
          <ul>
            <li>负责UI组件库的框架搭建以及文档展示</li>
            <li>参与开发十余个组件，目前提供多达24个组件，基本满足开发用到的组件</li>
          </ul>
        </div>
        <div class="project">
          <p class="name">网关API可视化测试平台</p>
          <ul>
            <li>负责网关API文档自动生成工具实现</li>
            <li>从前端到Nodejs再到MongoDB，基于swagger实现一套可视化的API文档展示平台并可以提供自测试</li>
          </ul>
        </div>
        <div class="project">
          <p class="name">移动端CLI和脚手架实现</p>
          <ul>
            <li>负责CLI工具的开发</li>
            <li>实现移动端四套脚手架</li>
          </ul>
        </div>
        <div class="project">
          <p class="name">快递微信公众号项目</p>
          <ul>
            <li>负责将快递项目从jQuery迁移到React框架</li>
            <li>打通一整套微信公众号开发的流程</li>
            <li>打造一套通用native调用Api，兼容原生APP和微信</li>
          </ul>
        </div>
        <div class="project">
          <p class="name">Dcloud APP</p>
          <ul>
            <li>搭建 Dcloud 的 APP 框架 </li>
            <li>完成网关开发，使用typescript以及AOP、DI的思想去实现</li>
          </ul>
        </div>
      </section>
  </section>
</section>
{% endblock %}

{% block script %}

{% endblock %}
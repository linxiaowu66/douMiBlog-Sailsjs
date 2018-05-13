{% extends 'partial/layoutIndex.swig' %}

{% block title %}关于豆米 - 豆米的博客{% endblock %}

{% block style %}
{% parent %}
<link rel='stylesheet' href='/styles/aboutDouMi.css'>
{% endblock %}

{% block content %}
<section class='wrapper'>
  <div class='blogProfile'>
    <figure class='author-image'>
      <a class='img' href='/aboutDouMi/'><span class='hidden'>豆米的头像</span></a>
    </figure>
    <section class='author'>
      <h2><a href='/aboutDouMi/'>关于豆米</a></h2>
      <p>豆米目前生活在“上有天堂，下有苏杭”的杭州，美不胜收的美景之地也收获着甜蜜恩爱的生活。豆米热爱前端，热爱互联网，豆米是洋芋(土豆-豆)和米喳(米)的简称。</p>
      <div class='author-meta'>
        <span class='glyphicon glyphicon-map-marker'>杭州</span>
        <span class='glyphicon glyphicon-link'><a href='https://www.5udou.cn'>https://www.5udou.cn</a></span>
      </div>
      <div class="feature">
        <h4>关于米</h4>
        <p>一个烧得一手好菜的程序猿。</p>
        <p>我的Github：<a href="https://github.com/linxiaowu66">https://github.com/linxiaowu66</a></p>
        <p>我的简历：<a href="https://blog.5udou.cn/resume/mizha">https://blog.5udou.cn/resume/mizha</a></p>
        <p>我的掘金首页：<a href="https://juejin.im/user/5803811ba0bb9f005887dca6">https://juejin.im/user/5803811ba0bb9f005887dca6</a></p>
      </div>
      <div class="feature">
        <h4>关于豆</h4>
        <p>一个“给我一点色彩，就能让生活五颜六色”的程序媛。</p>
        <p>我的Github：<a href="https://github.com/heyangxing">https://github.com/heyangxing</a></p>
        <p>我的简历：待开发</p>
        <p>我的掘金首页：<a href="https://juejin.im/user/58034ce92e958a0055d721e4">https://juejin.im/user/58034ce92e958a0055d721e4</a></p>
      </div>
    </section>
  </div>
  <div class="why">
    <h2>为什么要有这么一个博客？</h2>
    <p>我们的初衷是想要记录工作学习的点滴，把想总结的给总结出来，供社区的前端童鞋们参考，而后写着写着也混杂了一些生活的感悟，以后或许会有更多题材，但愿我们的生活够丰富。</p>
  </div>
</section>
{% endblock %}

{% block script %}

{% endblock %}

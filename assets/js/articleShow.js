'use strict';

define(['jquery'], function($){

  $(document).ready(function(){
    $('#page-top').click(function(){
      <!--此处加入finish防止多次点击回顶部或者回底部多次触发动画的bug也可以使用stop()来替换finish()-->
      $("html,body").finish().animate({"scrollTop":"0px"},'normal');
    });
  });
});

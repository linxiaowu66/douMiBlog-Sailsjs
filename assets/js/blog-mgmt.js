'use strict';

define(['jquery','bootstrap', 'markdown','highlight'], function($, bs, marked, hljs){
  
  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $(document).ready(function(){
    var activeElement = $(".post-list li.active");
    var currClickElement;

    $(document).on("click",".blogIndex",function(){
      var blogIndex = 0;
      currClickElement = $(this);
      blogIndex = $(this).attr("data-set");

      $.ajax({
        type: "GET",
        url: "/douMi/" + blogIndex,
        data: {

        },
        dataType: "json",
        success: function(data){
          activeElement.removeClass("active");
          currClickElement.children("li:eq(0)").addClass("active");

          activeElement = $(".post-list li.active");

          $(".content-preview").html(marked(data.content));

          $('.blog-edit').attr("href", "/douMi/editor/" + blogIndex);
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });
  });
});


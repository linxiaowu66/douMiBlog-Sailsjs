
define(['jquery', 'markdown','highlight'], function($, marked, hljs){
  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  $(document).ready(function(){
    $('.articleLink,.blog-single-post-title').click(function (){
      var getUrl = "";

      if ($(".post").attr("url-data") !== undefined){
        getUrl = "/home/" + ($(".post").attr("url-data"));
      }
      $.ajax({
        type: "GET",
        url: getUrl,
        data: {
        },
        dataType: "json",
        success: function(data){
          console.log('send ok');
          //history.replaceState("","","/home/" + data.url);
          $('.post').remove();
          $("main.col-md-8").html(marked(data.content));
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });
  });
});


define(['jquery', 'markdown','highlight','hashchange'], function($, marked, hljs){
  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  
  $(document).ready(function(){
    var currentActiveEle = $(".breadcrumb .active");

   $(window).hashchange( function(){
    var hash = location.hash,
        url,
        hasGetHomePage = 0;
    if (hash === null) {
        return;
    }
    if (hash == ''){
        url = "/home/";
        hasGetHomePage = 1;
    }else{
        url = "/home/" + hash.replace( /^#/, '' );
    }

    $.ajaxSetup({cache: false});
    $.get(url)
      .done(function(data, status, xhr){
        console.log('send ok');
        if (hasGetHomePage){
            $("main.col-md-8").html(data);
            hasGetHomePage = 0;
        }else{
        $('.post').remove();
        $("main.col-md-8").html(marked(data.content));
        currentActiveEle.removeClass("active");
        var title = "<li class=\"active\">"+ data.name +"</li>";
        $('.breadcrumb').append(title);
        currentActiveEle = $(".breadcrumb .active");
        }
    })
      .fail(function(xhr, status, errorThrown){})
      .always(function(data){})
   
   });            
  });
});


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
        url;
    if (hash === null || hash == '') {
        return;
    }

     url = "/home/" + hash.replace( /^#/, '' );


    $.ajaxSetup({cache: false});
    $.get(url)
      .done(function(data, status, xhr){
          $('.post').remove();
          $("main.col-md-8").html(marked(data.content));
          currentActiveEle.removeClass("active");
          var title = "<li class=\"active\">"+ data.name +"</li>";
          $('.breadcrumb').append(title);
          currentActiveEle = $(".breadcrumb .active");
    })
      .fail(function(xhr, status, errorThrown){})
      .always(function(data){})

   });
  });
});

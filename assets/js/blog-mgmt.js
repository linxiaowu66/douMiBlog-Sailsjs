'use strict';

define(['jquery','bootstrap', 'markdown','highlight','hashchange'], function($, bs, marked, hljs){

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $(document).ready(function(){

    var activeElement = $(".post-list li.active");
    var currClickElement;

    $(window).hashchange( function(){
      var hash = location.hash;
      if (hash === null || hash === '') {
        return;
      }
      var url = "douMi/" + hash.replace( /^#/, '' );

      // Iterate over all nav links,toggle the active class and change the title.
      $('.post-list a').each(function(){
        var aTag = $(this);
        if(hash === $(aTag).attr('href'))
        {
          activeElement.removeClass("active");
          aTag.children("li:eq(0)").addClass("active");

          activeElement = $(".post-list li.active");
          //exit .each earlier, in case li in nav is found
          return false;
        }
      });
      //Ajax loading for the workspace.
      $.ajaxSetup({cache: false});
      $.get(url)
        .done(function(data, status, xhr){

          $(".content-preview").html(marked(data.content));

          $('.blog-edit').attr("href", "/douMi/editor/" + hash.replace( /^#/, '' ));
        })
        .fail(function(xhr, status, errorThrown){

        })
        .always(function(data){
          //TODO what to do?
        });

    });

  });
});


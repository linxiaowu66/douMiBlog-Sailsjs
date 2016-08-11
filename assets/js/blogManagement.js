'use strict';

define(['jquery','bootstrap', 'markdown','highlight','hashchange'], function($, bs, marked, hljs){

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $(document).ready(function(){

    var activeElement = $('.post-list li.active');
    var activeNavIndex = $('.dm-left-nav .active');
    var currClickElement;

    $(window).hashchange( function(){
      var hash = location.hash;
      if (hash === null || hash === '') {
        return;
      }
      var url = 'douMi/' + hash.replace( /^#/, '' );

      // Iterate over all nav links,toggle the active class and change the title.
      $('.post-list a').each(function(){
        var aTag = $(this);
        if(hash === $(aTag).attr('href'))
        {
          activeElement.removeClass('active');
          aTag.children('li:eq(0)').addClass('active');

          activeElement = $('.post-list li.active');
          //exit .each earlier, in case li in nav is found
          return false;
        }
      });
      //Ajax loading for the workspace.
      $.ajaxSetup({cache: false});
      $.get(url)
        .done(function(data, status, xhr){

          $('.content-preview').html(data.content);

          $('.blog-edit').attr('href', '/douMi/editor/' + hash.replace( /^#/, '' ));
        })
        .fail(function(xhr, status, errorThrown){

        })
        .always(function(data){
          //TODO what to do?
        });

    });
    var totalItemsCount = 0;

    $('.content-scroll').scroll(function (){

      /*If the scroll height add the box height is equal to the actual content height,
      * it indicates that we had reached the bottom*/
      if ($(this).scrollTop() + $(this).height() >= $(this).get(0).scrollHeight){
        
        var currentItems = Math.floor($(this).get(0).scrollHeight / $('.blogIndex li').outerHeight());

        var currentPage = currentItems / 10;
        if ((currentItems >= totalItemsCount) && (currentPage != 1)){
          //console.log('nothing to fetch');
          return;
        }

        var url = '/douMi/articles/page/' + (currentPage + 1);
        $.ajaxSetup({cache: false});
        $.get(url)
          .done(function(data, status, xhr){
            totalItemsCount = data.count;

            $.map(data.articleList,function(article){
              console.log(article);
              var ele = "<a href='#" + article.id + "' data-set='" + article.id + "' class='blogIndex'>" +
                "<li>" +
                "<div class='media'><div class='media-left'>" +
                "<img class='media-object' src='../images/icon-img.jpg' alt='douMiAvatar'>" +
                "</div>" +
                "<div class='media-body'>" +
                "<h4 class='media-heading'>" + article.title + "</h4>";
              if (article.status == 'published'){
                ele += "发布于" + article.timeDescription + "</div></div>";
              }else{
                ele += "<span>草稿</span></div></div>";
              }

              $('.post-list').append(ele);
            });
          })
          .fail(function(xhr, status, errorThrown){

          })
          .always(function(data){
            //TODO what to do?
          });
      }
    })
  });
});


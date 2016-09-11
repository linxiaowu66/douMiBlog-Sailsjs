'use strict';

define(['jquery'], function($){

  $(document).ready(function(){
    $('#right-menu-toggler').click(function(){
      $('.right-nav-menu').addClass('open');
    });

    $('.close-menu').click(function(){
      $('.right-nav-menu').removeClass('open');
    });

    var Accordion = function(el, multiple) {
      this.el = el || {};
      this.multiple = multiple || false;

      // Variables privadas
      var links = this.el.find('.link');
      // Evento
      links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function(e) {
      var el = e.data.el,
          next = $(this).next();

      next.slideToggle();
      $(this).parent().toggleClass('open');

      if (!e.data.multiple) {
        el.find('.submenu').not(next).slideUp().parent().removeClass('open');
      };
    }

    var accordion = new Accordion($('#accordion'), false);

    $("#search-input").blur(function(){
      $("#query-results").css("display","none");
      $('#search-input').val('');
    });
    $('.res-dropdown').on('mousedown','a', function(e){
      console.log($(this).attr('href'));
      window.location.href = '/blog/' + $(this).attr('href');
    });

    $('#search-input').bind('input propertychange', function() {
      var input = $(this).val();

      $.ajax({
        type: 'GET',
        url: '/blog/search/'+input,
        dataType: 'json',
        success: function(response){
          var searchHtml = '';
          if (response.data.length === 0){
            searchHtml = '<a class="option">抱歉，没有找到对应的文章</a>';
          }else{
            for (var index = 0; index < response.data.length; index++){
              searchHtml += '<a class="option" href="'+ response.data[index].slug + '">' + response.data[index].title +'</a>';
            }
          }
          $("#query-results").css("display","block");
          $('.res-dropdown').html(searchHtml);
        },
      });
    });

  });
});

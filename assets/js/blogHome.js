'use strict';

define(['jquery','bootstrap'], function($, bs){

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
  });
});

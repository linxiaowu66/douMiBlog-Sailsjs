

window.onload = function(){

  $('.post-settings').click(function(){
    $('.blog-realview').addClass('settings-menu-expanded');
  });

  $('.close').click(function (){
    $('.blog-realview').removeClass('settings-menu-expanded');
  })

}

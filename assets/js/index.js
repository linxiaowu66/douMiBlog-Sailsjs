'use strict';

define(['jquery','bootstrap'], function($){
  $(document).ready(function(){
    var t = 0;
    var  shakeOrNot = 0;
    $('#login_btn').click(function (event){
      event.preventDefault();
      var btn = $(this);

      if(t == 0){
        document.querySelectorAll('.cont_letras > p')[0].style.left = '200px';
        document.querySelectorAll('.cont_letras > p')[1].style.left = '-330px';
        document.querySelectorAll('.cont_letras > p')[2].style.left = '200px';
        setTimeout(function(){
          document.querySelector('.cont_join').className = 'cont_join cont_join_form_act';
        },1000);
        t++;
      }else{
        $.post('/login', $('#login-form').serialize())
          .done(function (data){
            if (data.error) {
              if (document.querySelector('.login_error').style.left === '43px'){
                if (shakeOrNot === 0){
                  document.querySelector('.login_error').className = 'login_error animated shake';
                  document.querySelector('.login_error').addEventListener("animationend", function(){document.querySelector('.login_error.animated.shake').className = 'login_error';});
                  shakeOrNot++;
                }else{
                  document.querySelector('.login_error').className = 'login_error animated shake';
                }
              }else{
                document.querySelector('.login_error').style.left = '43px';
              }
            } else {
              //auth sucessfully
              document.querySelector('.cont_form_join').style.bottom = '-420px';
              document.querySelector('.cont_join').className = 'cont_join cont_join_form_act cont_join_finish';
              setTimeout(function(){location.href = '/douMi';},1500);
            }
          })
          .fail(function (){

          })
          .always(function (){

          });
      }
    });

  });
});


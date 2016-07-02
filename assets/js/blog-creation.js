'use strict';

define(['jquery','bootstrap', 'datePicker', 'markdown','highlight','convertToPinYin'], function($, bs, date, marked, hljs, toPinYin){

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  $(document).ready(function(){

    $('.post-settings').click(function(){
      $('.blog-realview').addClass('settings-menu-expanded');
    });

    $('.close').click(function (){
      $('.blog-realview').removeClass('settings-menu-expanded');
    })

    function updatePadding(srcObj, inputObj){
      /*Calculate the padding left value*/
      var spanNum = srcObj.children().length;
      var firstSpan = srcObj.children().eq(0);
      var totalWidth = 2,
        paddingRight = 0,
        marginRight = 0,
        borderRight = 0;
      for (index = 0; index < spanNum; index++){
        totalWidth += srcObj.children().eq(index).width();
      }

      if (firstSpan.length !== 0)
      {
        paddingRight = parseInt(firstSpan.css('padding-right'));
        marginRight = parseInt(firstSpan.css('margin-right'));
        borderRight = parseInt(firstSpan.css('border-right-width'));
      }

      totalWidth += spanNum * (paddingRight * 2 + marginRight + borderRight * 2);

      inputObj.css("padding-left", totalWidth);

    }

    $('#cat-input').focus(function(){
      $('#all-cats').css('display','block');
    });



    var categories = [];
    var originalArrLength = 0;
    (function(){
      for(var index = 0; index < $('.cat-dropdown').children().length; index++){
        categories.push($('.cat-dropdown').children().eq(index).html());
      }
      originalArrLength = categories.length;
    })();

    $('#cat-input').bind('input propertychange', function() {
      var input = $(this).val().toLowerCase(),
        firstMatch = 0,
        Opt = "";
      $('.cat-dropdown').children('div').remove();
      var firstOpt = "<div class=\"option\">Add " + input + " ...<\/div>";
      $('.cat-dropdown').append(firstOpt);
      for(var index = 0; index < categories.length; index++){
        var toLowerCase = categories[index].toLowerCase();
        /*As indexOf function is case sensitive, transform them to lower case*/
        if (toLowerCase.indexOf(input) !== -1){
          if (firstMatch === 0){
            Opt = "<div class=\"option active\">" + categories[index] + "<\/div>";
            firstMatch++;
          }else{
            Opt = "<div class=\"option\">" + categories[index] + "<\/div>";
          }
          $('.cat-dropdown').append(Opt);
        }
      }
    });

    $('.cat-dropdown').on('mousedown','div', function(e){

      var select = $(this).html(),
        firstMatch = 0,
        Opt = "",
        newItemOrNot = 0;

      /*If there is already existing a category, we can`t add any more.*/
      if ($('#item').children('span').length == 1){
        $('#cat-input').val("");
        $('#all-cats').css('display','none');
        $('.cat-dropdown').children('div').remove();
        for(var index = 0; index < categories.length; index++){
          if (firstMatch === 0){
            Opt = "<div class=\"option active\">" + categories[index] + "<\/div>";
            firstMatch++;
          }else{
            Opt = "<div class=\"option\">" + categories[index] + "<\/div>";
          }
          $('.cat-dropdown').append(Opt);
        }
        return;
      }

      /*Firstly, judge the select element is the new one or not*/
      var colonPos = select.indexOf('...');
      if ((select.indexOf('Add') !== -1) && colonPos !== -1){
        select = select.substring(4, colonPos - 1);
        newItemOrNot = 1;
      }

      /*Secondly, append this select element to correct position*/
      var selectdText = "<option selected=\"selected\">" + select + "<\/option>";
      var input = "<span title=\"单击删除该分类\">" + select + "<\/span>"
      $("#category").append(selectdText);
      $("#item").append(input);

      /*Thirdly, if it is not new one, we not need to push it to category array*/
      if (newItemOrNot === 1){
        categories.push(select);
      }

      $('#all-cats').css('display','none');
      $('#cat-input').val("");
      updatePadding($('#item'), $('#cat-input'));
      $('.cat-dropdown').children('div').remove();
      for(var index = 0; index < categories.length; index++){
        if (firstMatch === 0){
          Opt = "<div class=\"option active\">" + categories[index] + "<\/div>";
          firstMatch++;
        }else{
          Opt = "<div class=\"option\">" + categories[index] + "<\/div>";
        }
        $('.cat-dropdown').append(Opt);
      }
    });

    $('#item').on('click','span', function(){
      var select = $(this).html(),
        firstMatch = 0,
        Opt = "";

      for (var index = 0; index < categories.length; index++){
        if ((categories[index] === select) && (index >= originalArrLength)){
          categories.splice(index, 1);
        }
      }
      $('.cat-dropdown').children('div').remove();
      for(var index = 0; index < categories.length; index++){
        if (firstMatch === 0){
          Opt = "<div class=\"option active\">" + categories[index] + "<\/div>";
          firstMatch++;
        }else{
          Opt = "<div class=\"option\">" + categories[index] + "<\/div>";
        }
        $('.cat-dropdown').append(Opt);
      }
      $(this).remove();

      updatePadding($('#item'), $('#cat-input'));
    });

    $('#cat-input').blur(function(){
      $('#all-cats').css('display','none');
    });

    $('#txtTag2').focus(function(){
      updatePadding($('#tags'), $('#txtTag2'));
    });

    $('#cat-input').focus(function(){
      updatePadding($('#item'), $('#cat-input'));
    });

    $('#txtTag2').blur(function(){

      var input = $(this).val();
      var result = input.split(',');
      var spanNum = $('#tags').children().length;

      if (result == "" || spanNum === 3){
        /*Clear the input text*/
        $(this).val("");
        return;
      }
      var index;
      $(this).val("");
      if (result.length + spanNum > 3){
        result.length = 3 - spanNum;
      }
      for (index = 0; index < result.length; index++){
        var insertElement = '<span title="单击删除该标签">' + result[index] +'</span>'
        $('#tags').append(insertElement);
      }

      updatePadding($('#tags'), $('#txtTag2'));
    });

    $('.existingTag').click(function(){
      var spanNum = $('#tags').children().length;
      if (spanNum === 3){
        $('#txtTag2').val("");
        return;
      }

      var select = $(this).html();
      var insertElement = '<span title="单击删除该标签">' + select +'</span>'
      $('#tags').append(insertElement);

      $(this).addClass("act");
      updatePadding($('#tags'), $('#txtTag2'));
    });

    $('#tags').on('click','span', function(){
      var select = $(this).html();

      for (var index = 0; index < $("#td_tag21").children().length; index++){
        if ($("#td_tag21").children().eq(index).text() === select){
          $("#td_tag21").children().eq(index).removeClass("act");
        }
      }

      $(this).remove();

      updatePadding($('#tags'), $('#txtTag2'));
    });

    function collectAllTags(){

      var tags = "";

      for(var index = 0; index < $("#tags").children().length; index++){
        if (index ==0){
          tags = $("#tags").children().eq(index).html();
        }else{
          tags = tags + '&' + $("#tags").children().eq(index).html();
        }
      }
      return tags;
    };

    $('#save').click(function(){

      var articleId = ~0;
      var articleName = $("#entry-title").val();

      if ($(".dm-blog .content-viwer").attr("data-set") !== undefined){
        articleId = parseInt($(".dm-blog .content-viwer").attr("data-set"));
      }

      $.ajax({
        type: "POST",
        url: "/douMi/saveDraft/",
        data: {
          Name: articleName,
          text: $(".markdown-realtext").val(),
          publishTime: $("#articleTime").val(),
          tags: collectAllTags(),
          cat: $("#item").children().eq(0).html(),
          id: articleId,
          url: toPinYin.ConvertPinyin(articleName)
        },
        dataType: "json",
        success: function(data){
          console.log('send ok');
          history.replaceState("","","/douMi/editor/" + data.articleIdx);
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });

    $('#articleTime').datetimepicker({
      mask:'9999/19/39 29:59'
    });

    $('#publish').click(function(){
      var articleId = ~0;

      if ($(".dm-blog .content-viwer").attr("data-set") !== undefined){
        articleId = parseInt($(".dm-blog .content-viwer").attr("data-set"));
      }

      $.ajax({
        type: "POST",
        url: "/douMi/doPublish/",
        data: {
          Name: $("#entry-title").val(),
          text: $(".markdown-realtext").val(),
          publishTime: $("#articleTime").val(),
          tags: collectAllTags(),
          cat: $("#item").children().eq(0).html(),
          id: articleId
        },
        dataType: "json",
        success: function(data){
          console.log('publish ok');
          $('#dropdownMenu1').html("更新博文 <span class=\"caret\"></span>");
          $('#save').html("更新博文");
          $('#save').attr('id', 'update');
          $('#publish').html("撤销发布");
          $('#publish').attr('id', 'undoPublish');
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });

    $('.markdown-realtext').bind('input propertychange', function() {
        $('.preview-text').html(marked($(this).val()));

        $('.entry-word-count').html($('.markdown-realtext').val().length + " 个字")
    });

    $('#update').click(function(){

      var articleId = ~0;

      if ($(".dm-blog .content-viwer").attr("data-set") !== undefined){
        articleId = parseInt($(".dm-blog .content-viwer").attr("data-set"));
      }

      $.ajax({
        type: "POST",
        url: "/douMi/updatePub/",
        data: {
          Name: $("#entry-title").val(),
          text: $(".markdown-realtext").val(),
          publishTime: $("#articleTime").val(),
          tags: collectAllTags(),
          cat: $("#item").children().eq(0).html(),
          id: articleId
        },
        dataType: "json",
        success: function(data){
          console.log('updating Publish ok');
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });

    $('#undoPublish').click(function(){

      var articleId = ~0;

      if ($(".dm-blog .content-viwer").attr("data-set") !== undefined){
        articleId = parseInt($(".dm-blog .content-viwer").attr("data-set"));
      }

      $.ajax({
        type: "POST",
        url: "/douMi/undoPublish/",
        data: {
          Name: $("#entry-title").val(),
          text: $(".markdown-realtext").val(),
          publishTime: $("#articleTime").val(),
          tags: collectAllTags(),
          cat: $("#item").children().eq(0).html(),
          id: articleId
        },
        dataType: "json",
        success: function(data){
          $('#dropdownMenu1').html("保存草稿 <span class=\"caret\"></span>");
          $('#save').html("保存草稿");
          $('#save').attr('id', 'save');
          $('#publish').html("立即发布");
          $('#publish').attr('id', 'publish');
        },
        error: function(jqXHR){
          alert("发生错误：" + jqXHR.status);
        },
      });
    });
  });
});

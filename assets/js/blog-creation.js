'use strict';

define(['jquery', 'datePicker', 'markdown','highlight','convertToPinYin'], function($, date, marked, hljs, toPinYin){

  marked.setOptions({
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  var  articleHasPosted = false;

  $(document).ready(function(){

    $('#articleTime').datetimepicker({
      yearOffset:0,
      lang:'ch',
      timepicker:false,
      format:'Y-m-d',
      formatDate:'Y/m/d',
      minDate:'-1970/01/02', // yesterday is minimum date
      maxDate:'+1970/01/02' // and tommorow is maximum date calendar
    });

    function updatePadding(srcObj, inputObj){
      /*Calculate the padding left value*/
      var spanNum = srcObj.children().length;
      var firstSpan = srcObj.children().eq(0);
      var totalWidth = 2,
        paddingRight = 0,
        marginRight = 0,
        borderRight = 0;
      for (var index = 0; index < spanNum; index++){
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

    $('.post-settings').click(function(){
      $('.blog-realview').addClass('settings-menu-expanded');
    });

    $('.close').click(function (){
      $('.blog-realview').removeClass('settings-menu-expanded');
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

    function draftSuccessAction(data){
      console.log('send ok');
      history.replaceState("","","/douMi/editor/" + data.articleIdx);
      $(".dm-blog .content-viwer").attr("data-set", data.articleIdx);
      if (articleHasPosted === false){
        var appendElements = "<li role=\"separator\" class=\"divider\"></li><li><a id=\"delete\" href=\"/douMi/delete/"+ data.articleIdx + "\">删除博文</a></li>"
        $('.dropdown-menu').append(appendElements);
        articleHasPosted = true;
      }
    }

    function publishSuccessAction(data){
      console.log('publish ok');
      $('#dropdownMenu1').html("更新博文 <span class=\"caret\"></span>");
      $('#save').html("更新博文");
      $('#save').attr('id', 'update');
      $('#publish').html("撤销发布");
      $('#publish').attr('id', 'undoPublish');
    }

    function updatePubSuccessAction(data){
      console.log('updating Publish ok');
    }

    function undoPubSuccessAction(data){
      $('#dropdownMenu1').html("保存草稿 <span class=\"caret\"></span>");
      $('#save').html("保存草稿");
      $('#save').attr('id', 'save');
      $('#publish').html("立即发布");
      $('#publish').attr('id', 'publish');
    }

    function failureAction(jqXHR){
      alert("发生错误：" + jqXHR.status);
    }

    function articleCommonAction(postUrl,successCallback, failureCallback){
      var articleId = ~0;
      var articleName = $("#entry-title").val();
      var date = new Date();
      var dateString = "";
      var content = $(".markdown-realtext").val();
      var description = "";

      if ($(".dm-blog .content-viwer").attr("data-set") !== undefined){
        articleId = parseInt($(".dm-blog .content-viwer").attr("data-set"));
      }
      if ($("#articleTime").val() === ""){
        dateString += date.getFullYear();
        dateString += "-" + (date.getMonth() + 1);
        dateString += "-" + date.getDate();

        $("#articleTime").val(dateString);
      }else{
        dateString = $("#articleTime").val();
      }

      description = content.substr(0, 100);
      description = marked(description);
      /*Remove the html tags*/
      description = description.replace(/<\/?.+?>/g,"");
      /*Remove the whitespaces*/
      description = description.replace(/[\r\n]/g, "");
      description += "......";
      
      $.ajax({
        type: "POST",
        url: postUrl,
        data: {
          Name: articleName,
          text: content,
          publishTime: dateString,
          tags: collectAllTags(),
          cat: $("#item").children().eq(0).html(),
          id: articleId,
          url: toPinYin.ConvertPinyin(articleName),
          description: description
        },
        dataType: "json",
        success: function(data){successCallback(data)},
        error: function(jqXHR){failureCallback(jqXHR)},
      });
    }

    $('#save').click(function(){
      articleCommonAction("/douMi/saveDraft/", draftSuccessAction, failureAction);

    });

    $('#publish').click(function(){
      articleCommonAction("/douMi/doPublish/", publishSuccessAction, failureAction);
    });

    $('.markdown-realtext').bind('input propertychange', function() {
        $('.preview-text').html(marked($(this).val()));

        $('.entry-word-count').html($('.markdown-realtext').val().length + " 个字");

    });

    $('#update').click(function(){
      articleCommonAction("/douMi/updatePub/", updatePubSuccessAction, failureAction);
    });

    $('#undoPublish').click(function(){
      articleCommonAction("/douMi/undoPublish/", undoPubSuccessAction, failureAction);
    });
  });
});

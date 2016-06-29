window.onload = function(){

  var activeElement = $("li.active");
  var currClickElement;

  $(document).on("click",".blogIndex",function(){
    var blogIndex = 0;
    currClickElement = $(this);
    blogIndex = $(this).attr("data-set");

    $.ajax({
      type: "GET",
      url: "/douMi/" + blogIndex,
      data: {

      },
      dataType: "json",
      success: function(data){
        activeElement.removeClass("active");
        currClickElement.children("li:eq(0)").addClass("active");

        activeElement = $("li.active");

        $(".content-preview").html(data.content);
      },
      error: function(jqXHR){
        alert("发生错误：" + jqXHR.status);
      },
    });
  });
}

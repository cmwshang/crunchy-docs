function isMobile() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

//if not a mobile device, then...
if (!isMobile()) {

  //resize menu to .fixedtheme styling on scroll
  $(document).on("scroll",function(){
      if($(document).scrollTop()>10){
          $("nav").addClass("fixedtheme");
          $("#header-container").addClass("fixedtheme");
      } else{
          $("nav").removeClass("fixedtheme");
          $("#header-container").removeClass("fixedtheme");
      }
  });
}

if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
    var elements = document.getElementsByTagName('a');
    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('touchend',function(){});
    }
}

// enable tabs on Support page, append 'active' class

$('#solutions a[href="#high-performance-backup"]').tab('show')
$('#solutions a[href="#high-performance-backup"]').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
$('#solutions a[href="#monitoring"]').tab('show')
$('#solutions a[href="#monitoring"]').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
$('#solutions a[href="#geospatial-data-management"]').tab('show')
$('#solutions a[href="#geospatial-data-management"]').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
$('#solutions a[href="#database-as-a-service"]').tab('show')
$('#solutions a[href="#database-as-a-service"]').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
$('#solutions a[href="#compliance"]').tab('show')
$('#solutions a[href="#compliance"]').click(function() {
  $(this).addClass('active').siblings().removeClass('active');
});
$('#solutions a[href="#high-availability"]').tab('show')
$('#solutions a[href="#high-availability"]').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
});

// enable carousel

$(document).ready(function () {
    $("#arrow-right-containers").bind("click", function (event) {
        event.preventDefault();
        $("#vid-list-containers").stop().animate({
            scrollLeft: "+=336"
        }, 750);
    });
    $("#arrow-left-containers").bind("click", function (event) {
        event.preventDefault();
        $("#vid-list-containers").stop().animate({
            scrollLeft: "-=336"
        }, 750);
    });
    $("#arrow-right-security").bind("click", function (event) {
        event.preventDefault();
        $("#vid-list-security").stop().animate({
            scrollLeft: "+=336"
        }, 750);
    });
    $("#arrow-left-security").bind("click", function (event) {
        event.preventDefault();
        $("#vid-list-security").stop().animate({
            scrollLeft: "-=336"
        }, 750);
    });
});

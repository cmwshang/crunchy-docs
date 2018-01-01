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

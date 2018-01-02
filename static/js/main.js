function isMobile() {
   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream){
    var elements = document.getElementsByTagName('a');
    for(var i = 0; i < elements.length; i++){
        elements[i].addEventListener('touchend',function(){});
    }
}

window.addEventListener("hashchange", function () {
    window.scrollTo(window.scrollX, window.scrollY - 50);
});

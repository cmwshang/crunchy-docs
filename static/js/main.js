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

$('a.disabled').click(function(e)
{
    e.preventDefault();
});

$('.sidebar-nav li:has(ul)').addClass('has-child');

//remove the active class from all items, if there is any
$('.nav>li').removeClass('active');

//finally, add the active class to the current item
$('a[href='+ location.pathname.substring(1) +']').parent().addClass('active');

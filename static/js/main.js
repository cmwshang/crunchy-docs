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

$(document).ready(function() {

  $("h2").each(function() {
    var text = $(this).text()
    var id = $(this).attr("id")
    var navLink = "<li><a href='#" + id + "'>" + text + "</a></li>"
    $("#nav").append(navLink)
  })

})

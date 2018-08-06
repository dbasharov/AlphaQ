/*
$(function(){
    $(window).scroll(function() {
        if($(this).scrollTop() >100) {
            $('nav.nav-header').addClass('stickytop');
            alert('hello')
        }
        else{
            $('nav.nav-header').removeClass('stickytop');
        }
    });


});

*/


/*
var screenHeight;
screenHeight='200px';
alert(screenHeight)

*/

/*

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
    if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
    } else {
        navbar.classList.remove("sticky");
    }
}
*/


var cbpAnimatedHeader = (function() {

    var docElem = document.documentElement,
        header = document.querySelector( '.nav-bar' ),
        didScroll = false,
        changeHeaderOn = 300;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY();
        if ( sy >= changeHeaderOn ) {
            classie.add( header, 'nav-bar-shrink' );
        }
        else {
            classie.remove( header, 'nav-bar-shrink' );
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }

    init();

})();
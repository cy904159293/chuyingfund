$(function(){
    console.log(1)
    //return;
    $('.s-banner .owl-carousel').owlCarousel({
        items: 1,
        //nav: true,
        loop: true,
        //navText: ['&lsaquo;', '&rsaquo;'],
        autoplay: true,
        autoplayHoverPause: true,
        dotsContainer: '.dots-wrap',
        animateOut: 'fadeOut'

    });
});
$(function () {
    // expandable
    $('.expandable').each(function () {
        var $wrap = $(this),
            $win = $wrap.find('.win'),
            $content = $wrap.find('.content'),
            $btn = $wrap.find('.btn-more')
        var height = $content.height(),
            winHeight = $win.height()
        if (height < winHeight) {
            $btn.hide()
        } else {
            $btn.on('click', function () {
                if ($btn.hasClass('expand')) { // 如果是展开则收缩
                    $win.stop(true, false).animate({height: winHeight})
                    $btn.removeClass('expand')
                } else { // 如果是收缩则展开
                    $win.stop(true, false).animate({height: height})
                    $btn.addClass('expand')
                }
            })
        }
    })


    // swipe
    dm.swipe = []
    $('.swipe').each(function () {
        var $dots,
            defaultOption = {
                callback: function (i) {
                    $dots.removeClass('active')
                    $dots.eq(i).addClass('active')
                }
            },
            o = $.extend({}, defaultOption, $(this).data()),
            sw = Swipe(this, o),
            count = sw.getNumSlides()
        var dotsWrap = $(this).find('.dots-wrap').html(new Array(count + 1).join('<u></u>'))
        $dots = dotsWrap.children()
        $dots.eq(0).addClass('active')
    })

    $('.s-header').headroom()


    // iscroll
    /*dm.iscroll = new IScroll('.iscroll-wrap', {
     tap: true
     })
     $(document).on('touchmove', function (e) {
     e.preventDefault()
     })
     $('.iscroll-wrap').on('tap', 'a[href]', function () {
     location.href = $(this).attr('href')
     })*/


})

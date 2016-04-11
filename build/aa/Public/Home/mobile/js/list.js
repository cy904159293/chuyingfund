var filterHelper = function () {
    var $wrap, $header, $content, $form
    var bindEvent = function () {
        $wrap.on('fold', function () {
            $wrap.removeClass('unfold')
            $header.children().removeClass('unfold')
            $content.children().hide()
        })
        $header.on('click', '.filter-title', function (e) {
            e.stopPropagation()
            var $title = $(this)
            if ($title.hasClass('unfold')) {
                $wrap.trigger('fold')
            } else {
                $wrap.addClass('unfold')
                $title.addClass('unfold').siblings().removeClass('unfold')
                $content.find('[data-name=' + $title.data('name') + ']').show().siblings().hide()
            }
        })
        $content.on('click', 'li', function (e) {
            e.stopPropagation()
            var $li = $(this), key = $li.parent().data('name')
            $form.find('[name=' + key + ']').val($li.data('value'))
            $form.submit()
        })
        $wrap.on('click', function () {
            $wrap.trigger('fold')
        })
    }
    var highlight = function () {
        $content.find('.active').each(function () {
            var $li = $(this)
            if ($li.index()) $header.find('[data-name=' + $li.parent().data('name') + ']').find('.filter-name').text($li.text())
        })
    }
    return {
        init: function () {
            $wrap = $('.s-filter')
            $header = $wrap.find('.header')
            $content = $wrap.find('.content-wrap')
            $form = $('#form-filter')
            if (!$form.length) return
            $form[0].reset()
            bindEvent()
            highlight()
        }
    }
}()


var searchHelper = function () {
    var $btnSearch, $viewSearch, $inputSearch
    return {
        init: function () {
            $btnSearch = $('.btn-search')
            $viewSearch = $('.view-search')
            $inputSearch = $viewSearch.find('input[type=search]')
            $btnClear = $viewSearch.find('.btn-clear')

            $btnSearch.on('click', function () {
                $viewSearch.show().find('input[type=search]').focus()
            })
            $('.btn-finish-search').on('click', function () {
                $viewSearch.hide()
            })
            $('.btn-search-back').on('click', function () {
                location.href = $(this).data('href')
            })
            $inputSearch.on('input focus', function () {
                if ($inputSearch.val().length) {
                    $btnClear.show()
                } else {
                    $btnClear.hide()
                }
            }).on('blur', function () {
                $btnClear.hide()
            })
            $btnClear.on('click', function () {
                $inputSearch.val('').focus()
            })

        }
    }
}()

$(function () {
    filterHelper.init()
    searchHelper.init()
    $('.s-filter').headroom()
})

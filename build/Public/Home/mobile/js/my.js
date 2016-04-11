$(function () {

    $('.proj-list').on('click', '.btn-delete', function () {
        if (confirm(('您确定要删除该认投吗?'))) {
            $(this).closest('form').one('success', function () {
                var $item = $(this).closest('.proj-item').fadeOut(function () {
                    $item.remove()
                })
            }).submit()
        }

    }).on('click', '.btn-cancel', function () {
        if (confirm('您确定要撤销该领投吗?')) {
            $(this).closest('form').one('success', function () {
                dmAlert('领投撤销成功。', function(){
                    location.reload()
                })
            }).submit()
        }
    }).on('click', '.btn-ca', function (e) {
        e.preventDefault()
        $(this).closest('form').one('success', function (e,json) {
            location.href=json.data;
        }).submit()
    })

    $(document).on('click', '[data-dismiss=remind]', function () {
        $(this).closest('.remind').remove()
    })

})


// 分页
$(function () {
    var $pageList = $('.page-list')
    if (!$pageList.length) return;
    $pageList.jqPaginator({
        totalPages: $pageList.data('totalPage') || 1,
        visiblePages: $pageList.data('visible') || 10,
        currentPage: $pageList.data('currentPage') || 1,
        page: '<a href="javascript:;" class="btn">{{page}}</a>',
        prev: '<a href="javascript:;" class="btn">上一页</a>',
        next: '<a href="javascript:;" class="btn">下一页</a>',
        onPageChange: function (num, type) {
            if (type === 'change') {
                location.href = $pageList.data('url').replace('0000', num)
            }
        }
    })
})
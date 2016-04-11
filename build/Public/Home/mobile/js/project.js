$(function () {
    // 我要跟投, 我要领投
    $(".btn-invest, .btn-lead").click(function () {
        var $btn = $(this)
        if (serverData.isSharedProj) {
            if (serverData.logon == 0) {
                dm.confirm('您还未登录，请登录后重试，点击确定前往登录页面', function () {
                    location.href = api.ucLogin
                })
            } else {
                $('.modal-go-subsite').modal()
            }
            return
        }
        dm.loading()
        var url = api.invest
        if ($btn.is('.btn-lead')) url = api.lead
        dm.getJSON(url).done(function (json) {
            if ($btn.data('needCode')) {
                $('.modal-invest-code').modal().find('form').one('success', function () {
                    window.location.href = json.data
                }).end().on('shown', function () {
                    $(this).find('input').eq(0).focus()
                })
            } else {
                window.location.href = json.data
            }
        }).always(function () {
            dm.loading('hide')
        })
    })



    // 团队介绍
    $('.popover').each(function () {
        var $this = $(this),
            $arrow = $this.find('.arrow'),
            ml = parseInt($this.find('.popover-content').css('marginLeft'), 10) || 0
        $arrow.css('left', $this.position().left + $this.width() / 2 - $arrow.outerWidth() / 2 - ml)
    }).click(function (e) {
        e.stopPropagation()
        $(this).toggleClass('active').siblings('.active').removeClass('active')
    })
    $(document).on('click', function () {
        $('.popover').removeClass('active')
    })


    // 评论
    var comment = function () {
        var $section, $form
        return {
            init: function () {
                $section = $('.s-comment-form').on('click', function () {
                    $section.hide()
                })
                $form = $section.find('form').on('click', function (e) {
                    e.stopPropagation()
                }).on('success', function () {
                    dm.notice('发表评论成功')
                    location.reload()
                })
                $(document).on('click', '.btn-comment', function (e) {
                    e.stopPropagation()
                    var $li = $(this)
                    if (!$li.is('[data-root-id]')) $li = $li.closest('[data-root-id]')
                    $form.find('[name=root_id]').val($li.data('rootId'))
                    $form.find('[name=comment_id]').val($li.data('commentId'))
                    var username = $li.data('author')
                    if (username) {
                        $form.find('[name=username]').val(username)
                        $form.find('.panel-header').html('回复：' + username)
                    } else {
                        $form.find('.panel-header').html('写评论')
                    }
                    $section.show().find('textarea').focus()
                })
            }
        }
    }()
    comment.init()
    $('.s-fixed-btn-comment').headroom()

    // 详情页加载评论
    $('.loading-comment').inview(function () {
        $('.comment-list').load($(this).data('ajax'))
    })

    // 收藏
    $('.btn-star').on('click', function () {
        var $btn = $(this)
        dm.getJSON(api.followproject).done(function (json) {
            if ($btn.hasClass('status-on')) {
                $btn.removeClass('status-on').addClass('status-off')
                dm.notice('取消收藏成功')
            } else {
                $btn.removeClass('status-off').addClass('status-on')
                dm.notice('收藏成功')
            }
        })
    })

    //项目详情折叠效果
    $('.panel-header').not('[nofold]').on('click', function () {
        var $h3 = $(this).toggleClass('unfold')
        $h3.next().slideToggle()
    })

    // 预约投资/开投提醒
    $(function () {
        $('#btn-remind').on('click', function (e) {
            var uid = $(this).data('uid')
            if (!uid) {
                e.preventDefault()
                e.stopPropagation()
                dm.alert('您还未登录，请登录后重试，点击确定前往登录页面', function () {
                    location.href = api.ucLogin
                })
            }
        })

        $('#form-remind').on('success', function (e, json) {
            dm.alert(json.data)
        }).on('always', function () {
            var $form = $(this)
            $form.closest('.modal').modal('hide')
        })

        var $time = $('#start-time')
        if ($time.length && $time.data('startTime')) {
            $.getJSON(api.sysdate).then(function (json) {
                var sysDate = parseInt(json.data, 10),
                    startTime = parseInt($time.data('startTime'), 10),
                    gap = startTime - sysDate

                if (gap && gap > 0) {
                    var $day = $('#cd-day'),
                        $hour = $('#cd-hour'),
                        $min = $('#cd-min'),
                        $sec = $('#cd-sec'),
                        timer = 0,
                        tick = function () {
                            if (gap <= 0) {
                                location.reload()
                                clearTimeout(timer)
                            }
                            $day.html(Math.floor(gap / 86400))
                            $hour.html(Math.floor((gap % 86400) / 3600))
                            $min.html(Math.floor(gap % 3600 / 60))
                            $sec.html(gap % 60)
                            gap--
                            timer = setTimeout(tick, 1000)
                        }
                    tick()
                }


            })
        }
    })


})
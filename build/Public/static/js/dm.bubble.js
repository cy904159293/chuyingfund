$(function ($) {
    $.fn.bubble = function (msg, direction, duration) {
        var $bubble, caretDirection, ref;
        if (direction == null) {
            direction = 'down';
        }
        msg = (ref = this.data('bubbleMsg')) != null ? ref : msg;
        direction = this.data('bubbleDir') || direction;
        duration = this.data('bubbleDuration') || duration || Math.max(msg.length, 8) * 500;
        $bubble = this.siblings('.bubble');
        caretDirection = {
            'up': 'down',
            'down': 'up',
            'right': 'left',
            'left': 'right'
        };
        if ($bubble.length === 0) {
            $bubble = $('<div class="bubble bubble-' + direction + ' caret-' + caretDirection[direction] + '"></div>').insertAfter(this);
        }
        $bubble.html(msg);
        if (direction === 'right') {
            $bubble.css({
                'left': this.data('bubbleLeft') != null ? this.data('bubbleLeft') : this.outerWidth() + 8,
                'top': this.data('bubbleTop') != null ? this.data('bubbleTop') : (this.outerHeight() - $bubble.outerHeight()) / 2
            });
        } else if (direction === 'down') {
            $bubble.css({
                'left': this.data('bubbleLeft') != null ? this.data('bubbleLeft') : this.outerWidth() * 0.5,
                'top': this.data('bubbleTop') != null ? this.data('bubbleTop') : this.outerHeight() + 8
            });
        } else if (direction === 'up') {
            $bubble.css({
                'left': this.data('bubbleLeft') != null ? this.data('bubbleLeft') : this.outerWidth() * 0.5,
                'bottom': this.data('bubbleBottom') != null ? this.data('bubbleBottom') : this.outerHeight() + 8
            });
        }
        clearTimeout($bubble.data('bubbleTimer'));
        $bubble.data('bubbleTimer', setTimeout(function () {
            return $bubble.removeBubble();
        }, duration));
        return this;
    };
    return $.fn.removeBubble = function () {
        if ($(this).hasClass('bubble')) {
            this.remove();
        } else {
            this.siblings('.bubble').remove();
        }
        return this;
    };
})

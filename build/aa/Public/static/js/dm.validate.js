(function ($) {

    /*
     元素中存储的变量:
     input: ruleList(规则列表对象), readyValidate(已验证过的字段, 处于"热"状态, 随打字响应)
     form: bubbled(已有弹出)
     */
    var defaultOption, initForm, initInput, matchRule, msgInfo, patternInfo, validateForm, validateInput;
    patternInfo = {
        required: /\S+/,
        email: /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        url: /^\s*((https?|ftp):\/\/)?(([^:\n\r]+):([^@\n\r]+)@)?((www\.)?([^\/\n\r]+))\/?([^?\n\r]+)?\??([^#\n\r]*)?#?([^\n\r]*)$/,
        tel: /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
        number: /^\d[\d\.]*$/
    };
    msgInfo = {
        required: '请填写此字段。',
        email: 'email 不合法',
        url: 'url 不合法',
        tel: '电话号码不合法',
        number: '不是数字',
        maxlength: '超出字数限制',
        min: '必须大于@@',
        max: '必须小于@@',
        pattern: '不合法'
    };
    matchRule = function (str, rule, pattern) {
        var result = true
        if (pattern == null) pattern = true

        switch (rule) {
            case 'required':
                if (pattern) {
                    result = patternInfo.required.test(str);
                }
                break;
            case 'email':
                if (pattern) {
                    result = patternInfo.email.test(str);
                }
                break;
            case 'url':
                if (pattern) {
                    result = patternInfo.url.test(str);
                }
                break;
            case 'tel':
                if (pattern) {
                    result = patternInfo.tel.test(str);
                }
                break;
            case 'number':
                if (pattern) {
                    result = patternInfo.number.test(str);
                }
                break;
            case 'maxlength':
                return $.trim(str).length <= pattern;
            case 'min':
                if ($.isNumeric(pattern)) {
                    return parseFloat(str) >= parseFloat(pattern);
                } else {
                    return new Date(str) >= new Date(pattern);
                }
                break;
            case 'max':
                if ($.isNumeric(pattern)) {
                    return parseFloat(str) <= parseFloat(pattern);
                } else {
                    return new Date(str) <= new Date(pattern);
                }
                break;
            case 'pattern':
                return eval(pattern).test(str);
            default:
                break;
        }
        return result;
    };
    defaultOption = {
        batch: false,
        typing: false,
        blur: false
    };
    $.fn.buildRuleList = function () {
        return this.each(function (idx, elm) {
            var attr, attrList, attrValue
            var ruleList = {},
                $elm = $(elm),
                type = $elm.attr('type')
            ruleList['required'] = $elm.attr('required')
            var typeList = ['email', 'url', 'tel', 'number']
            for (var i = 0, len = typeList.length; i < len; i++) {
                var _t = typeList[i];
                if (type === _t) {
                    ruleList[_t] = true;
                    break;
                }
            }
            attrList = ['maxlength', 'max', 'min', 'pattern'];
            for (var j = 0, len1 = attrList.length; j < len1; j++) {
                attr = attrList[j];
                attrValue = $elm.attr(attr);
                if (attrValue != null && attrValue !== '') {
                    ruleList[attr] = attrValue;
                }
            }
            var _ajax = $elm.data('ajax')
            if (_ajax) ruleList['ajax'] = _ajax
            $elm.data('ruleList', ruleList);
        });
    };
    initForm = function ($form) {
        $form.attr('novalidate', 'novalidate').find('input, textarea, select').validate('init');
    };
    initInput = function ($input) {
        $input.buildRuleList().off('.validate').on('input.validate propertychange.validate', function () {
            return $(this).validate({
                typing: true
            })
        })
        if (!$input.data('blurSilence')) {
            $input.on('blur.validate', function () {
                $(this).validate({
                    blur: true
                })
            })
        }
    };
    validateForm = function ($form, option, success, fail) {
        var result = true
        $form.data('bubbled', 0)
        $form.find('.bubble').removeBubble()
        $form.find('input, textarea, select').validate({
            batch: true
        }, $.noop, function () {
            result = false
        })
        if (result) success()
        else fail()
    }
    validateInput = function ($input, option, success, fail) {
        if (option.typing && !$input.data('readyValidate')) return;
        var value = $.trim($input.val()),
            ruleList = $input.data('ruleList'),
            result = true,
            msg = ''
        if (!ruleList) ruleList = $input.buildRuleList().data('ruleList')

        $input.removeBubble()

        if (!(value.length === 0 && !ruleList['required'])) {
            for (var ruleName in ruleList) {
                if (ruleList.hasOwnProperty(ruleName)) {
                    var rule = ruleList[ruleName]
                    if (!matchRule(value, ruleName, rule)) {
                        result = false
                        msg = $input.data(ruleName + 'Msg') || msgInfo[ruleName]
                        msg = msg.replace(/@@/g, rule)
                        break
                    }
                }
            }
        }

        // ajax
        if (ruleList.ajax && $input.data('lastValidateValue') !== $input.val()) {
            var doAjax = function () {
                $input.data('ajaxReady', false)
                $input.data('ajaxQueue', false)
                $input.data('lastValidateValue', $input.val())
                var _data = {}
                _data[$input.attr('name')] = $input.val()
                dm.getJSON(ruleList.ajax, _data, {alert: 'noop'}).fail(function (json) {
                    $input.addClass('error').bubble(json.info)
                }).always(function () {
                    $input.data('ajaxReady', true)
                    if ($input.data('ajaxQueue')) {
                        doAjax()
                    }
                })
            }
            var ajaxReady = $input.data('ajaxReady')
            if (ajaxReady == null || ajaxReady) {
                doAjax()
            } else {
                $input.data('ajaxQueue', true)
            }
        }

        if (result) {
            $input.removeClass('error')
            success()
        } else {
            var $form = $input.closest('form')
            if (option.typing) {
                $input.addClass('error')
            } else {
                $input.addClass('error')
                if (!option.batch || !$form.data('bubbled')) {
                    $form.data('bubbled', 1)
                    $input.bubble(msg, $input.data('bubbleDir') || 'right')
                    if (!option.blur) {
                        $input.focus()
                    }
                }
            }
            fail()
        }
        return $input.data('readyValidate', true)
    };
    return $.fn.validate = function (option, success, fail) {
        var method
        if (success == null) success = $.noop
        if (fail == null) fail = $.noop
        if (typeof option === 'string') {
            method = option;
            option = success;
            if (method === 'init') {
                return this.each(function () {
                    var $this;
                    $this = $(this);
                    if ($this.is('form')) {
                        return initForm($this);
                    } else {
                        return initInput($this);
                    }
                });
            }
        } else {
            option = $.extend({}, defaultOption, option);
            return this.each(function () {
                var $this;
                $this = $(this)
                if ($this.is('form')) {
                    validateForm($this, option, success, fail);
                } else {
                    validateInput($this, option, success, fail);
                }
            });
        }
    };
})(jQuery);


$(function () {
    $('form').not('[novalidate]').validate('init');
});

//word-count
$(function () {
    var buildDOM = function ($input, maxlength) {
        var $countWrap = $('<div class="word-count"><var>' + $input.val().length + '</var>/' + maxlength + '</div>').insertAfter($input);
        return $countWrap.find('var')
    };
    $.fn.wordCount = function () {
        return this.each(function () {
            var $input = $(this),
                maxlength = $input.attr('maxlength')
            if (!maxlength) {
                return
            }
            var $var = buildDOM($input, maxlength)
            if ($input.is('input')) $input.css('padding-right', (('' + maxlength).length + 1.8) + 'em')
            $input.on('input.count propertychange.count', function () {
                $var.html($input.val().length)
            })
        })
    }

    $('input[maxlength], textarea[maxlength]').not('[nocount]').wordCount()
})

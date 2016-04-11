var sso = function (redirect) {
    $.getJSON(api.ssoUcenter).then(function (json) {
        if (json.status == 0) {
            $.getJSON(api.ssoLocal, {
                ticket: json.ticket
            }).then(function (json) {
                if (json.status == 0) {
                    location.reload()
                } else if (redirect) {
                    location.href = api.ucLogin
                }
            })
        } else if (redirect) {
            location.href = api.ucLogin
        }
    })
}

$('.btn-login').on('click', function () {
    sso(true)
})

$('.btn-register').on('click', function () {
    location.href = api.ucRegister
})

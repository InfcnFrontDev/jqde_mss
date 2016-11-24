/**
 * login
 */

var vmLogin = new Vue({
    el: '#vmLogin',
    data: {
        userId: "",
        password: "",
        error: ''
    },
    methods: {
        login: function () {
            $.ajax({
                type: 'post',
                url: Config.apiPath + '/qdeMods/login',
                data: {
                    userId: vmLogin.userId,
                    password: vmLogin.password
                },
                success: function (result) {
                    if (result.indexOf('模块导航') > -1) {
                        vmLogin.error = '';
                        location = './';
                    } else {
                        vmLogin.error = '用户名或密码不正确。'
                    }
                }
            });
        }
    }
});

//you don't need this, just used for changing background
jQuery(function ($) {
    $('#btn-login-dark').on('click', function (e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-light').on('click', function (e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-blur').on('click', function (e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');

        e.preventDefault();
    });

});
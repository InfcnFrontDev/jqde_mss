/**
 * login
 */

jQuery(function($) {

    $('#btnLogin').click(function () {
        location = './';
    });

});

//you don't need this, just used for changing background
jQuery(function($) {
    $('#btn-login-dark').on('click', function(e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-light').on('click', function(e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
    });
    $('#btn-login-blur').on('click', function(e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');

        e.preventDefault();
    });

});
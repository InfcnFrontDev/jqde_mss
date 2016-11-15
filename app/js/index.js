/*
 * LOAD SCRIPTS
 * Usage:
 * Define function = myPrettyCode ()...
 * loadScript("js/my_lovely_script.js", myPrettyCode);
 */

var jsArray = "";

function loadScript(scriptName, callback) {

    if (jsArray.indexOf("[" + scriptName + "]") == -1) {

        //List of files added in the form "[filename1],[filename2],etc"
        jsArray += "[" + scriptName + "]";

        // adding the script tag to the head as suggested before
        var body = document.getElementsByTagName('body')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptName;

        // then bind the event to the callback function
        // there are several events for cross browser compatibility
        //script.onreadystatechange = callback;
        script.onload = callback;

        // fire the loading
        body.appendChild(script);

    } else if (callback) { // changed else to else if(callback)
        //console.log("JS file already added!");
        //execute function
        callback();
    }

}

/* ~ END: LOAD SCRIPTS */

/*
 * APP AJAX REQUEST SETUP
 * Description: Executes and fetches all ajax requests also
 * updates naivgation elements to active
 */

var modulePath = '';

// DO on hash change
$(window).on('hashchange', function () {
    checkURL();
});

// CHECK TO SEE IF URL EXISTS
function checkURL() {

    //get the url by removing the hash
    url = location.hash.replace(/^#/, '');

    container = $('#content');
    // Do this if url exists (for page refresh, etc...)

    if (url) {
        // remove all active class
        $('.nav li.active').removeClass("active");
        $('.nav li.open').removeClass("open");

        // match the url and add the active class
        $('.nav li:has(a[href="' + url + '"])').addClass("active");
        $('.nav li:has(a[href="' + url + '"])').parents('li').addClass("active").addClass("open");
        $('.nav li:has(a[href="' + url + '"])').parents('li').siblings().find('.submenu').slideUp('fast');

        // parse url to jquery
        modulePath = 'modules/' + url;
        loadURL(modulePath + '/index.html', container);
    } else {

        // grab the first URL from nav
        $this = $('.nav > li:first-child > a[href!="#"]');

        //update hash
        window.location.hash = $this.attr('href');

    }
}

// LOAD AJAX PAGES

function loadURL(url, container) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'html',
        cache: true, // (warning: this will cause a timestamp and will call the request twice)
        beforeSend: function () {
            container.html('<h1><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
        },
        success: function (data) {
            container.css({
                opacity: '0.0'
            })
                .html(data)
                .delay(100)
                .animate({
                    opacity: '1.0'
                }, 300);
            drawBreadCrumb();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            container.html(
                '<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>'
            );
            drawBreadCrumb();
        },
        async: false
    });
}

// UPDATE BREADCRUMB
function drawBreadCrumb() {

    $("#breadcrumbs ul.breadcrumb")
        .empty();
    $("#breadcrumbs ul.breadcrumb")
        .append($('<li><i class="ace-icon fa fa-home home-icon"></i> 首页 </li>'));
    $('.nav li.active > a')
        .each(function () {
            $("#breadcrumbs ul.breadcrumb")
                .append($("<li>111</li>")
                    .html($.trim($(this)
                        .clone()
                        .children(".badge")
                        .remove()
                        .end()
                        .text())));
        });

    //console.log("breadcrumb created");
}

/* ~ END: APP AJAX REQUEST SETUP */


Vue.config.debug = Config.debug;
Vue.config.devtools = Config.devtools;
Vue.config.silent = Config.silent;


var vm = new Vue({
    el: '#app',
    data: {
        userId: 'root',
        userName: 'INFCN',
        menus: [],
        iconCls: ['fa-desktop', 'fa-list', 'fa-pencil-square-o', 'fa-list-alt', 'fa-calendar', 'fa-picture-o', 'fa-tag']
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeProfiles.getCurrentProfiles().then(function (result) {
                if (result.success) {
                    $this.render(result);
                }
            });
        },
        render: function (result) {
            var menus = [], menuMap = {};
            for (var i in result.services) {
                var service = result.services[i];
                if (!menuMap[service.folder]) {
                    var moduleMenu = {
                        name: service.folder,
                        submenus: []
                    };
                    menus.push(moduleMenu);
                    menuMap[service.folder] = moduleMenu;
                }

                var serviceMenu = {
                    name: service.serviceName,
                    url: service.serviceId
                };
                menuMap[service.folder].submenus.push(serviceMenu);
            }

            this.menus = menus;
            this.userId = result.userId;
            this.userName = result.userName;


            var $this = this;
            setTimeout(function () {
                $this.init();
            }, 200);
        },
        init: function () {

            // fire this on page load if nav exists
            if ($('.nav').length) {
                checkURL();
            }

            $('.nav a[href!="#"]').click(function (e) {
                e.preventDefault();
                $this = $(this);

                window.location.hash = $this.attr('href');
            });

            // fire links with targets on different window
            $('.nav a[target="_blank"]').click(function (e) {
                e.preventDefault();
                $this = $(this);

                window.open($this.attr('href'));
            });

            // all links with hash tags are ignored
            $('.nav a[href="#"]').click(function (e) {
                e.preventDefault();
                $this = $(this);
                if ($this.parents('.menu-min').length == 0)
                    $this.parent().find('.submenu').slideToggle();
            });
        }
    }
});
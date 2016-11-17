/**
 * JqdeMods ajax
 */

var $ajax = function (url, ajaxParams, success, error) {

    // Vue.http.get(url).then(function (response) {
    //     console.log("vue.http");
    //     console.log(response);
    // });


    var data = null;
    if (ajaxParams)
        data = {'ajaxParams': JSON.stringify(ajaxParams)};


    $.ajax({
        type: 'post',
        url: url,
        data: data,
        cache: false,
        dataType: 'json',
        success: function (data, textStatus, jqXHR) {
            success && success(data, textStatus, jqXHR);

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            error && error(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}

var newPromise = function (action, verb, ajaxParams) {
    var apiPath = Config.apiPath.replace(/\/?$/, '');
    var url = apiPath + '/qdeMods/ajax?action=' + action + '&verb=' + verb;
    return new Promise(function (resolve, reject) {
        $ajax(url, ajaxParams, function (result) {
            resolve(result)
        }, function (error) {
            reject(error)
        });
    })
}

var JqdeMods = {
    ajax: function (action, verb, ajaxParams) {
        return newPromise(action, verb, ajaxParams);
    }
};
var JqdeProfiles = {
    getCurrentProfiles: function () {
        return newPromise('qdeProfiles', 'getCurrentProfiles');
    },
    getFreeView: function () {
        return newPromise('qdeAdmin', 'getAllPrivileges');
    }
};
var JqdeProfiles = {
    getCurrentProfiles: function () {
        return newPromise('qdeProfiles', 'getCurrentProfiles');
    },
    getFreeView: function () {
        return newPromise('qdeAdmin', 'getAllPrivileges');
    }
};
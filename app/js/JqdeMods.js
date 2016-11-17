/**
 * JqdeMods ajax
 */

var $ajax = function (url, ajaxParams, success, error) {

    // Vue.http.get(url).then(function (response) {
    //     console.log("vue.http");
    //     console.log(response);
    // });

    $.ajax({
        type: 'post',
        url: url,
        data: {'ajaxParams': JSON.stringify(ajaxParams)},
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
        $ajax(url,ajaxParams, function (result) {
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
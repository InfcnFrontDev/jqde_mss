var $ajax = function (url, success, error) {

    // Vue.http.get(url).then(function (response) {
    //     console.log("vue.http");
    //     console.log(response);
    // });

    $.ajax({
        url: url,
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

var newPromise = function (action, verb) {
    var apiPath = Config.apiPath.replace(/\/?$/, '');
    var url = apiPath + '/qdeMods/ajax?action=' + action + '&verb=' + verb;
    return new Promise(function (resolve, reject) {
        $ajax(url, function (result) {
            resolve(result)
        }, function (error) {
            reject(error)
        });
    })
}

var JqdeMods = {
    ajax: function (action, verb) {
        return newPromise(action, verb);
    }
};
var JqdeProfiles = {
    getCurrentProfiles: function () {
        return newPromise('qdeProfiles', 'getCurrentProfiles');
    }
};
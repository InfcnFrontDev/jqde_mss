
var vmApp = new Vue({
    el: '#vmApp',
    data: {
        menus: []
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeMods.ajax('modulesMgr', 'getAllMoudles').then(function (result) {
                if (result.success) {
                    $this.render(result);
                }
            }, function (error) {
                console.log(error);
            });
        },
        render: function (result) {
            var menus = []
            for (var i in result.rows) {
                    var moduleMenu = {
                        serviceName: result.rows[i].serviceName,
                        serviceId: result.rows[i].serviceId,
                        folder:result.rows[i].folder
                    };
                    menus.push(moduleMenu);

            }
            this.menus = menus;
        }

    }
})
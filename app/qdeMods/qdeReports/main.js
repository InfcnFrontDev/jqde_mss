
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
            JqdeMods.ajax('qdeReports', 'getReports').then(function (result) {
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
                    name: result.rows[i].key,
                    value: result.rows[i].value
                };
                menus.push(moduleMenu);
            }
            this.menus = menus;
        }
    }
})

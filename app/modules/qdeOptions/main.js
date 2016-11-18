
var vmApp = new Vue({
    el: '#vmApp',
    data: {
        groups: []
    },
    mounted: function () {
        this.fetchData();
    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeMods.ajax('qdeOptions', 'getAllOptions').then(function (result) {
                    $this.render(result);
            }, function (error) {
                console.log(error);
            });
        },
        render: function (result) {
            result = {
                total: 4,
                success: true,
                rows: [
                    {
                        editor: "text",
                        name: "API接口连接",
                        category: "系统设置",
                        value: "192.168.10.9",
                        key: "api_url"
                    },
                    {
                        editor: {
                            type: "numberbox"
                        },
                        name: "API接口端口号",
                        category: "系统设置",
                        value: "9095",
                        key: "api_port"
                    },
                    {
                        editor: "text",
                        name: "sql接口",
                        category: "系统设置",
                        value: "192.168.10.9:9200",
                        key: "search_host"
                    },
                    {
                        editor: "text",
                        name: "用户名",
                        category: "注册信息",
                        value: "图书馆",
                        key: "license.user"
                    }
                ]
            };

            var groups = [], groupMap = {};
            for (var i in result.rows) {
                var row = result.rows[i];
                if (!groupMap[row.category]) {
                    var gourp = {
                        category: row.category,
                        rows: []
                    };
                    groups.push(gourp);
                    groupMap[row.category] = gourp.rows;
                }
                groupMap[row.category].push(row);
            }
            console.log(groups);
            this.groups = groups;
        },
        refresh:function(){
            this.fetchData();
        }
    }
})
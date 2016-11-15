var vmApp = new Vue({
    el: '#vmApp',
    data: {
        home: [],
        checkedall: false,
        checked: false,

    },
    mounted: function () {
        this.fetchData();

        $("#bootbox-confirm").on(ace.click_event, function () {
            $.get(modulePath + '/jiben.html', function (html) {
                bootbox.dialog({
                    message: html,
                    title: "<span class='bigger-110'>添加管理员</span>",
                    buttons: {
                        cancel: {
                            label: '<i class="fa fa-times"></i> 取消'
                        },
                        confirm: {
                            label: '<i class="fa fa-check"></i> 保存'
                        }

                    }

                })
            })
        });

    },
    methods: {
        fetchData: function () {
            var $this = this;
            JqdeMods.ajax('qdeAdmin', 'getAllAdmins').then(function (result) {
                if (result.success) {
                    $this.render(result);
                }
            }, function (error) {

            });
        },
        checked: function () {
            if (this.checkedall == false) {
                this.checkedall = true;
                this.checked = true;
            } else {

            }


        },
        render: function (result) {

            var home = []
            for (var i in result.rows) {
                home.push(result.rows[i])
            }
            this.home = home;
        }


    }
})
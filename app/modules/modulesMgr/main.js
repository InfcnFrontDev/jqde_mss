var vmApp = new Vue({
    el: '#vmApp',
    data: {
        menus: [],
        ajaxparams:{}
    },
    mounted: function () {
        this.fetchData();

        var active_class = 'active';
        $('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
            var th_checked = this.checked;//checkbox inside "TH" table header

            $(this).closest('table').find('tbody > tr').each(function () {
                var row = this;
                if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
                else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
            });
        });
        //select/deselect a row when the checkbox is checked/unchecked
        $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
            var $row = $(this).closest('tr');
            if ($row.is('.detail-row ')) return;
            if (this.checked) $row.addClass(active_class);
            else $row.removeClass(active_class);
        });
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
        ajaxParams:function(){
            var $this = this;
            JqdeMods.ajax('modulesMgr', 'updateModule',$this.ajaxparams).then(function (result) {
                /*console.log(result.success)*/
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
                    folder: result.rows[i].folder,
                    sortNo:result.rows[i].sortNo
                };
                menus.push(moduleMenu);
            }
            this.menus = menus;
        },
        tankuang: function (item) {
            var $this=this;
            $.get('modules/modulesMgr/panel.html',function(html){

                bootbox.dialog({
                    title: "<h4 class='modal-title'>修改模块</h4>",
                    message: html,
                    buttons: {
                        "保存": {
                            "label": "<i class='ace-icon fa fa-floppy-o'></i> 保存",
                            "className": "btn-sm",
                            "callback": function () {
                                //Example.show("great success");
                                var text = document.getElementsByClassName('form-control');
                                for (var i in $this.menus) {
                                    if ($this.menus[i].serviceName == panelApp.item.serviceName) {
                                        $this.menus[i].serviceName = text[1].value
                                        $this.menus[i].serviceId = text[0].value
                                        $this.menus[i].folder = text[2].value
                                        $this.menus[i].sortNo = text[3].value
                                    }
                                }
                                $this.ajaxparams={
                                    "serviceId":text[0].value,
                                    "serviceName":text[1].value,
                                    "folder":text[2].value,
                                    "sortNo":text[3].value
                                }

                                $this.ajaxParams();

                                $.gritter.add({
                                    text: '模块信息保存成功！',
                                    class_name: 'gritter-info',
                                    sticky: false,
                                    time: 1500,
                                    speed:1000,
                                    image: 'assets/images/avatars/avatar.png',
                                })
                            }
                        },
                        "取消": {
                            "label": "<i class='ace-icon glyphicon glyphicon-remove'></i> 取消",
                            "className": "btn-sm btn-danger",
                            "callback": function () {
                                //Example.show("uh oh, look out!");
                            }
                        }
                    }

                });
                panelApp.item=item;
            });

        },
        reload:function(){
            this.fetchData();
        }

    }
})
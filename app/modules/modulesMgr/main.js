
var vmApp = new Vue({
    el: '#vmApp',
    data: {
        menus: []

    },
    mounted: function () {
        this.fetchData();
        var active_class = 'active';
        $('#dynamic-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
            var th_checked = this.checked;//checkbox inside "TH" table header

            $(this).closest('table').find('tbody > tr').each(function(){
                var row = this;
                if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
                else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
            });
        });
        //select/deselect a row when the checkbox is checked/unchecked
        $('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
            var $row = $(this).closest('tr');
            if($row.is('.detail-row ')) return;
            if(this.checked) $row.addClass(active_class);
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
        },
        tankuang:function(item){

            bootbox.dialog({
                title: "<h4 class='modal-title'>修改模块</h4>",
                message:"<form class=\"form-horizontal\" role=\"form\" id=\"vmApp\"><div class=\"form-group\"> <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">   模块ID  </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\""+item.serviceId+"\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">  模块名称   </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\""+item.serviceName+"\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">    菜单位置 </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\""+item.folder+"\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">  顺序号(三位)   </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\"\"/> </div> </div> " +
                "</form>",


                buttons:
                {
                    "保存" :
                    {
                        "label" : "<i class='ace-icon fa fa-floppy-o'></i> 保存",
                        "className" : "btn-sm",
                        "callback": function() {
                            //Example.show("great success");
                        }
                    },
                    "取消" :
                    {
                        "label" : "<i class='ace-icon glyphicon glyphicon-remove'></i> 取消",
                        "className" : "btn-sm btn-danger",
                        "callback": function() {
                            //Example.show("uh oh, look out!");
                        }
                    }
                }
            });
        }

    }
})
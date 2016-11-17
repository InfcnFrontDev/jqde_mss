var vmApp = new Vue({
    el: '#vmApp',
    data: {
        menus: []

    },
    mounted: function () {
        this.table = $('#dynamic-table').DataTable({
            "dom": "<'row'<'col-sm-8'f><'col-sm-4 dataTables_buttons'>><'row'<tr>><'row'<'col-sm-5'li><'col-sm-7'p>>",
            "bAutoWidth": false,
            "lengthMenu": [10, 25, 50, 75, 100],
            "pagingType": "full_numbers",
            "language": {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "，显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索：",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            },


            "columns": [
                {
                    "title": '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>',
                    "data": null,
                    "sortable": false,
                    "className": 'text-center',
                    "render": function (data, type, row, meta) {
                        return '<label class="pos-rel"><input type="checkbox" class="ace" /><span class="lbl"></span></label>';
                    }
                },
                {"title": "模块名称", "data": "serviceName", "sortable": true},
                {"title": "模块ID", "data": "serviceId"},
                {"title": "模块分组", "data": "folder"},
                {"title": "排序号", "data": "sortNo"},
                {"title": "主机", "data": "host"},
                {
                    "title": '',
                    "data": null,
                    "sortable": false,
                    "className": 'text-center',
                    "render": function (data, type, row, meta) {
                        return '<button class="btn btn-xs btn-info"><i class="ace-icon fa fa-pencil bigger-120"></i></button>';
                    }
                }
            ],
            "ajax": {
                url: Config.apiPath + "/qdeMods/ajax?action=modulesMgr&verb=getAllMoudles",
                dataSrc: 'rows'
            },
            "order": [1, "asc"],
            select: {
                style: 'multi'
            }
        });
        $('.dataTables_buttons').append($('.buttons'));



        $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

        new $.fn.dataTable.Buttons( this.table, {
            buttons: [
                {
                    "extend": "colvis",
                    "text": "<i class='fa fa-search bigger-110 blue'></i> <span class='hidden'>Show/hide columns</span>",
                    "className": "btn btn-white btn-primary btn-bold",
                    columns: ':not(:first):not(:last)'
                },
                {
                    "extend": "copy",
                    "text": "<i class='fa fa-copy bigger-110 pink'></i> <span class='hidden'>Copy to clipboard</span>",
                    "className": "btn btn-white btn-primary btn-bold"
                },
                {
                    "extend": "csv",
                    "text": "<i class='fa fa-database bigger-110 orange'></i> <span class='hidden'>Export to CSV</span>",
                    "className": "btn btn-white btn-primary btn-bold"
                },
                {
                    "extend": "excel",
                    "text": "<i class='fa fa-file-excel-o bigger-110 green'></i> <span class='hidden'>Export to Excel</span>",
                    "className": "btn btn-white btn-primary btn-bold"
                },
                {
                    "extend": "pdf",
                    "text": "<i class='fa fa-file-pdf-o bigger-110 red'></i> <span class='hidden'>Export to PDF</span>",
                    "className": "btn btn-white btn-primary btn-bold"
                },
                {
                    "extend": "print",
                    "text": "<i class='fa fa-print bigger-110 grey'></i> <span class='hidden'>Print</span>",
                    "className": "btn btn-white btn-primary btn-bold",
                    autoPrint: false,
                    message: 'This print was produced using the Print button for DataTables'
                }
            ]
        } );
        this.table.buttons().container().appendTo( $('.tableTools-container') );

        //select/deselect a row when the checkbox is checked/unchecked
        $('#dynamic-table').on('click', 'td input[type=checkbox]' , function(){
            var row = $(this).closest('tr').get(0);
            if(this.checked) myTable.row(row).deselect();
            else myTable.row(row).select();
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
                    folder: result.rows[i].folder
                };
                menus.push(moduleMenu);

            }
            this.menus = menus;

            setTimeout(function () {

            }, 500)
        },
        tankuang: function (item) {

            bootbox.dialog({
                title: "<h4 class='modal-title'>修改模块</h4>",
                message: "<form class=\"form-horizontal\" role=\"form\" id=\"vmApp\"><div class=\"form-group\"> <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">   模块ID  </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\"" + item.serviceId + "\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">  模块名称   </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\"" + item.serviceName + "\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">    菜单位置 </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\"" + item.folder + "\"/> </div> </div>" +
                "<div class=\"form-group\" > <label class=\"col-sm-3 control-label no-padding-right\" for=\"form-field-1\">  顺序号(三位)   </label><div class=\"col-sm-9\"> <input type=\"text\" id=\"form-field-1-1\" placeholder=\"Username\" class=\"form-control\" value=\"\"/> </div> </div> " +
                "</form>",


                buttons: {
                    "保存": {
                        "label": "<i class='ace-icon fa fa-floppy-o'></i> 保存",
                        "className": "btn-sm",
                        "callback": function () {
                            //Example.show("great success");
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
        }

    }
})
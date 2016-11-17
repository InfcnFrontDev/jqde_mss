var vmApp = new Vue({
    el: '#vmApp',
    data: {
        home: [],
        name:'',
        phone:'12121212',
        password:'',
        department:'',
        user:'',
        email:'',
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
        render: function (result) {

            var home = []
            for (var i in result.rows) {
                home.push(result.rows[i])
            }
            this.home = home;
        },
        fetchData: function (){
            var $this = this;
            JqdeMods.ajax('qdeAdmin', 'getAllAdmins').then(function (result) {
                if (result.success) {
                    $this.render(result);
                }
            }, function (error) {

            });
        },
        tankuang:function(){
            var that=this;
            $.get('modules/qdeAdmin/information.html', function (html) {
                bootbox.dialog({
                    message: html,
                    title: "<span class='bigger-110'>添加管理员</span>",
                    buttons: {
                        cancel: {
                            label: '<i class="fa fa-times"></i> 取消',
                            "callback": function () {
                                //Example.show("great success");
                            }
                        },
                        confirm: {
                            label: '<i class="fa fa-check"></i> 保存',
                            "callback": function () {
                                //Example.show("great success");
                                that.addinformation()
                            }
                        }
                    }

                })
            })
        },
        addinformation:function(){
            var $this=this
            if(vmadd.checked){
                var arr={
                    userId:vmadd.userid,
                    name:vmadd.name,
                    picked:vmadd.picked,
                    phone:vmadd.phone,
                    email:vmadd.email,
                    enabled:true
                };
            }else{
                var arr={
                    userId:vmadd.userid,
                    name:vmadd.name,
                    picked:vmadd.picked,
                    phone:vmadd.phone,
                    email:vmadd.email,
                    enabled:false
                };
            }
            $this.home.push(arr)
        },
        dbedit:function(){
            this.tankuang()
        }
    }
})
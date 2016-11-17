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
        checkedall: false,
        checked: false,

    },
    mounted: function () {
        this.fetchData();

        var $this=this;
        $("#bootbox-confirm").on(ace.click_event, function() {
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
                            $this.addinformation()

                            }
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
        addinformation:function(){
            var $this=this
           /* if(vmadd.checked){
                var $tr="<tr>\
                <td class=\"center\">\
                <label class=\"pos-rel\">\
                <input type=\"checkbox\" class=\"ace checkadmin\" v-model=\"checked\"/>\
                <span class=\"lbl\"></span>\
                </label>\
                </td>\
                <td >\
                <a href=\"#\">"+vmadd.userid+"</a>\
            </td>\
            <td >"+vmadd.name+"</td>\
            <td class=\"hidden-480\">"+vmadd.picked+"</td>\
            <td>"+vmadd.phone+"</td>\
            <td class=\"hidden-480\">"+vmadd.email+"</td>\
            <td>"+vmadd.department+"</td>\
            <td>\
            <div class=\"hidden-sm hidden-xs action-buttons\">\
                <a class=\"green\" href=\"#\">\
                <i class=\"ace-icon fa fa-pencil  bigger-130\"></i>\
                </a>\
                <a class=\"red\" href=\"#\">\
                <i class=\"ace-icon fa fa-trash-o  bigger-130\"></i>\
                </a>\
                </div>\
                </td>\
                <td>\
                <div class=\"hidden-sm hidden-xs action-buttons\">\
                <a class=\"green\" href=\"#\">\
                <i class=\"ace-icon fa fa-check bigger-130\"></i>\
                </a>\
                </div>\
                </td>\
                </tr>"
            }else{
                var $tr="<tr>\
                <td class=\"center\">\
                <label class=\"pos-rel\">\
                <input type=\"checkbox\" class=\"ace checkadmin\" v-model=\"checked\"/>\
                <span class=\"lbl\"></span>\
                </label>\
                </td>\
                <td >\
                <a href=\"#\">"+vmadd.userid+"</a>\
            </td>\
            <td >"+vmadd.name+"</td>\
            <td class=\"hidden-480\">"+vmadd.picked+"</td>\
            <td>"+vmadd.phone+"</td>\
            <td class=\"hidden-480\">"+vmadd.email+"</td>\
            <td>"+vmadd.department+"</td>\
            <td>\
            <div class=\"hidden-sm hidden-xs action-buttons\">\
                <a class=\"green\" href=\"#\">\
                <i class=\"ace-icon fa fa-pencil  bigger-130\"></i>\
                </a>\
                <a class=\"red\" href=\"#\">\
                <i class=\"ace-icon fa fa-trash-o  bigger-130\"></i>\
                </a>\
                </div>\
                </td>\
                <td>\
                <div class=\"hidden-sm hidden-xs action-buttons\">\
                <a class=\"red\" href=\"#\">\
                <i class=\"ace-icon glyphicon glyphicon-remove bigger-130\"></i>\
                </a>\
                </div>\
                </td>\
                </tr>"
            }*/
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
            console.log($this.home);
            $this.home.push(arr)
            console.log($this.home);



                /*  var addtr=$tr;
                $('.infor-tbody').append(addtr)*/
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
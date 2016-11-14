var vmApp = new Vue({
    el: '#vmApp',
    data: {
        home:[],
        checkedall:false,
        checked:false,
    },
    mounted: function () {
        this.fetchData();
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
        checked:function(){
            //点击控制checked 和checkedall的切换
        },
        render: function (result) {

            var home=[]
            for(var i in result.rows){
                home.push(result.rows[i])
            }
            this.home=home;
        },
        checktrue:function(){

        },
        checkfalse:function(){
            var arr=[];
            console.log(item.urseId)
            for(var i in item.urseId){

            }
        },

    }
})
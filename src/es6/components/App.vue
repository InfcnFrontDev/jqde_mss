<template>
    <div>
        <slot></slot>
    </div>
</template>
<script>
    import JqdeHead from './JqdeHead.vue'

    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        created(){
            // bootstrap & fontawesome
            this.addLink('assets/css/bootstrap.min.css');
            this.addLink('assets/font-awesome/4.5.0/css/font-awesome.min.css');
            // text fonts
            this.addLink('assets/css/fonts.googleapis.com.css');
            // ace styles
            this.addLink('assets/css/ace.min.css');
            this.addLink('assets/css/ace-skins.min.css');
            this.addLink('assets/css/ace-rtl.min.css');


        },
        methods: {
            addLink(url){
                var link = document.createElement("link");
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", url);

                var heads = document.getElementsByTagName("head");
                if (heads.length)
                    heads[0].appendChild(link);
                else
                    document.documentElement.appendChild(link);
            },
            addScript(url){
                var script = document.createElement("script");
                script.setAttribute("type", "text/javascript");
                script.setAttribute("src", url);

                var bodys = document.getElementsByTagName("body");
                if (bodys.length)
                    bodys[0].appendChild(script);
                else
                    document.documentElement.appendChild(script);
            }
        }
    }
</script>

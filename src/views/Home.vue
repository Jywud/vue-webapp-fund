<style lang="less">
    @import "../common/style/common.less";

    #home {
        position: absolute;
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div id="home">
        <router-view></router-view>
        <buttom-bar></buttom-bar>
    </div>
</template>
<script>    
    export default {
        name: 'home',
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {}
    }
</script>
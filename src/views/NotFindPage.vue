<style lang="less">
@import "../common/style/common.less";
#notFindPage{
    .page-style();
    background: #fff;
    .main-box{
        margin-top: 200px;
        text-align: center;
        font-size: 20px;
        .text{
            margin-bottom: 10px;
        }
    }
}
</style>

<template>
    <div id="notFindPage">
        <div class="main-box">
            <p class="text">页面好像迷路啦...</p>
            <router-link to="/home">去首页</router-link>
            
        </div>        
    </div>
</template>
<style lang="less">
@import "../../common/style/common.less";
#modifyProfession {
  .page-style();
  .content {
    background-color: @white-color;
    height: 100% - 16px;
    .input-item {
      .border-b-1px(@border-color);
      height: 50px;
      margin: 16px 16px 16px 16px;
      p {
        font-size: 16px;
        width: 100%;
        height: 100%;
        line-height: 50px;
        color: @gray-color;
      }
    }
    .btn-login {
      margin: 44px 30px 0 30px;
      width: auto;
    }
  }
}
</style>
<template>
  <div id="modifyProfession">
    <title-bar title="选择职业"></title-bar>
    <div class="content">
      <div class="input-item">
        <p @click="chooseProfession">{{profession}} </p>
      </div>
      <div class="btn btn-primary btn-login" @click="done" v-btntouch>确定</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'modifyProfession',
  data() {
    return {
      profession: "请选择职业",
    }
  },
  methods: {
    done () {
    },
    chooseProfession(){
      this.profession = '工人';
    },
  }
}
</script>

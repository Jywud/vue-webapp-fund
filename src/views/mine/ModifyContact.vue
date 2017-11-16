<style lang="less">
@import "../../common/style/common.less";
#modifyContact {
  .page-style();
  background-color: @white-color;
  padding-bottom: 30px;
  .input-item {
    .border-b-1px(@border-color);
    margin: 16px 0px 16px 0px;
    padding-right: 16px;
    padding-left: 16px;
    height: 44px;
    display: flex;
    font-size: 16px;
    .text{
      width: 80px;
      line-height: 44px;
    }
    input {
      font-size: 16px;
      flex: 1;
      width: 100%;
      height: 100%;
      color: @dark-color;
      border: 0;
    }
    .btn-code{
      width: 99px;
      height: 30px;
      border:1px solid #ff4e50;
      border-radius:4px;
      font-family:PingFangSC-Regular;
      font-size:16px;
      color:#ff4e50;
      line-height:30px;
      text-align:center;
    }
    .btn-sms-status {
      width: 99px;
      height: 30px;
      border:1px solid #cdcdcd;
      border-radius:4px;
      font-family:PingFangSC-Regular;
      font-size:15px;
      color:#cdcdcd;
      line-height:30px;
      text-align:center;
    }
  }
.btn-login {
  margin: 44px 30px 0;
  width: auto;
}

}
</style>
<template>
  <div id="modifyContact">
    <title-bar title="修改联系方式"></title-bar>
    <div class="input-item">
      <span class="text">手机号</span>
      <input type="tel" v-model="phoneNumber" placeholder="请输入手机号码">
    </div>
    <div class="input-item">
      <span class="text">验证码</span>
      <input type="tel" class="input" v-model="code" maxlength="6" placeholder="请输入验证码">
      <div class="btn btn-sms-status" v-if="isSendMes">{{waitCount}}s重新获取</div>
      <div class="btn btn-code" v-else="isSendMes" @click="getMesCode">获取验证码</div>
    </div>
    <div class="btn btn-primary btn-login" @click="done" v-btntouch>确定</div>
  </div>
</template>
<script>
export default {
  name: 'modifyContact',
  data() {
    return {
      isSendMes:false,
      phoneNumber: "",
      code: "",
      waitCount:60,
    }
  },
  methods: {
    done () {
      APP.openWin("/home");
    },
    getMesCode() {
      this.isSendMes = true;
      var _this = this;
      var timer = setInterval(function () {
        if (_this.waitCount == 1) {
          _this.isSendMes = false;
          clearInterval(timer);
          _this.waitCount = 60;
        } else {
          _this.waitCount--;
        }
      }, 1000);
    },
  }
}
</script>

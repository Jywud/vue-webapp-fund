/*vue router by wujiayu 官网地址https://router.vuejs.org/zh-cn/index.html */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/*function getComponent(url, groupName) {
return  r => require.ensure([], () => r(require(url)), groupName || 'default');
}*/

/*
1.首页可以考虑单独分包
2.添加路由请补全name属性
3.如果在路由离开后想保持页面状态，可以使用 meta: { keepAlive: true }, 默认为false
4.默认分配为default包
*/
const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: '/home',    
    // meta: { keepAlive: true },
    component: r => require.ensure([], () => r(require('src/views/Home')), 'default'),
    children: [
      {
        path: '',        
        component: r => require.ensure([], () => r(require('src/views/home/Recommend')), 'default')
      }, {
        path: 'asset',        
        component: r => require.ensure([], () => r(require('src/views/home/Asset')), 'default')
      }, {
        path: 'mine',        
        component: r => require.ensure([], () => r(require('src/views/home/Mine')), 'default')
      }]
  },
  /* =============================注册登录=============================== */
  {
    path: '/login',
    name: 'login',
    component: r => require.ensure([], () => r(require('src/views/Login')), 'default')
  },
  {
    path: '/registered',
    name: 'registered',
    component: r => require.ensure([], () => r(require('src/views/registered/Registered')), 'default')
  },
  {
    path: '/registeredSMS',
    name: 'registeredSMS',
    component: r => require.ensure([], () => r(require('src/views/registered/RegisteredSMS')), 'default')
  },
  {
    path: '/registeredPwd',
    name: 'registeredPwd',
    component: r => require.ensure([], () => r(require('src/views/registered/RegisteredPwd')), 'default')
  },
  {
    path: '/registeredResult',
    name: 'registeredResult',
    component: r => require.ensure([], () => r(require('src/views/registered/RegisteredResult')), 'default')
  },
  /* 验证手机 ShortMessageIdentification */
  {
    path: '/shortMessageIdentification',
    name: 'shortMessageIdentification',
    component: r => require.ensure([], () => r(require('src/views/template/ShortMessageIdentification')), 'default')
  },
  /* 验证手机-忘记密码 */
  {
    path: '/registeredPhoneVerification',
    name: 'registeredPhoneVerification',
    component: r => require.ensure([], () => r(require('src/views/registered/RegisteredPhoneVerification')), 'default')
  },
  /* ===========================主题基金========================== */
  {
    path: '/themeFund',
    name: 'themeFund',
    component: r => require.ensure([], () => r(require('src/views/themeFund/ThemeFund')), 'default')
  },
  {
    path: '/themeFundDetail',
    name: 'themeFundDetail',
    component: r => require.ensure([], () => r(require('src/views/themeFund/ThemeFundDetail')), 'default')
  },
  /* ===========================4433选基========================== */
  {
    path: '/fund4433',
    name: 'fund4433',
    component: r => require.ensure([], () => r(require('src/views/fund4433/Fund4433')), 'default')
  },
  {
    path: '/fund4433Introduce',
    name: 'fund4433Introduce',
    component: r => require.ensure([], () => r(require('src/views/fund4433/Fund4433Introduce')), 'default')
  },
  /* ===========================定投专区========================== */
  /* 定投专区 */
  {
    path: '/investModify',
    name: 'investModify',
    component: r => require.ensure([], () => r(require('src/views/fundInvest/InvestModify')), 'default')
  },
  /*
  * 定投详情
  */
  {
    path: '/investDetail',
    name: 'investDetail',
    component: r => require.ensure([], () => r(require('src/views/fundInvest/InvestDetail')), 'default')
  },
  /*
  *定投专区
  */
  {
    path: '/fixedInvestmentFunds',
    name: 'fixedInvestmentFunds',
    component: r => require.ensure([], () => r(require('src/views/fundInvest/FixedInvestmentFunds')), 'default')
  },
  /* 定投结果 */
  {
    path: '/investResult',
    name: 'investResult',
    component: r => require.ensure([], () => r(require('src/views/fundInvest/investResult')), 'default')
  },

  /*============================ 自选基金=============================== */
  /* 自选基金 */
  {
    path: '/optionalFund',
    name: 'optionalFund',
    component: r => require.ensure([], () => r(require('src/views/optionalFund/OptionalFund')), 'default')
  },
  /*============================ 热门排行=============================== */
  /* 热门排行 */
  {
    path: '/hotFundRanking',
    name: 'hotFundRanking',
    component: r => require.ensure([], () => r(require('src/views/hotFund/hotFundRanking')), 'default')
  },
  /* 基金搜索 */
  {
    path: '/selectFund',
    name: 'selectFund',
    component: r => require.ensure([], () => r(require('src/views/selectFund/SelectFund')), 'default')
  },
  /* =========================== 基金详细 ======================== */
  {
    path: '/fundDetails',
    name: 'fundDetails',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundDetails')), 'default')
  },
  /* 基金概况 */
  {
    path: '/fundSituation',
    name: 'fundSituation',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundSituation')), 'default')
  },
  /* 基金经理 */
  {
    path: '/fundManager',
    name: 'fundManager',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundManager')), 'default')
  },
  /* 基金费率 */
  {
    path: '/fundRate',
    name: 'fundRate',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundRate')), 'default')
  },
  /* 基金分红 */
  {
    path: '/fundDividend',
    name: 'fundDividend',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundDividend')), 'default')
  },
  /* 投资组合 */
  {
    path: '/fundPortfolio',
    name: 'fundPortfolio',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundPortfolio')), 'default')
  },
  /* 历史净值 */
  {
    path: '/fundValueHistory',
    name: 'fundValueHistory',
    component: r => require.ensure([], () => r(require('src/views/fundDetails/FundValueHistory')), 'default')
  },
  /* ===========================我的资产========================== */
  /* 资产详情 */
  {
    path: '/myDetailAsset',
    name: 'myDetailAsset',
    component: r => require.ensure([], () => r(require('src/views/myAsset/MyDetailAsset')), 'default')
  },
  /* 选择分红方式 */
  {
    path: '/dividendWay',
    name: 'dividendWay',
    component: r => require.ensure([], () => r(require('src/views/myAsset/DividendWay')), 'default')
  },
  /* 收益明细 */
  {
    path: '/inComeDetails',
    name: 'inComeDetails',
    component: r => require.ensure([], () => r(require('src/views/myAsset/InComeDetails')), 'default')
  },
  /* 赎回 */
  {
    path: '/fundRedemption',
    name: '/fundRedemption',
    component: r => require.ensure([], () => r(require('src/views/myAsset/fundRedemption')), 'default')
  },
  /* 赎回结果 */
  {
    path: '/redemptionResult',
    name: '/redemptionResult',
    component: r => require.ensure([], () => r(require('src/views/myAsset/RedemptionResult')), 'default')
  },
  /* ============================购买============================= */
  {
    path: '/fundBuy',
    name: '/fundBuy',
    component: r => require.ensure([], () => r(require('src/views/fundBuy/FundBuy')), 'default')
  },
  /* 购买协议 */
  {
    path: '/fundBuyAgreement',
    name: '/fundBuyAgreement',
    component: r => require.ensure([], () => r(require('src/views/fundBuy/FundBuyAgreement')), 'default')
  },
  /*适当性评估确认 */
  {
    path: '/AppropriateAssessment',
    name: '/AppropriateAssessment',
    component: r => require.ensure([], () => r(require('src/views/fundBuy/appropriateAssessment')), 'default')
  },
  /* 购买结果反馈 */
  {
    path: '/fundBuyResult',
    name: '/fundBuyResult',
    component: r => require.ensure([], () => r(require('src/views/fundBuy/FundBuyResult')), 'default')
  },
  /* 支付结果页 */
  {
    path: '/fundPayResult',
    name: '/fundPayResult',
    component: r => require.ensure([], () => r(require('src/views/fundBuy/FundPayResult')), 'default')
  },
  /* ============================我的============================= */
  /* 我的资料 */
  {
    path: '/myInformation',
    name: 'myInformation',
    component: r => require.ensure([], () => r(require('src/views/mine/MyInformation')), 'default')
  },
  /* 修改联系方式 */
  {
    path: '/modifyContact',
    name: 'modifyContact',
    component: r => require.ensure([], () => r(require('src/views/mine/ModifyContact')), 'default')
  },
  /* 修改电子邮箱 */
  {
    path: '/modifyEmail',
    name: 'modifyEmail',
    component: r => require.ensure([], () => r(require('src/views/mine/ModifyEmail')), 'default')
  },
  /* 修改手机号 */
  {
    path: '/modifyPhone',
    name: 'modifyPhone',
    component: r => require.ensure([], () => r(require('src/views/mine/ModifyPhone')), 'default')
  },
  /* 修改联系地址 */
  {
    path: '/modifyAddress',
    name: 'modifyAddress',
    component: r => require.ensure([], () => r(require('src/views/mine/ModifyAddress')), 'default')
  },
  /* 交易记录 */
  {
    path: '/transactionRecord',
    name: 'transactionRecord',
    component: r => require.ensure([], () => r(require('src/views/mine/TransactionRecord')), 'default')
  },
  /* 银行卡管理 */
  {
    path: '/bankCardManage',
    name: 'bankCardManage',
    component: r => require.ensure([], () => r(require('src/views/mine/BankCardManage')), 'default')
  },
  /* 添加银行卡 */
  {
    path: '/addBankCard',
    name: 'addBankCard',
    component: r => require.ensure([], () => r(require('src/views/mine/AddBankCard')), 'default')
  },
  /* 选择银行卡 */
  {
    path: '/selectBankCard',
    name: 'selectBankCard',
    component: r => require.ensure([], () => r(require('src/views/template/selectBankCard')), 'default')
  },
  /* 确认密码 */
  {
    path: '/pwdConfirm',
    name: 'pwdConfirm',
    component: r => require.ensure([], () => r(require('src/views/template/pwdConfirm')), 'default')
  },
  /* 手机验证 */
  {
    path: '/phoneVerification',
    name: 'phoneVerification',
    component: r => require.ensure([], () => r(require('src/views/template/PhoneVerification')), 'default')
  },
  /* 修改交易密码 */
  {
    path: '/changeTradePwd',
    name: 'changeTradePwd',
    component: r => require.ensure([], () => r(require('src/views/mine/ChangeTradePwd')), 'default')
  },
  /* 风险测评结果页 */
  {
    path: '/evaluationResult',
    name: 'evaluationResult',
    component: r => require.ensure([], () => r(require('src/views/mine/EvaluationResult')), 'default')
  },
  /* 风险测评试题页 */
  {
    path: '/riskEvaluation',
    name: 'riskEvaluation',
    component: r => require.ensure([], () => r(require('src/views/mine/RiskEvaluation')), 'default')
  },
  /* 未匹配到路由 */
  {
    path: '*',
    name: 'notFindPage',
    component: r => require.ensure([], () => r(require('src/views/NotFindPage')), 'default')
  }
];

let router = new Router({
  routes
});

/**
* 路由拦截
*next()方法必须调用
*/
router.beforeEach((to, from, next) => {
  next();
});

export default router;

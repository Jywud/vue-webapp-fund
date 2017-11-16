/*init vux plugin by wujiayu 官网地址https://vux.li/#/*/
import Vue from 'vue'
import {AlertPlugin, ConfirmPlugin, ToastPlugin, LoadingPlugin, DatetimePlugin} from 'vux'
import componentCfg from 'src/componentsConfig'

Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
Vue.use(DatetimePlugin);

/* 全局注册自定义组件 */
const component = componentCfg[current_client];

Vue.component('buttom-bar', component['ButtomBar']);
Vue.component('title-bar', component['TitleBar']);
Vue.component('keyboard-view', component['KeyboardView']);
Vue.component('password-view', component['PasswordView']);
Vue.component('row-cell', component['RowCell']);
Vue.component('list-layout', component['ListLayout']);
Vue.component('empty-view', component['EmptyView']);
Vue.component('action-sheet', component['ActionSheet']);
Vue.component('line-cell', component['LineCell']);
Vue.component('deal-result', component['DealResult']);
Vue.component('score-bar', component['ScoreBar']);
/**
 * 组件透传,可配置已有组件类型
 */
const config = {
    hs: {
        ButtomBar: require('./components/ButtomBar/Default.vue'),
        TitleBar: require('./components/TitleBar/Default.vue'),
        KeyboardView: require('./components/KeyboardView/Default.vue'),
        PasswordView: require('./components/PasswordView/Default.vue'),        
        ListLayout: require('./components/ListLayout/Default.vue'),
        EmptyView: require('./components/EmptyView/Default.vue'),
        ActionSheet: require('./components/ActionSheet/Default.vue'),
        LineCell: require('./components/LineCell/Default.vue'),
        DealResult: require('./components/DealResult/Default.vue'),
        ScoreBar: require('./components/ScoreBar/Default.vue')
    },
    hsTest: {

    }
}

export default config
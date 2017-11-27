<style lang="less">
    @import "../../common/style/common.less";
    #myInformation {
        .page-style();
        .group-box {
            background: #fff;
            margin: 10px 0;
        }
        .none {
            display: none;
        }
        .logout {
            text-align: center;
            color: @primary-color;
            padding: 14px 0;
            font-size: 16px;
        }
    }
</style>
<template>
    <div id="myInformation">
        <title-bar title="我的资料" back-path="/home/mine"></title-bar>
        <div class="main-column-box">
            <div class="group-box">
                <line-cell title="姓名" :text="name"></line-cell>
                <line-cell title="理财账号" :text="account"></line-cell>
                <line-cell title="证件类型" text="身份证"></line-cell>
                <line-cell title="证件号码" :text="IDCard"></line-cell>
            </div>
            <div class="group-box">
                <line-cell title="手机号码" :text="phone" :isLink="true" @tapItem="tapItem"></line-cell>
                <line-cell title="电子邮箱" :text="email" :isLink="true" @tapItem="tapItem"></line-cell>
                <line-cell title="联系地址" :text="address" :isLink="true" @tapItem="tapItem"></line-cell>
            </div>
            <div class="group-box">
                <line-cell title="学历" :text="educationVal[0]" :isLink="true" @tapItem="tapItem"></line-cell>
                <line-cell title="职业" :text="professionVal[0]" :isLink="true" @tapItem="tapItem"></line-cell>
            </div>
            <div class="group-box">
                <div class="logout" @click="logout" v-touch>退出</div>
            </div>
        </div>
        <popup-picker :show.sync="showProfessionPicker" :data="professionList" :show-cell="false" v-model="professionVal"></popup-picker>
        <popup-picker :show.sync="showEducationPicker" :data="educationList" :show-cell="false" v-model="educationVal"></popup-picker>
    </div>
</template>
<script>
    import utils from 'js/utils'
    import { PopupPicker} from 'vux'
    var tapItemObj = {
        '联系地址': '/modifyAddress',
        '电子邮箱': '/modifyEmail',
        '手机号码': '/pwdConfirm'
    };
    export default {
        name: 'myInformation',
        data() {
            return {
                showProfessionPicker: false,
                showEducationPicker: false,
                professionVal: ['农民'],
                educationVal: ['硕士'],
                professionList: [
                    ['教师', '农民', '职员']
                ],
                educationList: [
                    ['大专', '本科', '硕士']
                ],
                name: '王小丫',
                account: '12812712',
                IDCard: '33092119902010234',
                phone: '15298665111',
                email: 'wjy1234@@yahoo.com',
                address: '杭州市滨江区',
                education: '本科',
                profession: '医生'
            }
        },
        watch: {
            professionVal(val) {
                // console.log('职业：' + val);
            },
            educationVal(val) {
                // console.log('学历：' + val);
            }
        },
        methods: {
            tapItem(title) {                
                var router = tapItemObj[title];
                if(title == '学历') {
                    this.showEducationPicker = true;
                    return;
                }
                if(title == '职业') {
                    this.showProfessionPicker = true;
                    return;
                }

                if (title == '手机号码') {
                    utils.setCommonRouter({
                        pwdConfirm: '/modifyPhone'
                    });
                }
                router && APP.openWin(router);
            },
            logout() {
                APP.openWin('/login');
            }
        },
        components: {
            PopupPicker
        },
        filters: {
        }
    }
</script>



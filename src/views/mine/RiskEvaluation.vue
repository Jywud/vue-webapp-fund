<style lang="less">
@import "../../common/style/common.less";
#riskEvaluation{
    .page-style();
    .content-box{
        position: absolute;
        left: 0;
        right: 0;
        top: 50px;
        bottom: 50px;
        overflow-y: auto;        
        -webkit-overflow-scrolling: touch;     
    }
    .warn-box{
        padding: 10px;
        font-size: 0.14rem;
        color:#f58700;
        background: #FFF6E7;
        line-height: 21px;       
    }
    .question {           
        margin: 10px;        
        .title{
            font-size: 0.16rem;
            color: @dark-color;
        }
        .question_wp {
            margin: 12px 0;
            border-radius: 10px;
            background: #fff;
            .options {
                padding: 10px;
                border-bottom: 1px solid rgba(229, 229, 229, 0.6);
                &:last-child {
                    border-bottom: none;
                }
                label {
                    font-size: 15px;
                    color: @litdark-color;
                    width: 100%;
                    display: inline-block;
                }
            }
            textarea {
                width: 100%;                
                font-size: 0.16rem;
            }
        }
    }
    .btn-box{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 6px 0;
        .btn-confirm{
            height: 36px;
            line-height: 36px;
            margin: 0 100px;
        }
        
    }
    
}
</style>
<template>
    <div id="riskEvaluation">
        <title-bar title="风险测评"></title-bar>
        <div class="content-box">
            <p class="warn-box">
                <i class="iconfont icon-warning"></i>
                我司履行风险承受能力评估不能取代您个人投资判定，您个人需承担相关投资风险、履约责任及费用等。您应如实提交与评估相关的信息及证明材料并对其真实性、准确性、完整性负责。建议您在个人各项情况有重大变化时重新评估，确保与实际一致。我司对您提供的信息尽法定保密义务。
            </p>
            <div class="question">
                <div v-for="(item, out_index) in question_data" :class="'risk-question-' + out_index" :key="out_index">
                    <p class="title">{{out_index+1}}、{{item.question_content}}</p>
                    <div class="question_wp" v-if="item.question_kind =='0'">
                        <div class="options" v-for="(value, in_index) in item.answer_content" :key="in_index">
                            <div>
                                <label>
                                    <input type="radio" :name="item.question_no" :value="in_index" v-model="item.modelValue" 
                                        @click="goNextQuesrion(out_index, item.question_kind)">
                                    <i class="iconfont i-radio"></i>                        
                                    {{value}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="question_wp" v-if="item.question_kind =='1'">
                        <div class="options" v-for="(value, in_index) in item.answer_content" :key="in_index">
                            <div>
                                <label>
                                    <input type="checkbox" :value="in_index" v-model="item.modelValue" >
                                    <i class="iconfont i-checkbox"></i>                       
                                    {{value}}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="question_wp" v-if="item.question_kind =='2'">
                        <textarea rows="7" v-model="item.modelValue"></textarea>
                    </div>

                </div>
            </div>
        </div>
        <div class="btn-box">
            <div class="btn btn-primary btn-confirm" @click="confirm" v-btntouch>提交</div>
        </div>        
    </div>
</template>
<script>
import _ from 'underscore'
export default {
    name: 'riskEvaluation',
    mounted() {
        /* this.$http.getEligPaper({
            paper_type: "1", //试卷类别 1-客户风险测评试卷, n-知识测评试卷
            organ_flag: "0"
        }).then((resp)=> {
            resp.data.forEach( (item) => {
                if (item.question_kind == "0") { //单选题
                    item.answer_content = JSON.parse(item.answer_content);
                    item.modelValue = "";
                } else if (item.question_kind == "1") { //多选题
                    item.answer_content = JSON.parse(item.answer_content);
                    item.modelValue = [];
                } else if (item.question_kind == "2") { //主观题
                    item.modelValue = "";
                }
            });
            
            this.question_data = resp.data;
        }); */
        this.question_data.forEach( (item) => {
            if (item.question_kind == "0") { //单选题
                item.answer_content = JSON.parse(item.answer_content);
                item.modelValue = "";
            } else if (item.question_kind == "1") { //多选题
                item.answer_content = JSON.parse(item.answer_content);
                item.modelValue = [];
            } else if (item.question_kind == "2") { //主观题
                item.modelValue = "";
            }
        });
        
    },
    data() {
        return {
            // question_data: [] //定义获取的问题数据
            question_data: [{"paper_type":"1","organ_flag":"0","question_no":16,"question_kind":"0","question_content":"您的主要收入来源是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"利息、股息、转让证券等金融性资产收入\",\"2\":\"生产经营所得\",\"1\":\"工资、劳务报酬\",\"5\":\"无固定收入\",\"4\":\"出租、出售房地产等非金融性资产收入\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":17,"question_kind":"0","question_content":"最近您家庭预计进行证券投资的资金占家庭现有总资产(不含自住、自用房产及汽车等固定资产)的比例是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"30%－50%\",\"2\":\"50%-70%\",\"1\":\"70%以上\",\"5\":\"10%以下\",\"4\":\"10%－30%\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":18,"question_kind":"0","question_content":"您是否有尚未清偿的数额较大的债务，如有，其性质是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"有，信用卡欠款、消费信贷等短期信用债务\",\"2\":\"有，住房抵押贷款等长期定额债务\",\"1\":\"没有\",\"4\":\"有，亲朋之间借款\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":19,"question_kind":"0","question_content":"您可用于投资的资产数额（包括金融资产和不动产）为：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"300万-1000万元（不含）人民币\",\"2\":\"50万-300万元（不含）人民币\",\"1\":\"不超过50万元人民币\",\"4\":\"1000万元人民币以上\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":20,"question_kind":"0","question_content":"以下描述中何种符合您的实际情况：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"取得证券从业资格、期货从业资格、注册会计师证书（CPA）或注册金融分析师证书（CFA）中的一项及以上\",\"2\":\"已取得金融、经济或财会等与金融产品投资相关专业学士以上学位\",\"1\":\"现在或此前曾从事金融、经济或财会等与金融产品投资相关的工作超过两年\",\"4\":\"我不符合以上任何一项描述\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":21,"question_kind":"0","question_content":"您的投资经验可以被概括为：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"丰富：我是一位有经验的投资者，参与过股票、基金等产品的交易，并倾向于自己做出投资决策\",\"2\":\"一般：除银行活期账户和定期存款外，我购买过基金、保险等理财产品，但还需要进一步的指导\",\"1\":\"有限：除银行活期账户和定期存款外，我基本没有其他投资经验\",\"4\":\"非常丰富：我是一位非常有经验的投资者，参与过权证、期货或创业板等高风险产品的交易\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":22,"question_kind":"0","question_content":"有一位投资者一个月内做了15笔交易（同一品种买卖各一次算一笔），您认为这样的交易频率：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"正常\",\"2\":\"偏高\",\"1\":\"太高了\",\"4\":\"偏低\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":23,"question_kind":"0","question_content":"过去一年时间内，您购买的不同产品或接受的不同服务（含同一类型的不同产品或服务）的数量是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"11至15个\",\"2\":\"6至10个\",\"1\":\"5个以下\",\"4\":\"16个以上\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":24,"question_kind":"1","question_content":"以下金融产品或服务，您投资经验在两年以上的有：","question_type":"2","answer_key":"","answer_content":"{\"3\":\"股票、混合型基金、偏股型基金、股票型基金等权益类投资品种等\",\"2\":\"债券、货币市场基金、债券型基金或其它固定收益类产品等\",\"1\":\"银行存款等\",\"5\":\"复杂金融产品、其他产品或服务\",\"4\":\"期货、融资融券\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":25,"question_kind":"0","question_content":"如果您曾经从事过金融市场投资，在交易较为活跃的月份，平均月交易额大概是多少：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"30万元-100万元\",\"2\":\"10万元-30万元\",\"1\":\"10万元以内\",\"5\":\"从未从事过金融市场投资\",\"4\":\"100万元以上\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":26,"question_kind":"0","question_content":"您用于证券投资的大部分资金不会用作其它用途的时间段为：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"无特别要求\",\"2\":\"0到5年\",\"1\":\"0到1年\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":27,"question_kind":"1","question_content":"您打算重点投资于哪些种类的投资品种？","question_type":"2","answer_key":"","answer_content":"{\"3\":\"期货、融资融券等\",\"2\":\"股票、混合型基金、偏股型基金、股票型基金等权益类投资品种\",\"1\":\"债券、货币市场基金、债券基金等固定收益类投资品种\",\"5\":\"其他产品或服务\",\"4\":\"复杂或高风险金融产品或服务\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":28,"question_kind":"0","question_content":"假设有两种不同的投资：投资A预期获得5%的收益，有可能承担非常小的损失；投资B预期获得20%的收益，但有可能面临25%甚至更高的亏损。您将您的投资资产分配为：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"两种投资各一半\",\"2\":\"大部分投资于A\",\"1\":\"全部投资于A\",\"5\":\"全部投资于B\",\"4\":\"大部分投资于B\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":30,"question_kind":"0","question_content":"您认为自己能承受的最大投资损失是多少？","question_type":"1","answer_key":"","answer_content":"{\"3\":\"较大的投资损失\",\"2\":\"一定的投资损失\",\"1\":\"尽可能保证本金安全\",\"4\":\"损失可能超过本金\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":31,"question_kind":"0","question_content":"您打算将自己的投资回报主要用于：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"履行扶养、抚养或赡养义务\",\"2\":\"个体生产经营或证券投资以外的投资行为\",\"1\":\"改善生活\",\"5\":\"偿付债务\",\"4\":\"本人养老或医疗\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":32,"question_kind":"0","question_content":"您的年龄是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"41-50岁\",\"2\":\"31-40岁\",\"1\":\"18-30岁\",\"5\":\"超过60岁\",\"4\":\"51-60岁\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":33,"question_kind":"0","question_content":"今后五年时间内，您的父母、配偶以及未成年子女等需负法定抚养、扶养和赡养义务的人数为：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"5人以上\",\"2\":\"3-4人\",\"1\":\"1-2人\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":34,"question_kind":"0","question_content":"您的最高学历是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"大学本科\",\"2\":\"大学专科\",\"1\":\"高中或以下\",\"4\":\"硕士及以上\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":35,"question_kind":"0","question_content":"您家庭的就业状况是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"您与配偶均没有稳定收入的工作或者已退休\",\"2\":\"您与配偶其中一人有稳定收入的工作\",\"1\":\"您与配偶均有稳定收入的工作\",\"5\":\"未婚，目前暂无稳定收入的工作\",\"4\":\"未婚，但有稳定收入的工作\"}","trade_rate":0.0,"paper_answer":""},{"paper_type":"1","organ_flag":"0","question_no":8020,"question_kind":"0","question_content":"当您进行投资时，您的首要目标是：","question_type":"1","answer_key":"","answer_content":"{\"3\":\"产生较多的收益，可以承担较大的投资风险\",\"2\":\"产生一定的收益，可以承担一定的投资风险\",\"1\":\"尽可能保证本金安全，不在乎收益率比较低\",\"4\":\"实现资产大幅增长，愿意承担很大的投资风险\"}","trade_rate":0.0,"paper_answer":""}]
        }
    },
    methods: {
        confirm: function() {
           
            //完成情况校验
            /* for (var i = 0; i < this.question_data.length; i++) {
                if (this.question_data[i].modelValue == "" || this.question_data[i].modelValue.length == 0) {
                    // utils.toast("您好，风险测评第" + (i + 1) + "题还未完成");
                    var dom = document.getElementsByClassName("risk-question-" + i)[0];
                    dom && dom.scrollIntoView();
                    return false;
                }
            } */

            APP.openWin('/evaluationResult');
            /* var subEligPaperParms = {
                paper_type: "1", //试卷类别
                paper_answer: "" //试卷答案
            };

            _.each(this.question_data, function(item, index) {
                if (item.question_kind == "0") {
                    subEligPaperParms.paper_answer += item.question_no + "&" + item.modelValue + "|";
                } else if (item.question_kind == "1") {
                    subEligPaperParms.paper_answer += item.question_no + "&" + item.modelValue.join("^") + "|";
                } else if (item.question_kind == "2") {
                    subEligPaperParms.paper_answer += item.question_no + "&" + item.modelValue + "|";
                }
            });
            API.subEligPaper(subEligPaperParms).then(function(res) {
                Light.navigate("riskShow", {
                    data: JSON.stringify(res.data),
                    fromPage: _this.fromPage
                });
            }); */
        },
        //单选题做完跳转下一题
        goNextQuesrion: function(id, type) {
            var dom = document.getElementsByClassName("risk-question-" + (id + 1))[0];
            setTimeout(function() {
                type == 0 && dom && dom.scrollIntoView();
            }, 500);                
        }
    }
}
</script>


<template>
    <div id="listLayout" :style="getLayoutStyle()">
        <div v-if="isShowRefresh" class="list-refresh" :class="{'list-refresh-filter':hasFilter()}">
            <canvas id="listRrefresh" width="200" height="24" class="refresh-canvas"></canvas>
            <div class="refresh-title">下拉刷新</div>
            <div class="refresh-date">最近更新:2017-09-31 13:09:20</div>
        </div>
        <!--过滤条件 暂时没有用 提出在组件外处理-->
        <div v-if="hasFilter()" class="list-filter">
            <span @click="doFilter(item,index)" v-for="(item,index) in mSetting.filter"
                  class="filter-item" :key="index">{{item}}</span>
        </div>
        <div v-if="isShowOrder" class="order-main">
            <div class="order-list">
                <div class="order-item" v-for="(item,index) in orderType" @click="doOrderBy(item,index)" :key="index">
                    <div class="order-item-left" :class="setOrderClass(item)">
                        {{item}}
                    </div>
                    <div v-if="isChooedOrder(item)" class="order-item-right iconfont icon-selected1"></div>
                </div>
            </div>
        </div>
        <div id="list-main" class="list-main">
            <div v-if="isShowTitle" class="list-title" :style="getTitleStyle()">
                <div @click="orderBy(item)" class="list-title-item" :class="getTitleItemClass(item)"
                     :style="getTitleItemStyle(item)"
                     v-for="(item,index) in title"
                     :key="index">
                    <span class="title-value" :class="getTitleOrderByClass(item,index,'value')">{{item.value}}</span>
                    <span v-if="needOrder(item,index)"
                          :class="getTitleOrderByClass(item,index,'icon')"></span>
                </div>
            </div>
            <div id="list-layout" class="list-layout" @scroll="mScroll($event)">
                <div class="listLayout-child" :style="getLineStyle()" v-for="(child,index) in list" :key="index"
                     @click="onclick(index)" v-touch>
                    <div @click="columnClick(column,index)" :id="index+''+index2" :style="getColumnStyle(index2)"
                         class="item"
                         v-for="(column,index2) in child"
                         :key="index2">
                        <div :style="getItemStyle(index2,index3)" class="item-top"
                             v-for="(item,index3) in column" :key="index3"
                             :class="getItemClass(item,index,index2,index3)">
                            {{item.value}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isShowEdit" class="list-edit">
            <div @click="editDelete()" class="edit-delete">删除</div>
            <div @click="editFinish()" class="edit-finish">完成</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'listLayout',
        data() {
            return {
                list: [],              //数据标准化处理后的配置实体
                mSetting: {},          //根据参数得到的配置介质
                title: [],             //标题数组
                modelSet: {            //根据模块自定义的配置包装
                    asset: [],         //资金类列表包装
                    fund: [],          //基金类列表包装
                    inCome: []         //收益类列表包装
                },
                orderType: ["日涨幅", "近一周", "近一月", "近三月", "近六月", "近一年", "近两年", "近三年"],         //默认数据排序依据
                chooseOrderIndex: 0,   //当前选中的排序依据下标
                chooseOrder: "日涨幅",       //当前选中的排序依据

                isShowOrder: false,   //是否显示排序依据选择弹窗
                isShowTitle: false,   //是否显示标题
                isShowRefresh: false, //是否显示下拉刷新
                isNextPage: false,    //是否有下一页
                isShowEdit: false,    //是否显示编辑

                orderBySet: [],        //排序配置
                orderByType: "down",   //排序默认降序
                choosedData: [],       //被选中的项
                ctx: {},               //下拉刷新画板
                refreshViewHeight: 75, //刷新界面高度
                scrollTop: 0,          //当前列表滚动了的距离 上拉加载更多时用到
                filterTop: 38,         //位置参数 下拉刷新时用到 筛选布局的高度
                moveY: 0,              //位置参数 下拉刷新时用到 Y轴移动的距离
                oldY: 0                //位置参数 下拉刷新时用到 Y轴初始位置
            }
        },
        mounted(){

        },
        methods: {
            /**设置下拉刷新**/
            setRefresh(){
                if (this.isShowRefresh) {
                    setTimeout(() => {
                        this.canvasRefresh();
                    }, 1000);
                    var obj = document.getElementById("list-main");
                    obj.addEventListener('touchstart', event => {
                        this.moveY = 0;
                    }, false);
                    obj.addEventListener('touchmove', event => {
                        /**编辑状态不显示下拉刷新**/
                        if (this.isShowEdit) {
                            return;
                        }
                        if (this.scrollTop == 0) {
                            if (this.oldY == 0) {
                                this.oldY = event.targetTouches[0].clientY;
                            }
                            this.moveY = (event.targetTouches[0].clientY - this.oldY) / 3;
                            if (this.moveY > 0) {
                                obj.style.position = "absolute";
                                obj.style.top = this.hasFilter() ? obj.style.top = this.moveY + this.filterTop + "px" : this.moveY + "px";
                                this.canvasRefresh();
                            }
                        } else {
                            this.oldY = 0;
                        }
                    }, false);
                    obj.addEventListener('touchend', () => {
                        this.oldY = 0;
                        TweenMax.to(obj, 0.3, {
                            top: this.hasFilter() ? this.filterTop + "px" : "0px",
                            ease: Back.easeOut,
                        })
                        setTimeout(() => {
                            obj.style.top = "";
                            obj.style.position = "";
                        }, 400)
                        /**判断是否需要刷新**/
                        if (this.moveY >= this.refreshViewHeight) {
                            this.choosedData = [];
                            this.$emit('listener', {
                                "type": "refresh",
                                "data": ""
                            });
                        }
                    }, false);
                }
            },
            /**滚动监听**/
            mScroll: function (event) {
                var view = event.srcElement ? event.srcElement : event.target;
                this.scrollTop = view.scrollTop;
                if (this.isNextPage) {
                    if (view.scrollHeight - (view.scrollTop + view.clientHeight) == 0) {
                        this.$emit('listener', {
                            "type": "nextPage",
                            "data": ""
                        });
                    }
                }
            },
            /**预设模型**/
            setModelSet(){
                /**资产**/
                this.modelSet.asset = {
                    type: [["default"], ["default"], ["up-down"], ["up-down"]]
                };
                /**基金**/
                this.modelSet.fund = {
                    type: [["default"], ["default"], ["up-down"]],
                    class: [["dark-14-class", "gray-12-class"], ["dark-16-class"], ["dark-16-class"]],
                };
                /**收益**/
                this.modelSet.inCome = {
                    type: [["default"], ["up-down"]]
                };
            },
            /**获取标题Style**/
            getTitleStyle(){
                return (this.mSetting.titleStyle ? this.mSetting.titleStyle : {})
            },
            /**获取标题子项Class**/
            getTitleItemClass(item){
                return item.class;
            },
            /**获取标题子项Style**/
            getTitleItemStyle(item){
                return item.style;
            },
            /**获取可筛选标题样式**/
            getTitleOrderByClass(item, index, type){
                if (type == "icon") {
                    return this.isShowOrder ? "icon-orderby-up" : "icon-orderby-down";
                } else if (this.needOrder(item, index)) {
                    return this.isShowOrder ? "value-orderby-up" : "";
                }
            },
            /**获取组件最外层样式**/
            getLayoutStyle(){
                return (this.mSetting.layoutStyle ? this.mSetting.layoutStyle : {})
            },
            /**获取组件行样式**/
            getLineStyle(){
                return (this.mSetting.lineStyle ? this.mSetting.lineStyle : {})
            },
            /**获取组件列样式**/
            getColumnStyle(index){
                return (this.mSetting.column[index].style ? this.mSetting.column[index].style : {})
            },
            /**获取列中子项Style**/
            getItemStyle(index, index2){
                return (this.mSetting.column[index].item[index2].style ? this.mSetting.column[index].item[index2].style : {})
            },
            /**获取列中子项Class**/
            getItemClass(item, index, index2, index3){
                /**自定义参数up-down判断是否有色显示内容**/
                var addClass = "";
                if (item.type == "up-down") {
                    var downIndex = item.value.indexOf("-");
                    addClass = downIndex == 0 ? "item-color-down" : "item-color-up";
                } else if (item.type == "edit-unselected") {
                    if (this.choosedData.contains(this.mSetting.data[index])) {
                        /**编辑状态下分页造成数据初始化 此处还原已经选中的项**/
                        item.type = "edit-selected";
                        addClass = "icon-unchecked edit-selected";
                    } else {
                        item.type = "edit-unselected";
                        addClass = "icon-unchecked edit-unselected";
                    }
                } else if (item.type == "edit-selected") {
                    addClass = "icon-activee edit-selected";
                }
                return (this.mSetting.column[index2].item[index3].class ? this.mSetting.column[index2].item[index3].class : "") + " " + addClass
            },
            /**判断走哪种配置**/
            checkSetting(){
                this.setOrderBy();
                if (this.setting.easySet) {
                    this.setModelSet();
                    this.setRefresh();
                    this.makeEasySetting();
                } else {
                    this.mSetting = this.setting;
                }
                this.settingFormat();
            },
            /**根据配置生成布局配置实体**/
            settingFormat(){
                var data = this.mSetting.data;
                var setting = this.mSetting.column;
                this.title = this.mSetting.title;
                if (data) {
                    var list = [];
                    for (var i = 0; i < data.length; i++) {
                        var childList = [];
                        setting.forEach(function (child) {
                            var itemList = [];
                            child.item.forEach(function (item) {
                                var value = data[i][item.value] ? data[i][item.value] : "";
                                var type = item.type ? item.type : "";
                                var item = {value, type};
                                itemList.push(item);
                            })
                            childList.push(itemList);
                        })
                        list.push(childList);
                    }
                    this.list = list;
                }
            },
            makeEasySetting(){
                this.setOrder();
                this.setFilter();
                this.setData();
                this.setController();
                this.setLayoutStyle();
                this.setLineStyle();
                this.setTitleStyle();
                this.setTitle();
                this.setColumn();
            },
            setData(){
                /**数据配置**/
                this.mSetting.data = this.setting.data;
            },
            setController(){
                /**控制器、开关配置**/
                var controller = this.setting.controller;
                if (controller) {
                    this.isShowRefresh = controller.refresh ? true : false;
                    this.isNextPage = controller.nextPage ? true : false;
                    this.isShowEdit = controller.edit ? true : false;
                    this.choosedData = this.isShowEdit ? this.choosedData : [];
                }
                this.mSetting.controller = controller;
            },
            setLayoutStyle(){
                /**组件样式**/
                this.mSetting.layoutStyle = this.setting.easySet.layoutStyle;
            },
            setLineStyle(){
                /**行样式**/
                this.mSetting.lineStyle = this.setting.easySet.lineStyle;
            },
            setTitleStyle(){
                /**标题样式**/
                this.mSetting.titleStyle = this.setting.easySet.titleStyle;
            },
            setTitle(){
                /**标题行配置**/
                var title = this.setting.easySet.title;
                var weight = this.setting.easySet.weight;
                var titleClass = this.setting.easySet.titleClass;
                var newTitle = [];
                if (title) {
                    this.isShowTitle = true;
                    /**编辑状态增加选择标题项**/
                    if (this.isShowEdit) {
                        var editTitle = "选择";
                        if (title.length == weight.length - 1) {
                            newTitle.push({
                                style: {
                                    flex: weight[0],
                                    textAlign: "left"
                                },
                                value: editTitle
                            });
                        }
                    }
                    for (var i = 0; i < title.length; i++) {
                        var style = this.makeStyle(i);
                        newTitle.push({
                            style: style,
                            value: title[i],
                            class: titleClass ? titleClass[i] : ""
                        });
                    }
                }
                this.mSetting.title = newTitle;
            },
            setColumn(){
                var value = this.setting.easySet.value;
                var weight = this.setting.easySet.weight;
                var easySet = this.setting.easySet;
                var itemType = easySet.type;
                var itemClass = easySet.class;
                var newColumn = [];
                if (value) {
                    if (this.isShowEdit) {
                        if (value.length == weight.length - 1) {
                            newColumn.push({
                                style: {
                                    flex: weight[0],
                                    textAlign: "left"
                                },
                                item: [{
                                    value: "",
                                    type: "edit-unselected",
                                    class: "iconfont"
                                }]
                            });
                        }
                    }
                    for (var i = 0; i < value.length; i++) {
                        var style = this.makeStyle(i);
                        var column = {
                            style: style,
                            item: []
                        };
                        for (var k = 0; k < value[i].length; k++) {
                            var item_type = [];
                            var item_class = [];
                            var modelSet = this.modelSet[easySet.model];
                            if (itemType && itemType[i] && itemType[i].length) {
                                item_type = itemType[i][k];
                            } else if (modelSet && modelSet.type && modelSet.type[i] && modelSet.type[i].length) {
                                item_type = modelSet.type[i][k];
                            }
                            if (itemClass && itemClass[i] && itemClass[i].length) {
                                if (modelSet && modelSet.class && modelSet.class[i] && modelSet.class[i].length > 0) {
                                    item_class = modelSet.class[i][k] + " " + itemClass[i][k];
                                } else {
                                    item_class = itemClass[i][k];
                                }
                            } else {
                                if (modelSet && modelSet.class && modelSet.class[i] && modelSet.class[i].length > 0) {
                                    item_class = modelSet.class[i][k];
                                } else {
                                    item_class = "";
                                }
                            }
                            column.item.push(
                                {
                                    value: value[i][k],
                                    type: item_type,
                                    class: item_class
                                }
                            );
                        }
                        newColumn.push(column);
                    }
                }
                this.mSetting.column = newColumn;
            },
            setFilter(){
                this.mSetting.filter = this.setting.easySet.filter;
            },
            setOrder(){
                /**数据筛选、排序依据配置**/
                this.orderType = this.setting.easySet.orderType ? this.setting.easySet.orderType : this.orderType;
                this.chooseOrder = this.orderType[0];
                this.chooseOrderIndex = 0;
            },
            makeStyle(i){
                var easySet = this.setting.easySet;
                var fIndex = 0;
                if (easySet.weight && this.isShowTitle && easySet.title.length == easySet.weight.length - 1) {
                    fIndex = 1;
                    i++;
                }
                var style = easySet.style ? easySet.style : {};
                if (easySet.weight && easySet.weight[i] != "") {
                    style.flex = easySet.weight ? easySet.weight[i] : 1;
                }
                if (i == fIndex) {
                    style.textAlign = style.textAlign ? style.textAlign : "left";
                } else {
                    style.textAlign = style.textAlign ? style.textAlign : "right";
                }
                return style;
            },
            /**绘制下拉刷新的图像界面**/
            canvasRefresh()
            {
                var c = document.getElementById("listRrefresh");
                this.ctx = c.getContext("2d");
                /**默认圆**/
                this.ctx.clearRect(0, 0, 200, 24);
                this.ctx.beginPath();
                this.ctx.arc(100, 12, 10, 0, 3 * Math.PI);
                this.ctx.closePath();
                this.ctx.strokeStyle = "#d8d8d8"
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                /**变化的圆圈**/
                this.changeRefresh();
            }
            ,
            /**下拉刷新的图像界面动态变化**/
            changeRefresh()
            {
                this.ctx.beginPath();
                this.ctx.arc(100, 12, 10, -0.5 * Math.PI, ((this.moveY / this.refreshViewHeight) * 2 - 0.5) * Math.PI);
                this.ctx.strokeStyle = "#e50834";
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
            }
            ,
            setOrderBy()
            {
                this.orderBySet = [];
                if (this.setting && this.setting.easySet && this.setting.easySet.orderBy) {
                    for (var i = 0; i < this.setting.easySet.orderBy.length; i++) {
                        for (var k = 0; k < this.setting.easySet.value.length; k++) {
                            for (var j = 0; j < this.setting.easySet.value[k].length; j++) {
                                if (this.setting.easySet.orderBy[i] == this.setting.easySet.value[k][j]) {
                                    this.orderBySet.push({
                                        index: k,
                                        key: this.setting.easySet.orderBy[i],
                                        type: this.orderByType
                                    });
                                }
                            }
                        }
                    }
                }
            }
            ,
            needOrder(item, index)
            {
                for (var i = 0; i < this.orderBySet.length; i++) {
                    if (this.isShowEdit) {
                        if (index == this.orderBySet[i].index + 1) {
                            item.type = this.orderBySet[i].type;
                            item.orderByIndex = i;
                            return true;
                        }
                    } else {
                        if (index == this.orderBySet[i].index) {
                            item.type = this.orderBySet[i].type;
                            item.orderByIndex = i;
                            return true;
                        }
                    }
                }
                return false;
            }
            ,
            /**是否有筛选**/
            hasFilter()
            {
                return this.mSetting.filter && this.mSetting.filter.length ? true : false
            }
            ,
            orderBy(item)
            {
                /**编辑中不可排序**/
                if (this.isShowEdit) {
                    return;
                }
                if (this.orderBySet && this.orderBySet.length) {
                    if (item.type == "down" || item.type == "up") {
                        this.isShowOrder = this.isShowOrder ? false : true;
                        this.$emit('listener', {
                            "type": "orderBy",
                            "data": {
                                index: this.chooseOrderIndex,
                                isShowOrder: this.isShowOrder,
                                chooseOrder: this.chooseOrder
                            }
                        })
                    }
                }
            }
            ,
            /**列表项点击事件**/
            onclick(index)
            {
                /**编辑状态屏蔽点击事件**/
                if (this.isShowEdit) {
                    return;
                }
                this.$emit('listener', {
                    "type": "onclick",
                    "data": this.mSetting.data[index]
                });
            }
            ,
            /**筛选过滤**/
            doFilter(item, index)
            {
                /**回调编辑选中事件**/
                this.$emit('listener', {
                    "type": "filter",
                    "data": {
                        item: item,
                        index: index
                    }
                });
            }
            ,
            setOrderClass(item)
            {
                return item == this.chooseOrder ? "order-item-choosed" : "";
            }
            ,
            isChooedOrder(item)
            {
                return item == this.chooseOrder ? true : false;
            }
            ,
            doOrderBy(item, index)
            {
                if (this.chooseOrder != item) {
                    this.chooseOrder = item;
                    this.chooseOrderIndex = index;
                    this.isShowOrder = false;
                }
                this.$emit('listener', {
                    "type": "orderBy",
                    "data": {
                        index: this.chooseOrderIndex,
                        isShowOrder: this.isShowOrder,
                        chooseOrder: this.chooseOrder
                    }
                })
            }
            ,
            /**排序事件**/
            columnClick(column, index)
            {
                if (column[0].type == "edit-selected") {
                    column[0].type = "edit-unselected";
                    this.choosedData.removeObj(this.mSetting.data[index]);
                } else if (column[0].type == "edit-unselected") {
                    column[0].type = "edit-selected";
                    this.choosedData.push(this.mSetting.data[index]);
                }
                /**回调编辑选中事件**/
                this.$emit('listener', {
                    "type": "selected",
                    "data": this.mSetting.data[index]
                });
            }
            ,
            /**删除事件**/
            editDelete()
            {
                this.$emit('listener', {
                    "type": "edit-delete",
                    "data": this.choosedData
                });
            }
            ,
            /**编辑完成事件**/
            editFinish()
            {
                this.$emit('listener', {
                    "type": "edit-finish",
                    "data": []
                });
            }
        },
        watch: {
            /**根据配置的变化 配置组件**/
            setting: function () {
                this.checkSetting();
            }
        }
        ,
        props: {
            /* 标题 */
            setting: {
                type: Object,
                default: function () {
                    return {
                        data: [],
                        controller: {
                            nextPage: false,
                            refresh: false,
                            edit: false
                        },
                        easySet: {
                            layoutStyle: {},
                            lineStyle: {},
                            titleStyle: {},
                            type: [["default"], ["default"], ["default"]],
                            class: [["dark-14-class"], ["dark-14-class"], ["dark-14-class"]],
                            weight: [1, 1, 1, 1],
                            title: ["", "", ""],
                            value: [["", ""], [""], [""]]
                        }
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    @import "../../common/style/common.less";

    #listLayout {
        display: flex;
        flex-flow: column nowrap;
        height: 100%;
        position: relative;
        .list-refresh-filter {
            margin-top: 38px;
        }
        .list-refresh {
            width: 100%;
            height: 75px;
            text-align: center;
            position: absolute;
            z-index: 1;
            .refresh-canvas {
                padding: 0;
                margin-top: 10px;
            }
            .refresh-title, .refresh-date {
                width: 100%;
                height: auto;
                font-size: 12px;
                color: @gray-color;
            }
        }
        .list-filter {
            display: flex;
            flex-flow: row nowrap;
            height: 38px;
            width: 100%;
            background: @colorful-color;
            padding: 0 4px;
            overflow: scroll;
            z-index: 3;
            .filter-item {
                flex: 1 0 auto;
                height: 100%;
                line-height: 38px;
                color: @white-color;
                padding: 0 12px;
                font-size: 14px;
            }
        }
        .order-main {
            position: absolute;
            top: 40px;
            bottom: 0;
            width: 100%;
            height: auto;
            background: rgba(0, 0, 0, 0.3);
            z-index: 100;
            .order-list {
                width: 100%;
                height: 100%;
                overflow: auto;
                .order-item {
                    display: flex;
                    flex-flow: row nowrap;
                    width: 100%;
                    height: 45px;
                    overflow: hidden;
                    padding: 0 16px;
                    background: @white-color;
                    .order-item-left {
                        flex: 1;
                        width: 100%;
                        height: 45px;
                        line-height: 45px;
                        font-size: 13px;
                        color: @dark-color;
                        text-align: left;
                    }
                    .order-item-choosed {
                        color: @primary-color !important;
                    }
                    .order-item-right {
                        flex: 1;
                        width: 100%;
                        height: 45px;
                        line-height: 45px;
                        font-size: 13px;
                        color: @primary-color;
                        text-align: right;
                    }
                }
            }
        }

        .list-edit {
            display: flex;
            flex-flow: row nowrap;
            position: fixed;
            width: 100%;
            bottom: 0px;
            height: 50px;
            background: @white-color;
            z-index: 4;
            .border-t-1px(@border-color);
            .edit-delete, .edit-finish {
                flex: 1;
                width: 100%;
                height: 100%;
                text-align: center;
                line-height: 50px;
                font-size: 16px;
                color: @primary-color;
            }
            .edit-finish {
                background: @primary-color;
                color: @white-color;
            }
            .edit-finish {
                background: @primary-color;
                color: @white-color;
            }
        }
        .list-main {
            flex: 1;
            display: flex;
            flex-flow: column nowrap;
            width: 100%;
            height: 100%;
            z-index: 2;
            .list-title {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                height: 40px;
                padding: 0 16px;
                font-size: 13px;
                color: @litdark-color;
                background: @white-color;
                .border-b-1px(@border-color);
                .list-title-item {
                    flex: 1;
                    width: 100%;
                    text-align: center;
                    .word-hide();
                    .title-value {
                        width: auto;
                        height: auto;
                    }
                    .value-orderby-up {
                        color: @primary-color;
                    }
                    .icon-orderby-down {
                        .triangle-down();
                    }
                    .icon-orderby-up {
                        .triangle-up(5px, @primary-color);
                    }
                }
            }
            .list-layout {
                flex: 1;
                width: 100%;
                height: 100%;
                overflow: auto;
                background: #ffffff;
                .listLayout-child {
                    display: flex;
                    flex-flow: row nowrap;
                    height: 62px;
                    padding: 0 16px;
                    .border-b-1px(@border-color);
                    .item {
                        display: flex;
                        flex-flow: column nowrap;
                        justify-content: center;
                        flex: 1;
                        width: 100%;
                        height: 100%;
                        text-align: left;
                        overflow: hidden;
                        .item-top {
                            width: 100%;
                            font-size: 16px;
                            .word-hide();
                        }
                        .item-bottom {
                            width: 100%;
                            font-size: 12px;
                            color: @gray-color;
                            margin-top: 3px;
                            .word-hide();
                        }
                        .item-color-up {
                            color: @primary-color !important;
                        }
                        .item-color-down {
                            color: @lose-color !important;
                        }
                        .dark-14-class {
                            color: @dark-color;
                            font-size: 14px;
                        }
                        .dark-16-class {
                            color: @dark-color;
                            font-size: 16px;
                        }
                        .gray-12-class {
                            color: @gray-color;
                            font-size: 12px;
                        }
                        .gray-14-class {
                            color: @gray-color;
                            font-size: 14px;
                        }
                        .edit-unselected {
                            width: 26px;
                            font-size: 18px;
                            color: @litgray-color;
                            text-align: center;
                        }
                        .edit-selected {
                            width: 26px;
                            font-size: 18px;
                            color: @primary-color;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
</style>

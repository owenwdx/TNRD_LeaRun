﻿/* * 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架(http://www.learun.cn)
 * Copyright (c) 2013-2018 上海力软信息技术有限公司
 * 创建人：超级管理员
 * 日  期：2019-02-23 17:26
 * 描  述：项目管理
 */
var selectedRow;
var refreshGirdData;
var bootstrap = function ($, learun) {
    "use strict";
    var startTime;
    var endTime;
    var Name;
    var CapitalSource;
    var ImplementYear;
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {// 时间搜索框 
            laydate.render({
                elem: '#ImplementYear'
                , type: 'year'
            });
            // 时间搜索框 
            $('#datesearch').lrdate({
                dfdata: [
                    //{ name: '今天', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00') }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近1年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -1) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近3年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -3) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } },
                    { name: '近10年', begin: function () { return learun.getDate('yyyy-MM-dd 00:00:00', 'y', -10) }, end: function () { return learun.getDate('yyyy-MM-dd 23:59:59') } }
                ],
                // 月 
                mShow: false,
                premShow: false,
                // 季度 
                jShow: false,
                prejShow: false,
                // 年 
                ysShow: false,
                yxShow: false,
                preyShow: true,
                yShow: true,
                // 默认 
                dfvalue: '0',
                selectfn: function (begin, end) {
                    startTime = begin;
                    endTime = end;
                    //page.search();
                }
            });
            //$('#multiple_condition_query').lrMultipleQuery(function (queryJson) {
            //    page.search(queryJson);
            //}, 220, 400); 
            // 查询
            $('#btn_Search').on('click', function () {
                Name = $('#Name').val();
                CapitalSource = $("#CapitalSource").lrselectGet();
                ImplementYear = $('#ImplementYear').val();
                page.search();
            });
            $('#CapitalSource').lrDataItemSelect({
                code: 'ProjectCapitalSource'
            });
            // 刷新
            $('#lr-replace').on('click', function () {
                location.reload();
            });
            //打印
            $('#lr-print').on('click', function () {
                $("#gridtable").jqprintTable({ title: '项目信息明细表' });
            });
            //导出
            $('#lr-export').on('click', function () {
                learun.download({
                    method: "POST",
                    url: '/Utility/ExportExcel',
                    param: {
                        fileName: "导出项目报表",
                        columnJson: JSON.stringify($('#gridtable').jfGridGet('settingInfo').headData),
                        dataJson: JSON.stringify($('#gridtable').jfGridGet('settingInfo').rowdatas)
                    }
                });
            });
        },
        // 初始化列表
        initGird: function () {
            $("#gridtable").height($(window).height() - 143);
            $('#gridtable').jfGrid({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/GetPageList',
                headData: [
                    { label: "项目编码", name: "Code", width: 100, align: "left" },
                    { label: "项目名称", name: "Name", width: 100, align: "left" },
                    {
                        label: "立项时间", name: "Date", width: 100, align: "left", formatter: function (value, row, index) {
                            return $(this).formatterDate(value);
                        }
                    },
                    //{ label: "建设单位", name: "Company", width: 100, align: "left" },
                    //{ label: "开发商", name: "Developers", width: 100, align: "left" },
                    //{ label: "地址", name: "Address", width: 100, align: "left" },
                    { label: "内部工号", name: "WorkNo", width: 100, align: "left" },
                    { label: "总建筑面积（万平)", name: "CoveredArea", width: 100, align: "left" },
                    //{ label: "供热面积", name: "HeatingArea", width: 100, align: "left" },
                    { label: "户数", name: "Households", width: 100, align: "left" },
                    { label: "总投资", name: "Amount", width: 100, align: "left" },
                    //{ label: "立管长度", name: "PipeLength", width: 100, align: "left" },
                    { label: "实施年份", name: "ImplementYear", width: 100, align: "left" },
                    { label: "立项文号", name: "Titanict", width: 100, align: "left" },
                    { label: "立项总投资(万元)", name: "ProjectInvest", width: 100, align: "left" },
                    { label: "投资批复时间", name: "ApprovalTime", width: 100, align: "left" },
                    { label: "批复文号", name: "ApprovalTitanict", width: 100, align: "left" },
                    { label: "预算评审值", name: "Review", width: 100, align: "left" },
                    { label: "决算值", name: "FinalValue", width: 100, align: "left" },
                    //{ label: "概算", name: "Estimate", width: 100, align: "left" },
                    //{ label: '工程费', name: 'ProjectFee', width: 100, align: "left" },
                    //{ label: '前期费', name: 'AgoFee', width: 100, align: "left" },
                    //{ label: '勘察费', name: 'ProspectFee', width: 100, align: "left" },
                    //{ label: '设计费', name: 'DesignFee', width: 100, align: "left" },
                    //{ label: '监理费', name: 'ControlFee', width: 100, align: "left" },
                    //{ label: '管理费', name: 'ManageFee', width: 100, align: "left" },
                    //{ label: '环评费', name: 'EnvironmentFee', width: 100, align: "left" },
                    //{ label: '安评费', name: 'SafetyFee', width: 100, align: "left" },
                    //{ label: '扬尘防治增加费', name: 'DustFee', width: 100, align: "left" },
                    //{ label: '掘路费', name: 'DiggingFee', width: 100, align: "left" },
                    //{ label: '劳动卫生评价费', name: 'HealthFee', width: 100, align: "left" },
                    //{ label: '预备费', name: 'ReadyFee', width: 100, align: "left" },
                    //{ label: '总管理费', name: 'TotalManageFee', width: 100, align: "left" },
                    //{ label: '其他费用', name: 'OtherFee', width: 100, align: "left" },
                    //{ label: "备注", name: "Remark", width: 100, align: "left" },


                    { label: '局下达资金', name: 'BureauFunds', width: 100, align: "left" },
                    { label: '财政下达资金', name: 'FiscalFunds', width: 100, align: "left" },
                    { label: '合同总金额', name: 'pactSumAmount', width: 100, align: "left" },
                    { label: '总付款金额', name: 'sumPayAmount', width: 100, align: "left" },
                    { label: '未付款金额', name: 'overAmount', width: 100, align: "left" },
                ],
                mainId: 'Id',
                isPage: true,
                reloadSelected: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.StartTime = startTime;
            param.EndTime = endTime;
            param.Name = Name;
            param.ImplementYear = ImplementYear;
            param.CapitalSource = CapitalSource;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}


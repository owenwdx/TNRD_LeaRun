﻿/* * 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架(http://www.learun.cn)
 * Copyright (c) 2013-2018 上海力软信息技术有限公司
 * 创建人：超级管理员
 * 日  期：2019-02-25 14:30
 * 描  述：Wizsen_TNRD_Pact
 */
var acceptClick;

var keyValue = request('keyValue');
var projectId = request('projectId');
var projectName = request('projectName');
var bootstrap = function ($, learun) {
    "use strict";
    var parentWindow = learun.frameTab.parentIframe().document.getElementById("tree");
    //var selectedRow= $(parentWindow).jfGridGet('rowdata');
    var selectedRow = $(parentWindow).lrtreeSet("currentItem");
    var page = {
        init: function () {
            $('.lr-form-wrap').lrscroll();
            page.bind();
            page.initData();
            page.initConfig();
        },
        bind: function () {
            //合同类型
            $("#contractType").lrDataItemSelect({
                code: 'PactType2',
                maxHeight: 230
            });
            //合同确立方式
            $("#PactWay").lrDataItemSelect({
                code: 'TNPactWay',
                maxHeight: 230
            });
            //合同状态
            $("#contractStatus").lrDataItemSelect({
                code: 'TNPactState',
                maxHeight: 230
            });
            //$('#TNRD_Facility_Base').jfGrid({
            //    height: $(window).height() - 480,
            //    headData: [

            //        {
            //            label: '设备分类', name: 'Classify', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '设备编码', name: 'Code', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '设备名称', name: 'Name', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '规格及型号', name: 'Model', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '数量', name: 'Quantity', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '单位', name: 'Unit', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '税率（%）', name: 'Rate', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '出厂单价（元）', name: 'Price', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '每一品目的出厂价（元）（及总价）', name: 'TotalPrice', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '税额（元）', name: 'Tax', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '每一目应缴税费（元）（及总税费）', name: 'TotalTax', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '含税单价（元）', name: 'TaxPrice', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '每一品目的含税价格（元）（及含税总价）', name: 'TotalTaxPrice', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '设备状态', name: 'EquipmentState', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '收货单位', name: 'ReceivingUnit', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '收货地址', name: 'ShippingAddress', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '货物描述', name: 'Description', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '财务组织', name: 'Financial', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '厂家', name: 'Customer', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        },
            //        {
            //            label: '备注', name: 'Remark', width: 100, align: 'left'
            //            , edit: {
            //                type: 'input'
            //            }
            //        }
            //    ],
            //    isEdit: true,
            //    onSelectRow: function (rowdata) {
            //    }
            //});
            $("#lr_close").click(function () {
                learun.frameTab.closeCurrentTab();
            });
            $("#lr_submit").click(function (event, flag) {
                acceptClick(learun.frameTab.closeRefreshTab);
                //$("#status").val(!!flag ? flag : 1);
                //if (!$('body').lrValidform()) {
                //    return false;
                //}
                //var postData = {};
                //postData.strEntity = JSON.stringify($('[data-table="KC_Stockmindoc"]').lrGetFormData());
                //postData.strkC_StockminmatrList = JSON.stringify($('#KC_Stockminmatr').jfGridGet('rowdatas'));
                //$.lrSaveForm(top.$.rootUrl + '/LR_Stock_Manage/StockIn/SaveForm?keyValue=' + keyValue, postData, function (res) {
                //    learun.frameTab.closeRefreshTab();
                //});
            });
            $("#lr_save").click(function () {
                $("#lr_submit").trigger('click', ["0"]);
            });
        },
        initData: function () {
            if (!!keyValue) {
                $.lrSetForm(top.$.rootUrl + '/Wizsen_TNRD_Project/Wizsen_TNRD_Pact/GetFormData?keyValue=' + keyValue, function (data) {
                    for (var id in data) {
                        if (!!data[id].length && data[id].length > 0) {
                            $('#' + id).jfGridSet('refreshdata', data[id]);
                        }
                        else {
                            $('[data-table="' + id + '"]').lrSetFormData(data[id]);
                        }
                    }
                });
            }
            else {
                $('#ProjectNo').val(selectedRow.value);
                $('#ProjectName').val(selectedRow.text);
                $('#BindId').val(selectedRow.id);
            }
        },
        initConfig: function () {
            //$('#ProjectNo').lrselect({
            //    editable:false,
            //    url: '/Common/LoadSelectData',
            //    param: { "sql": " select Code,Name,Company from dbo.TNRD_Project_Datails" },
            //    value: 'Code',
            //    text: 'Code',
            //    title: 'Code',
            //    maxHeight: 99,
            //    placeholder: false,
            //    select: function (item) {
            //        $('#ProjectNo').val(item.Code);
            //        $('#ProjectName').val(item.Name);
            //        //$('#companyCode').val(item.code);
            //    }
            //});
        }
    };
    // 保存数据
    acceptClick = function (callBack) {
        if (!$('body').lrValidform()) {
            return false;
        }
        var postData = {};
        postData.strEntity = JSON.stringify($('[data-table="TNRD_Pact_Datails"]').lrGetFormData());
        //postData.strtNRD_Facility_BaseList = JSON.stringify($('#TNRD_Facility_Base').jfGridGet('rowdatas'));
        $.lrSaveForm(top.$.rootUrl + '/Wizsen_TNRD_Project/Wizsen_TNRD_Pact/SaveForm?keyValue=' + keyValue, postData, function (res) {
            // 保存成功后才回调
            if (!!callBack) {
                callBack();
            }
        });
    };
    page.init();


}

function onAmount() {
    var amount = $("#Amount").val();
    $("#settleMoney").val(amount);
    $("#payableMoney").val(amount);
}

function onSettle() {
    var settleMoney = $("#settleMoney").val();
    $("#payableMoney").val(settleMoney);
}

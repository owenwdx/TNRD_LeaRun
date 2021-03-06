﻿/*
 * 版 本 Learun-ADMS V7.0.0 力软敏捷开发框架(http://www.learun.cn)
 * Copyright (c) 2013-2018 上海力软信息技术有限公司
 * 创建人：力软-前端开发组
 * 日 期：2017.04.18
 * 描 述：新增表单	
 */
var selectedRow;
var keyValue = request('keyValue');
var refreshGirdData;
var bootstrap = function ($, learun) {
    "use strict";

    // 保存数据
    var acceptClick = function (type) {// 0保存并新增 1保存
        if (!$('.lr-layout-wrap').lrValidform()) {
            return false;
        }
        var formData = $('.lr-layout-wrap').lrGetFormData(keyValue);
        var productData = [];
        var productDataTmp = $('#productgird').jfGridGet('rowdatas');

        for (var i = 0, l = productDataTmp.length; i < l; i++) {
            if (!!productDataTmp[i]['F_ProductName']) {
                productData.push(productDataTmp[i]);
            }
        }

        var postData = {
            crmOrderJson: JSON.stringify(formData),
            crmOrderProductJson: JSON.stringify(productData)
        };

        learun.layerConfirm('注：您确认要保存此操作吗？', function (res, index) {
            if (res) {
                $.lrSaveForm(top.$.rootUrl + '/LR_CRMModule/CrmOrder/SaveForm?keyValue=' + keyValue, postData, function (res) {
                    if (res.code == 200) {
                        if (type == 0) {
                            window.location.href = top.$.rootUrl + '/LR_CRMModule/CrmOrder/Form';
                        }
                        else {
                            learun.frameTab.close('order_add');
                        }
                    }
                });
                top.layer.close(index); //再执行关闭  
            }
        });
    };

    var page = {
        init: function () {
            page.bind();
            page.initData();
        },
        bind: function () {
            // 优化滚动条
            $('.lr-layout-wrap').lrscroll();

            // 合同附件
            //$('#F_ContractFile').lrUploader();
            //添加附件
            $('#lr_add').on('click', function () {
                $('#productgird').jfGridSet('nocheck');
                //var keyValue = $('#productgird').jfGridValue('Id');
                //if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'ProjectAdjunct',
                        title: '添加附件',
                        url: top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/Adjunct?keyValue=' + keyValue,
                        width: 700,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    })
                //}
            });
            //编辑附件
            $('#lr_edit').on('click', function () {
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'ProjectAdjunct',
                        title: '编辑附件',
                        url: top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/Adjunct?keyValue=' + keyValue,
                        width: 700,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    })
                }
            });
            //删除附件
            $('#lr_delete').on('click', function () {
                var keyValue = $('#productgird').jfGridValue('Id');
                if (learun.checkrow(keyValue)) {
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/DeleteForm', { keyValue: keyValue }, function (res) {
                                if (res.code == 200) {
                                    refreshGirdData();
                                }
                            });
                        }
                    });
                }
            });
            // 订单产品信息
            $('#productgird').jfGrid({
                url: top.$.rootUrl + '/Wizsen_TNRD_Project/AdjunctDatails/GetList',
                headData: [
                    { label: '附件流程节点', name: 'Process', width: 200, align: "left" },
                    { label: '时间节点', name: 'Process', width: 200, align: "left" },
                    {
                        label: '附件名称', name: 'AdjunctName', width: 200, align: "left",
                        formatter: function (cellvalue, options, rowObject) {
                            return '<a id="FJ" style="color:blue;"  target="_blank" href="' + options.Url + '">' + options.AdjunctName + '</a>';
                        }
                    },
                    { label: '附件路径', name: 'Url', width: 200, align: "left" },
                    { label: '创建日期', name: 'CreateDate', width: 200, align: "left" },
                ],
                isEdit: true,
                height: 450,
                isMultiselect:true
            });
            page.search();
            

            // 关闭
            $('#lr_close').on('click', function () {
                //acceptClick(1);
                learun.frameTab.close(learun.frameTab.iframeId);
            });
        },
        search: function (param) {
            param = { keyword: keyValue } || {};
            $('#productgird').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        },
        initData: function () {
            if (!!keyValue) {
                $.lrSetForm(top.$.rootUrl + '/Wizsen_TNRD_Project/ProjectDatails/GetFormData?keyValue=' + keyValue, function (data) {//
                    $('.lr-layout-wrap').formInitialize(data);
                    $("#Date").html(learun.formatDate(data.Date, 'yyyy-MM'));
                    $("#ApprovalTime").html(learun.formatDate(data.Date, 'yyyy-MM'));
                    $('#productgird').jfGridSet('refreshdata', data.orderProductData);
                });
            }
        }
        //search: function (param) {
        //    param = { keyword: keyValue } || {};
        //    $('#productgird').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        //}
    };
    refreshGirdData = function () {
        page.search();
    };
    page.init();
}
/**
 * Created by Kinnon.Zhang on 2018/3/2.
 * 一些流程控制的方法
 */

require("Waterfall");   // 定义cc.vv.waterfall
const Course = require("Course");

cc.vv = cc.vv || {};

/**
 * 工厂方法：生成Course的实例并执行
 * @param 参考Course的文档
 * */
function course(doThings, callback, isFinished, timeout, debug) {
    var instance;
    if (!callback && !isFinished && timeout === undefined) {
        instance = new Course();
        instance.doSomething(doThings);
        return instance;
    }

    var options = {};
    options.perform = doThings;
    options.callback = callback;
    options.isFinished = isFinished || true;
    options.timeOut = timeout || 18000;
    options.debug = debug || false;

    instance = new Course();
    instance.doSomething(options);
    return instance;
};

/**
 * 满足特定条件后执行某些操作
 * @param doThings: ()=>void , 目标操作
 * @param condition: BOOL || ()=>BOOL, 布尔值或返回布尔值的函数
 *         持续监测的条件，当条件返回true时，停止检测并执行目标操作
 * */
function performUntil(doThings, condition) {
    if (typeof doThings !== "function") return null;

    condition = condition || function () { return true;};
    var instance = course(function () { /** do nothing */ }, doThings, condition);
    return instance;
};

/**
 * 延迟执行目标操作
 * 延迟的时长等于Course中定义的Tick步长（大于帧频时长）
 * 该方法通常用于下一帧之后执行目标操作
 * */
function performDelay(doThings) {
    return cc.vv.performUntil(doThings);
};

cc.vv.course = cc.vv.course || course;
cc.vv.performUntil = cc.vv.performUntil || performUntil;
cc.vv.performDelay = cc.vv.performDelay || performDelay;

module.exports = {
    course: course,
    performUntil: performUntil,
    performDelay: performDelay
};

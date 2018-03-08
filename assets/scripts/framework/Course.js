/**
 * Created by Kinnon.Zhang on 2017/7/25.
 * 抽象概念:"过程"
 *  一个过程有执行阶段，有判断执行结束的条件，有执行的结果
 */

cc.Class({
    extends: cc.Component,

    // //////////////////////////////////////////////////////////////////////////////////////////
    // public interface
    // //////////////////////////////////////////////////////////////////////////////////////////
    /**
     *  @options:
     *  {
     *      perform: ()=>{},
     *      callback: ()=>{},
     *      isFinished: ()=> {return true;}
     *  }
     *
     *  @example:
     *    new Course().doSomething({
     *      perform: function(){
     *          console.log("11111");
     *      },
     *      isFinished: function() {
     *          if (condition) {
     *              return true;
     *          }
     *          return false;
     *      },
     *      callback: function(){
     *          console.log("22222");
     *      },
     *      timeOut: 5000
     *    });
     *
     * */
    doSomething: function(options) {
        if (!options) {
            return;
        }
        var perform = options.perform;
        var isFinished = options.isFinished;
        var callback = options.callback;
        var timeout = options.timeOut;
        var debug = options.debug;
        if (perform) {
            try {
                perform();
            } catch (e) {
                console.log(e);
                if (callback) {
                    callback();
                }
               if (this.tick != undefined) {
                    clearInterval(this.tick);
               }
            }
        }
        if (!isFinished) {
            return;
        }
        var self = this;
        var onTick = function () {
            if (debug) {
                console.log("during course...");
            }

            var curTime = Date.now();
            if (curTime - startTime > timeout) {        // 超时处理
                clearInterval(self.tick);
                if (callback) {
                    console.log("handle course timeout: ", timeout, "ms");
                    callback();
                }
                return;
            }

            if (typeof isFinished == "function" && !isFinished()) {
                return;
            }

            clearInterval(self.tick);
            if (callback) {
                callback();
            }
        };
        var startTime = Date.now();
        this.tick = setInterval(onTick, 50);
    },

    interrupt: function() {
        if (this.tick) {
            clearInterval(this.tick);
        }
    },


    // //////////////////////////////////////////////////////////////////////////////////////////
    // private interface
    // //////////////////////////////////////////////////////////////////////////////////////////
});
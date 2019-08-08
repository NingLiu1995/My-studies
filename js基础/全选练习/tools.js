//obj 执行触发的对象
//speed 移动的速度
//obj1 被操作的对象
//act1 触发方式1
//act2 触发方式2
//attr 移动方向
function move(obj, speed, obj1, act1, act2, attr) {
    obj[act1] = function () {
        obj.timer = setInterval(function () {
            obj1.style[attr] = parseInt(getStyle(obj1, attr)) + speed + "px";
        }, 30);
    };
    obj[act2] = function () {
        clearInterval(obj.timer);
    };
    console.log(obj, speed, obj1, act1, act2, attr);
}

//获取某属性样式
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    }
    else {
        return obj.currentStyle[name];
    }

}

//设置轮播图ul宽度
function carouselcss(objdiv, objul, objimgarr, objli, picwid) {
    if (window.getComputedStyle) {
        objul.style.width = (picwid + 2 * parseInt(getComputedStyle(objli, null)["marginLeft"])) * objimgarr.length + "px";
    }
    else {
        objul.style.width = (picwid + 2 * parseInt(objli.currentStyle["marginLeft"])) * objimgarr.length + "px";
    }
    objul.style.listStyle = "none";
    objul.style.position = "absolute";
    objul.style.left = 0;
    objdiv.style.position = "relative";
}

//设置导航按钮居中(自己想的)
function navdivleftself(outer, navdiv, aarr) {
    var i = parseInt(getStyle(outer, "width"));
    var j = parseInt(getStyle(aarr[0], "width"));
    var k = parseInt(getStyle(aarr[0], "marginLeft")) * 2;
    var inner = (j + k) * aarr.length;
    var s = (i - inner) / 2;
    navdiv.style.left = s + "px";
}

//设置导航按钮居中(简单方法)
function navdivleft(outer, navdiv) {
    var i = outer.offsetWidth;
    var j = navdiv.offsetWidth;
    var s = (i - j) / 2;
    navdiv.style.left = s + "px";
}

//轮播图的轮播移动
/*
    obj  被操纵的对象，这里是ul
    target 执行动画的目标位置
    attr 需要改变被操纵对象的属性，这里是需要操纵ul的left
    speed   定时器每次调用移动的距离(标量)
    callback 回调函数，可在定时调用完执行下一步操作，形成连续的动画
 */
function picmove(obj, speed, target,attr,callback) {
    clearInterval(obj.timer);

    /* speed没有正负，需自己判断
    向右移动时，speed是正数
    向左移动时，speed是负数 */

    //获取元素目前的位置
    var current = parseInt(getStyle(obj, attr));
    speed = current < target ? speed : 0 - speed;

    obj.timer = setInterval(function () {
        var oldValue = parseInt(getStyle(obj, attr));
        var newValue = oldValue + speed;
        //speed值为负数是向左移动
        //向左移动时，需要判断newValue是否小于target，最小到0
        //向右移动时，需要判断newValue是否大于target，最大到target
        newValue = (speed < 0 && newValue < target) || (speed > 0 && newValue > target) ? target : newValue;
        obj.style[attr] = newValue + "px";
        if (newValue == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
    }, 30);
}


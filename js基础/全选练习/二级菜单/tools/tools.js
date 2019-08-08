//定义一个函数，用来向指定元素添加指定的class属性值
function addClass(obj, name) {
    if (!hasClass(obj, name)) {
        if (!obj.className.endsWith(" ")) {
            obj.className += " " + name;
        }
        else {
            obj.className += name;
        }
    }
}

//定义一个函数，用来删除指定元素的class属性值
function removeClass(obj, name) {
    var reg = new RegExp("\\b" + name + "\\b");
    obj.className = obj.className.replace(reg, "");
}

//定义一个函数，判断指定元素是否含有某个类
function hasClass(obj, name) {
    var reg = new RegExp("\\b" + name + "\\b");
    return reg.test(obj.className);
}

/*
    toggleClass用来切换一个类
    有则删除
    没有则添加
 */
function toggleClass(obj, name) {
    // hasClass(obj,name) && removeClass(obj,name);
    // hasClass(obj,name) && addClass(obj,name);
    /* if(hasClass(obj,name))
    {
        removeClass(obj,name);
    }
    else{
        addClass(obj,name);
    } */
    hasClass(obj, name) ? removeClass(obj, name) : addClass(obj, name);
}


function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if(current > target) {
		//此时速度应为负值
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {

		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}

	}, 30);
}
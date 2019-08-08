/* 
    Vue的插件库
 */
(function(){
    //需要向外暴露一个插件对象
    const MyPlugin = {};
    //插件对象必须有一个install()
    MyPlugin.install = function (Vue, options) {
        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function () {
            console.log("vue函数对象的方法myGlobalMethod()");
        }
      
        // 2. 添加全局资源(其实就是注册全局自定义指令)
        Vue.directive('my-directive', function(el,binding){
            el.innerHTML = binding.value.toUpperCase();
        })
      
        // 3. 注入组件选项(当前水平暂时忽略)
        /* Vue.mixin({
          created: function () {
            // 逻辑...
          }
        }) */
      
        // 4. 添加实例方法
        Vue.prototype.$myMethod = function () {
          console.log("这是vue实例对象的方法myMethod()");
        }
        
      }
      //向外暴露
      window.MyPlugin = MyPlugin;
})()
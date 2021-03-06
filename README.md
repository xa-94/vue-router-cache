vue-router-cache
========================================
一个实现原生app前进刷新后退缓存并提供浏览器路由方向、灵活手动管理缓存api的vue-router插件

特性
------------

- 提供浏览器路由方向(forward、back、replace)
- 在知道路由是forward、back、replace的基础上,浏览器进入新页面缓存新页面,浏览器触发后退(back)时自动删除离开页面缓存,从而实现前进刷新后退缓存
- 对累积的页面缓存可能导致的内存泄漏做了保护机制,提供max参数,当页面缓存达到max,会自动把最后方的页面缓存删除
- 提供方便使用的多例模式(类似小程序页面)和手动清除页面缓存的单例模式
- 单例提供管理缓存的api方法,这些方法的参数和vue-router的push方法的参数一致,这样做保证了代码的可读性
- 支持嵌套路由 (嵌套路由请在最里层的router-view包裹router-cache,外层的router-view不要包裹router-cache)

在线案例
------------
- [Base demo](https://kallsave.github.io/vue-router-cache/examples/base/dist/#/main/enter)
- [Demo address](https://github.com/kallsave/vue-router-cache/tree/master/examples/base)

安装
------------
npm install vue-router-cache --save

初始化的配置
-----------
```javascript
import router from './router'
import VueRouterCache from 'vue-router-cache'

Vue.use(VueRouterCache, {
  router: router,
  max: 10,
  // 多例模式
  isSingleMode: false,
  isDebugger: true,
  directionKey: 'direction',
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})
```

```javascript
<template>
  <div class="app">
    <transition
      :name="transitionName"
      :mode="transitionMode"
      :duration="transitionDuration">
      <router-cache>
        <router-view></router-view>
      </router-cache>
    </transition>
  </div>
</template>
```

浏览器路由方向
-----------
```javascript

// 判断浏览器路由方向对相应的方向结合transition做过渡动画
watch: {
  $route: {
    handler(to, from) {
      this.transitionDuration = TRANSITION_DURATION
      if (to.params.direction === 'back') {
        this.transitionName = 'move-left'
        this.transitionMode = ''
      } else if (to.params.direction === 'forward') {
        this.transitionName = 'move-right'
        this.transitionMode = ''
      } else {
        // replace或者第一次进来时
        this.transitionName = ''
        this.transitionMode = ''
      }
    },
  }
}
```

多例模式下,后退的页面总是缓存的,不能手动删除缓存,利用activated钩子更新局部数据
-----------
```javascript
// back的时候如果想更新数据利用activated
export default {
  activated() {
    
  },
}
```

单例模式下,清除页面缓存方法的例子
-----------
```javascript
// 在vue组件实例中清除缓存

// 从详情页修改了数据需要回退到列表页时手动删除列表页的缓存让列表页刷新的例子
export default {
  methods: {
    // 方式1: 用back的方式,推荐
    back() {
      // remove的参数是location,和this.$router.push的参数是一样的
      this.$routerCache.remove({name: 'mainNumberList'})

      // 或者用路径的形式作为参数:
      // this.$routerCache.remove('/main/number-list')

      // 或者用路径的形式作为参数:
      // this.$routerCache.remove({
      //   path: '/main/number-list'
      // })
      
      this.$router.back()
    },
    // 方式2: 用push的方式,但是浏览器会比使用back的方式多出额外的历史记录
    push() {
      // 直接使用push
      this.$router.push({name: 'mainNumberList'})
    },
    // 方式3: 用replace的方式
    replace() {
      // 直接使用replace
      this.$router.replace({name: 'mainNumberList'})
    }
  }
}
```

单例模式下,js文件清除页面缓存方法的例子
-----------
```javascript
// 在js文件中清除缓存
import VueRouterCache from 'vue-router-cache'
// 删除路由名字为mainNumberList的页面缓存
VueRouterCache.routerCache.remove({name: 'mainNumberList'})
```

或者不清除缓存,利用activated钩子更新局部数据,这样代码更好维护
-----------
```javascript
export default {
  activated() {
    
  },
}
```

不希望当前页面走缓存
-----------
```javascript
import VueRouterCache from 'vue-router-cache'

export default {
  beforeRouteEnter(to, from, next) {
    // 注意,一定要在render之前执行skip
    // 推荐在beforeRouteEnter钩子上使用
    VueRouterCache.routerCache.skip()
    next()
  },
}
```

配置说明
-----------
|arg name|type|description|default|necessary|
|:--:|:--:|:----------|:--:|:--:|
|参数名称|参数类型|描述|默认值|必需|
|router|router|vue-router的实例||是|
|max|Number Int|缓存的最大数量,如果超过这个数量,会自动删除最后方的缓存|Infinity|否|
|isSingleMode|Boolean|是否是单例模式|true|否|
|isDebugger|Boolean|开始debugger模式,可以看到系统存在的页面缓存和使用中的页面缓存|false|否|
|directionKey|String|挂载在$route.params[directionKey]上的key名|'direction'|否|
|getHistoryStack|Function|判断浏览器路由方向时,如果需要刷新后仍能有效判断,用于做本地储存|noop|否|
|setHistoryStack|Function|判断浏览器路由方向时,如果需要刷新后仍能有效判断,用于做本地储存|noop|否|


方法说明
-----------
|method name|arg|description|can use in when isSingleMode is false|
|:--:|:--:|:----------|:--:|
|方法名称|参数|描述|多例模式下是否可以使用|
|remove|location|删除参数页面的缓存|否|
|removeBackUntil|location|删除当前页面直到参数页面的缓存(不包括参数页面)|否|
|removeBackInclue|location|删除当前页面一直到参数页面的缓存(包括参数页面)|否|
|removeBackByIndex|number|删除从当前页面开始第n个页面的缓存|是|
|removeExclude|location|删除除了参数页面以外的所有页面的缓存|否|
|removeAll||删除所有页面的缓存|是|
|getStore||查看系统中的页面缓存|是|
|has|location|查看系统中的页面缓存是否有参数页面|否|
|skip||当前页面不走页面缓存,注意最好在beforeRouteEnter钩子上执行|是|

页面重刷后依然想记住页面的前进后退关系的配置
-----------
```javascript
import router from './router'
import VueRouterCache from 'vue-router-cache'

Vue.use(VueRouterCache, {
  router: router,
  // 在配置VueRouterCache的时候使用getHistoryStack和setHistoryStack函数
  // 把历史记录存在本地储存里(由于不同端的本地储存不一样,所以自行选择储存的方式)
  getHistoryStack() {
    const str = window.sessionStorage.getItem('historyStack')
    return JSON.parse(str)
  },
  setHistoryStack(history) {
    const str = JSON.stringify(history)
    window.sessionStorage.setItem('historyStack', str)
  }
})
```

单例模式和多例模式对比
-----------
- 最大的区别是单例模式可以手动删除页面缓存,而多例模式不能手动删除页面缓存而是通过activated来更新局部数据

- 单例模式是指系统中一个路由对应的组件(缓存实例)只存在一个,比如A=>B=>C=>A,系统中只会存在3个缓存实例,所以路由和缓存实例(key)是一一对应的。
- 多例模式是指系统中一个路由对应的组件(缓存实例)可以存在多个,比如A=>B=>C=>A,系统中会存在4个缓存实例,所以路由和缓存实例(key)是一对多的关系。
- 多例模式系统代码好维护。（加载过的页面都有不同的缓存）
- 单例模式系统的性能要高（加载过的同一个页面只会有一个缓存）,有手动清除缓存的api,如果A要回跳C页面需要C页面刷新,可以调用api清除C页面缓存然后back到C页面。也可以直接push到C页面(但是这样浏览器会比执行back多存历史记录)。但是代码会不好维护。


建议
-----------
- 用法虽然多,但是为了代码的可维护性和降低复杂度,建议不要使用手动删除缓存的方式,而是通过activated去更新局部数据,类似小程序的页面模式


这个插件开发是需要关闭webpack热更新
-----------
在开发环境使用这个插件保存代码会出现白屏,这是因为webpack热更新会分析改动代码来决定哪个模块热更新还是重刷,
这需要写webpack的相关loader,一个简单的做法是关闭webpack热更新只使用webpack重刷就正常使用啦
```javascript
// in webpack.dev.conf.js

devServer: {
  ...
  hot: false,
  ...
},

```
更多介绍
------------
[原理解析](https://juejin.im/post/5dccdb4a51882510ce752164)
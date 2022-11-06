// import XtxSkeleton from './xtx-skeleton.vue'
// import XtxCarousel from './xtx-carousel.vue'
// import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
// import XtxBread from './xtx-bread.vue'
// import XtxBreadItem from './xtx-bread-item.vue'

import Message from './Message.js'

const importFn = require.context('./', false, /\.vue$/)

const defineDirective = (app) => {
  // 图片懒加载指令
  app.directive('lazyload', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0.01
      })
      observer.observe(el)
    }
  })
}

export default {
  install (app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
  //   app.component(XtxSkeleton.name, XtxSkeleton)
  //   app.component(XtxCarousel.name, XtxCarousel)
  //   app.component(XtxMore.name, XtxMore)
  //   app.component(XtxBread.name, XtxBread)
  //   app.component(XtxBreadItem.name, XtxBreadItem)
  //   defineDirective(app)
  // }
  // 批量注册全局组件
    importFn.keys().forEach(key => {
    // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component)
    })

    // 定义指令
    defineDirective(app)
    app.config.globalProperties.$message = Message// 原型函数
  }
}

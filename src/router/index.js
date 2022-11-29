import { createRouter, createWebHashHistory } from 'vue-router'
import { h } from 'vue'
import store from '@/store'
import TopCategory from '@/views/category'
import SubCategory from '@/views/category/sub.vue'
const Goods = () => import('@/views/goods/index')
const Login = () => import('@/views/login/index')
const Layout = () => import('@/views/Layout.vue')
const Home = () => import('@/views/home')
const Cart = () => import('@/views/cart')
const PayCheckout = () => import('@/views/member/pay/checkout')
const PayIndex = () => import('@/views/member/pay/index')
const LoginCallback = () => import('@/views/login/callback')

const MemberLayout = () => import('@/views/member/Layout')
const MemberHome = () => import('@/views/member/home')

const MemberOrder = () => import('@/views/member/order')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      },
      { path: '/category/:id', component: TopCategory },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order/',
            component: { render: () => h(<RouterView/>) },
            children: [
              { path: '', component: MemberOrder }
              // { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods },
      { path: '/cart', component: Cart },
      { path: '/member/checkout', component: PayCheckout },
      { path: '/member/pay', component: PayIndex }

    ]
  },
  { path: '/login', component: Login },
  { path: '/login/callback', component: LoginCallback }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const { token } = store.state.user.profile
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router

<template>
  <!-- 头部 -->
  <AppTopnav/>
  <AppHeader/>
  <AppHeaderSticky/>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <!-- 底部内容 -->
  <AppFooter/>
</template>

<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'

import { useStore } from 'vuex'
export default {
  name: 'LayoutTem',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped>

.app-body {
  min-height: 600px;
}
</style>

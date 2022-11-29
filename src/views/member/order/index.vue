<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="tabClick">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        >
        <div class="order-list">
          <div v-if="loading" class="loading"></div>
          <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
          <OrderItem v-for="item in orderList" :key="item.id" :order="item" />
          <XtxPagination @current-change="requestParams.page=$event" :total="total" :current-page="requestParams.page" :page-size="requestParams.pageSize"  />
        </div>
      </XtxTabsPanel>
    </XtxTabs>
  </div>
</template>
<script>
import { ref, reactive, watch } from 'vue'
import { orderStatus } from '@/api/constants'
import { findOrderList } from '@/api/order'
import OrderItem from './components/order-item.vue'
export default {
  name: 'MemberOrderPage',
  components: { OrderItem },
  setup () {
    // 查询订单参数
    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })
    const tabClick = (tab) => {
      // 此时：tab.index 就是订单的状态
      requestParams.orderState = tab.index
      requestParams.page = 1
    }
    const orderList = ref([])
    const total = ref(0)
    const loading = ref(true)
    // watch(requestParams, () => {
    //   findOrderList(requestParams).then(data => {
    //     orderList.value = data.result.items
    //   })
    // }, { immediate: true })
    const activeName = ref('all')
    watch(requestParams, () => {
      loading.value = true
      findOrderList(requestParams).then(data => {
        orderList.value = data.result.items
        total.value = data.result.counts
      })
      loading.value = false
    }, { immediate: true })
    return { activeName, tabClick, orderList, orderStatus, loading, total, requestParams }
  }
}
</script>
<style scoped lang="less">
.order-list {
  background: #fff;
  padding: 20px;
}
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // background: rgba(255,255,255,.9) url(../../../assets/images/loading.gif) no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>

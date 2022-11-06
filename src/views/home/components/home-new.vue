<template>
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <div ref="target" style="position: relative;height: 406px;">
      <Transition name="fade">
        <ul v-if="goods.length" ref="pannel" class="goods-list">
      <!-- <ul class="goods-list"> -->
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton bg="#f0f9f4" v-else />
      </Transition>
    </div>
    </HomePanel>
  <!-- <div ref="target" style="position: relative;height: 426px;" /> -->
</template>
<script>
// import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findNew } from '@/api/home'
// import { useIntersectionObserver } from '@vueuse/core'
import { useLazyData } from '@/hooks'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup () {
    // const goods = ref([])
    // const box = ref(null)
    // findNew().then(data => {
    //   goods.value = data.result
    // })
    const { target, result } = useLazyData(findNew)
    return { goods: result, target }
    // const { stop } = useIntersectionObserver(
    //   box,
    //   ([{ isIntersecting }]) => {
    //     if (isIntersecting) {
    //       stop()
    //       findNew().then(data => {
    //         goods.value = data.result
    //       })
    //     }
    //   }
    // )
    // return { goods, box }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>

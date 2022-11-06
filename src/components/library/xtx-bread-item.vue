<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">
      <slot />
      <i class="iconfont icon-angle-right"></i>
    </RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>

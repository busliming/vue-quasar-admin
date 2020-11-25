<template>
  <div class="panda-table-loading bg-panda-base-dark" style="    opacity: 0.7;" v-if="loading" :style="loading_style">
    <div class="panda-table-loading-main">
      <q-spinner color="panda-text-primary" size="3em" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'table-loading',
  props: {
    loading: {
      default: false
    },
    loading_style: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="stylus" scope>
.panda-table-loading {
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  width calc(100% - 60px)
  height calc( 100% - 150px)
}

.panda-table-loading-main {
  position: absolute;
  left: 50%
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
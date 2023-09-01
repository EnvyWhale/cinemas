<!--
 * @Author: yangxiaosen
 * @Date: 2023-04-10 11:25:03
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-04-10 20:46:04
 * @FilePath: \text\src\components\detail\Detailheader.vue
-->
<template lang="">
    <div class="header">
        <i class="iconfont icon-back" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss" scoped>
    .header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height:40px ;
        line-height: 44px;
        background-color: white;
        text-align: center;
        font-size: 18px;
        i{
            position: fixed;
            left: 10px;

        }
    }
</style>

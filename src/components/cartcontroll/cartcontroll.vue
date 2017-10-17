<template>
  <div class="cartcontroll">
    <div class="cart-decrease" v-show="Food.count>0"></div>
    <div class="cart-number" v-show="Food.count>0">{{Food.count}}</div>
    <div class="cart-add"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      Food: {
        type: Object
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>

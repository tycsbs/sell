<template>
  <div class="cartcontroll">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart"></div>
    <div class="cart-number" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object,
        default () {
          return {
            count: 0
          }
        }
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count > 0) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontroll
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      font-size 24px
      padding 6px
      line-height 24px
      color rgb(0, 160, 220)
    .cart-number
      display inline-block
      font-size 10px
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      font-weight 700
      color rgb(0, 160, 220)
      text-align center
</style>

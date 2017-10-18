<template>
  <div class="cartcontroll">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline" transition="rotate" v-show="food.count>0"></span>
    </div>

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
            count: 2
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
    .cart-decrease
      display inline-block
      padding 6px
      transition all .3s linear
      &.move-transition
        opacity 1
        transform translate3D(0,0,0)
        .inner
          display inline-block
          width 24px
          height 24px
          font-size 24px
          line-height 24px
          color rgb(0, 160, 220)
          transition all .3s linear
          &.rotate-transition
            transform roatate(0deg)
          &.rotate-leave,&.rotate-enter
            transform rotate(180deg)
      &.move-enter,&.move-leave
        opacity 0
        transform translate3D(24px,0,0)
        .inner
          transform roatate(180deg)
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
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

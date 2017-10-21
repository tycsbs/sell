<template>
  <div class="food" v-show="showFlag" transition="move">
    <div class="image-header">
      <img :src="food.image">
      <div class="back" @click="hide">
        <i class="icon-arrow_lift"></i>
      </div>
    </div>
    <div class="content" v-el:food-wrapper>
      <h1 class="title">{{food.name}}</h1>
      <div class="detail">
        <span class="sell-count">月售{{food.sellCount}}份</span>
        <span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontroll :food="food"></cartcontroll>
      </div>
      <div class="buy" transition="fade" @click.stop.prevent="addFirst" v-show="!food.count || food.count===0">
        加入购物车
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontroll from '../../components/cartcontroll/cartcontroll'
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$els.foodWrapper, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide () {
        this.showFlag = false
      },
      addFirst (event) {
        if (!event._constructed) {
          return
        }
        this.$dispatch('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
      }
    },
    components: {
      cartcontroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 3
    width: 100%
    background: #fff
    transition: all 0.2s ease
    &.move-transition
      opacity 1
      transform: translate3d(0, 0, 0)
    &.move-enter, &.move-leave
      opacity 0
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position relative
      padding 18px
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 70
        color rgb(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 14px
        font-size 0
        .sell-count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .sell-count
          margin-right 12px
      .price
        font-weight 700
        line-height 24px
        .now
          margin-right 8px
          font-size 14px
          color rgb(240, 20, 20)
        .old
          text-decoration line-through
          font-size 10px
          color rgb(147, 153, 159)
    .cartcontrol-wrapper
      position absolute
      right 12px
      bottom 12px
    .buy
      position absolute
      right 18px
      bottom 18px
      z-index 10
      line-height 24px
      padding 0 12px
      box-sizing border-box
      font-size 10px
      border-radius 12px
      color #fff
      background rgb(0, 160, 220)
      transition all .2
      &.fade-transition
        opacity 1
      &.fade-enter, &.fade-leave
        opacity 0
</style>

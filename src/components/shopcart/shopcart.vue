<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <span class="icon-shopping_cart"></span>
          </div>
          <span class="num">{{totalCount}}</span>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥22元</div>
      </div>
      <div class="content-right">
        <div class="pay">20元起送</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice () {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount () {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 5
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          vertical-align top
          background #141d27
          .logo
            width 100%
            height 100%
            text-align center
            background #2b343c
            border-radius 50%
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
          .num
            display inline-block
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            font-size 9px
            border-radius 16px
            text-align center
            line-height 16px
            font-weight 700
            background #ff0a22
            box-shadow 0 0 2px rgba(0,0,0,.1)
            color: #fff
        .price
          display inline-block
          vertical-align top
          line-height 24px
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(0, 0, 0, .2)
          font-weight 700
          font-size 16px
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex 0 0 105px
        width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        background #2b333b
        &.not-enough
          background #2b333b
        &.enough
          background: #00b43c
          color: #fff

</style>

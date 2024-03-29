<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
          </div>
          <span class="num" v-show="totalCount>0">{{totalCount}}</span>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass" @click.stop.prevent="pay">{{payDesc}}</div>
      </div>
    </div>
    <div class="ball-container">
      <div class="ball" transition="drop" v-for="ball in balls" v-show="ball.show">
        <div class="inner inner-hook"></div>
      </div>
    </div>
    <div class="food-list" v-show="listShow" transition="fold">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="clear" @click="clearCart">清除</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li class="food" v-for="food in selectFoods">
            <span class="food-name">{{food.name}}</span>
            <div class="food-price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontroll-wrapper">
              <cartcontroll :food="food"></cartcontroll>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="mask" v-show="listShow" transition="fade" @click="hideList"></div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontroll from 'components/cartcontroll/cartcontroll'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            count: 2,
            price: 10
          }]
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
    data () {
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false}
        ],
        dropBalls: [],
        fold: true
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
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$els.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
        return !this.fold
      }
    },
    methods: {
      dropBall (el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i]
          if (!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
            return
          }
        }
      },
      toggleList () {
        if (!this.totalCount) {
          console.log(this.totalCount)
          return
        }
        this.fold = !this.fold
        return this.fold
      },
      clearCart () {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList () {
        this.fold = true
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return
        }
        return window.alert(`已支付${this.totalPrice}元`)
      }
    },
    transitions: {
      drop: {
        beforeEnter (el) {
          let count = this.balls.length
          while (count--) {
            let ball = this.balls[count]
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect()
              let x = rect.left - 32
              let y = -(window.innerHeight - rect.top - 22)
              el.style.display = ''
              el.style.webkitTransform = `translate3d(0,${y}px,0)`
              el.style.transform = `translate3d(0,${y}px,0)`
              let inner = el.querySelector('.inner-hook')
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`
              inner.style.transform = `translate3d(${x}px,0,0)`
            }
          }
        },
        enter (el) {
//          /*eslint no-unused-vars: "error"*/
          el.offsetHeight
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)'
            el.style.transform = 'translate3d(0,0,0)'
            let inner = el.querySelector('.inner-hook')
            inner.style.webkitTransform = 'translate3d(0,0,0)'
            inner.style.transform = 'translate3d(0,0,0)'
          })
        },
        afterEnter (el) {
          let ball = this.dropBalls.shift()
          if (ball) {
            ball.show = false
            el.style.display = 'none'
          }
        }
      }
    },
    components: {
      cartcontroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
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
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              line-height 44px
              color #80858a
              &.highlight
                color #fff
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
            box-shadow 0 0 2px rgba(0, 0, 0, .1)
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
          margin: 6px 0 0 12px
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
        &.not-enough
          background #2b333b
        &.enough
          background: #00b43c
          color: #fff

    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 100
        &.drop-transition
          transition all .4s cubic-bezier(.49, -.29, .75, .41)
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all .4s linear
    .food-list
      position absolute
      width 100%
      top 0
      left 0
      z-index -1
      font-size 0
      transition all .4s
      &.fold-transition
        transform translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave
        transform translate3d(0, 0, 0)
      .list-header
        height 40px
        line-height 40px
        font-size 12px
        border-bottom 1px solid rgba(7, 17, 27, .1)
        background #f3f5f7
        .title
          float left
          padding 0 18px
        .clear
          float right
          padding 0 18px
          color rgb(0, 160, 220)
      .list-content
        font-size 12px
        padding 0 18px
        max-height 217px
        overflow hidden
        background #fff
        .food
          position relative
          list-style none
          padding 12px 0
          box-sizing border-box
          border-1px(rgba(7, 17, 27, .1))
          .food-name
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
          .food-price
            position absolute
            right 90px
            bottom 12px
            color rgb(240, 20, 20)
            line-height 24px
            font-weight 700
          .cartcontroll-wrapper
            position absolute
            right 0
            bottom 6px


  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 3
    filter blur(20px)
    backdrop-filter blur(30px)
    transition all .3s linear
    &.fade-transition
      opacity 1
      background rgba(7,17,27,.5)
    &.fade-enter,&.fade-leave
      opacity 0
      background gbga(7,17,27,0)


</style>

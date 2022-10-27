<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}"
            @click="selectMenu($index,$event)">
          <span class="text"><span class="icon" v-if="item.type>0"
                                   :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="menu-content" v-el:menu-content>
      <ul>
        <li class="food-list food-list-hook" v-for="item in goods">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="old">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontroll-wrapper">
                  <cartcontroll :food="food"></cartcontroll>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart v-ref:shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food :food="clickSelectFood" v-ref:food></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import shopcart from 'components/shopcart/shopcart'
  import cartcontroll from 'components/cartcontroll/cartcontroll'
  import food from 'components/food/food'
  import { getGoods } from '../../common/js/mock'
  // const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        clickSelectFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      const _goods = getGoods()
      this.goods = _goods
      this.$nextTick(() => {
        this._initScroll()
        this._calcHeight()
      })
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((response) => {
        console.log(response)
      })
    },
    methods: {
      selectMenu (index, event) {
        if (!event._constructed) return
        let el = this.$els.menuContent.getElementsByClassName('food-list-hook')[index]
        this.foodScroll.scrollToElement(el, 300)
      },
      _initScroll () {
        this.menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true
        })
        this.foodScroll = new BScroll(this.$els.menuContent, {
          probeType: 3,
          click: true
        })
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
        })
      },
      _calcHeight () {
        let foodlist = this.$els.menuContent.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _dropBall (target) {
        this.$nextTick(() => {
          this.$refs.shopcart.dropBall(target)
        })
      },
      selectFood (food, event) {
        if (!event._constructed) {
          return
        }
        this.clickSelectFood = food
        this.$refs.food.show()
      }
    },
    components: {
      shopcart,
      cartcontroll,
      food
    },
    'events': {
      'cart.add' (target) {
        this._dropBall(target)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    width: 100vw
    display: flex
    position: absolute
    top: 174px
    bottom: 64px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      height: 100%
      background: #f3f5f7
      .menu-item
        display: table
        width: 65px
        height: 54px
        line-height: 14px
        font-size: 0
        padding-left: 8px
        padding-right: 5px
        &.current
          position: relative
          z-index: 50
          background: #fff
          color: #0f870d
          font-width: 700
        .icon
          display: inline-block
          width: 12px
          height: 12px
          margin-right: 2px
          background-size 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-img('decrease_3')
          &.discount
            bg-img('discount_3')
          &.guarantee
            bg-img('guarantee_3')
          &.special
            bg-img('special_3')
          &.invoice
            bg-img('invoice_3')
        .text
          font-size: 12px
          display: table-cell
          width: 54px
          vertical-align: middle
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .menu-content
      flex: 1
      height: 100%
      .title
        padding-left: 14px
        border-left: 2px solid #d9dde1
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border: none
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          position relative;
          .name
            margin: 2px 0 8px
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            margin-bottom: 8px
          .extra
            font-size: 10px
            line-height: 12px
            color: rgb(147, 153, 159)
            & > .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 10px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontroll-wrapper
            position absolute
            right 0
            bottom -12px
</style>

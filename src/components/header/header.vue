<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟到达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}} 个</span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon"></i>
    </div>
    <div class="background"><img :src="seller.avatar" width="100%" height="100%"></div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <div class="name">
            {{seller.name}}
          </div>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        close
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        detailShow: false
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail () {
        this.detailShow = true
      },
      hideDetail () {
        this.detailShow = false
      }
    },
    components: {
      star: star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    background: rgba(0, 0, 0, 0.2)
    color: #fff
    position: relative;
    overflow: hidden
    .content-wrapper
      position: relative;
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        display: inline-block
        img
          border-radius: 4px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        vertical-align: top
        .title
          margin: 2px 0 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            bg-img('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            font-size: 16px
            margin-left: 6px
            line-height: 18px
            font-weight: 700
        .description
          font-size: 12px
          line-height: 12px
          margin-bottom: 10px
        .support
          font-size: 10px
          line-height: 12px
          .icon
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            background-size 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-img('decrease_1')
            &.discount
              bg-img('discount_1')
            &.guarantee
              bg-img('guarantee_1')
            &.special
              bg-img('special_1')
            &.invoice
              bg-img('invoice_1')

          .text
            font-size: 10px
            line-height: 12px
            vertical-align: top
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 8px
        height 18px
        line-height: 18px
        -webkit-border-radius: 4px
        -moz-border-radius: 4px
        border-radius: 14px
        background: rgba(0, 0, 0, 0.2)
        text-align: center
        .count
          font-size: 10px
    .bulletin-wrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background: rgba(7, 17, 27, 0.2)
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        vertical-align: top
        margin-top: 8px
        bg-img('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        font-size: 10px
        vertical-align: top
        margin: 0 4px;
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      position: fixed
      z-index: 99
      top: 0
      left: 0
      width: 100vw
      height: 100vh
      transition: all .4s
      &.fade-transition
        opacity:1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter,&.fade-leave
        opacity:0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        width: 100vw
        min-height: 100vh
        .detail-main
          margin-top: 64px
          padding-bottom 64px
          .name
            line-height: 18px
            height: 18px
            font-weight: 700
            text-align: center
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            width: 80vw
            display: flex
            margin:28px auto 24px
            .line
              flex: 1
              position: relative
              border-bottom: 1px solid rgba(255,255,255,0.2)
              top: -6px
            .text
              font-size: 12px
              line-height: 14px
              padding: 0 12px
              font-weight: 700
          .supports
            width: 80vw
            margin: 0 auto
            .supports-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin:0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-img('decrease_2')
                &.discount
                  bg-img('discount_2')
                &.guarantee
                  bg-img('guarantee_2')
                &.special
                  bg-img('special_2')
                &.invoice
                  bg-img('invoice_2')
              .text
                line-height: 12px
                font-size: 12px
          .bulletin
            width: 80vw
            margin: 0 auto
            .content
              padding: 0 12px
              line-height: 24px
              font-size: 12px
              text-align: justify
      .detail-close
        position: relative
        width: 64px
        height: 32px
        margin: -64px auto 0
        padding-bottom: 32px
        line-height: 32px
        text-align: center
        clear: both
</style>

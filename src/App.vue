<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>

    <router-view :seller="seller" keep-alive></router-view>
    <div class="footer-beian">
      <a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022027412号-1</a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {urlParam} from './common/js/utils'
  import Header from './components/header/header'
  const ERR_OK = 0
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParam()
            return queryParam.id || 'bs123'
          })()
        }
      }
    },
    created () {
      this.$http.get('/api/seller' + '?id=' + this.seller.id).then(function (response) {
        response = response.body
        if (response.erron === ERR_OK) {
          this.seller = Object.assign({}, response.data, this.seller)
        }
      })
    },
    components: {
      'v-header': Header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        text-decoration: none
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)

  .footer-beian
    width: 100%
    height: 20px
    position: fixed
    z-index: 10
    bottom: 0
    left: 0
    text-align: center
    font-size: 12px
    a
      color: #056ed7
      text-decoration: none
</style>

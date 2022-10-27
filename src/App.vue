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
  </div>
</template>
<script type="text/ecmascript-6">
  import {urlParam} from './common/js/utils'
  import Header from './components/header/header'
  import { getSeller } from './common/js/mock'
  // const ERR_OK = 0
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
      const _seller = getSeller()
      this.seller = Object.assign({}, _seller, this.seller)
      this.$http.get('/api/seller' + '?id=' + this.seller.id).then(function (response) {
        console.log(response)
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
</style>

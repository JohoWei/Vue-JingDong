<template>
  <div class="shop">
    <img :src="item.imgUrl" alt="" class="shop__img">
    <div class="shop__info" :class="{'shop__info--bordered': hideBorder ? false : true}">
      <div class="shop__info__title">{{shopName}}</div>
      <div class="shop__info__tags">
        <span class="shop__info__tag">月售:{{item.sales}}件</span>
        <span class="shop__info__tag">起送:{{item.expressLimit}}￥</span>
        <span class="shop__info__tag">基础运费:{{item.expressPrice}}￥</span>
      </div>
      <div class="shop__info__desc">{{item.slogan}}</div>
    </div>
  </div>
</template>

<script>
import { useCommonCartEffect } from '../effects/CartEffect'
import { useRoute } from 'vue-router'

const useShopNameEffect = () => {
    const route = useRoute()
    const shopId = route.params.id
    const { cartList } = useCommonCartEffect(shopId)
    let shopName = ''
    if (cartList){
      for (const i in cartList){
         shopName = cartList[i].shopName
    }
    }
    return { cartList, shopName }
}
export default {
  name:'ShopInfo',
  props:['item', 'hideBorder'],
  setup() {
    const { cartList, shopName } = useShopNameEffect()
    return { cartList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop{
  display: flex;
  padding-top: .12rem;
  &__img{
    display: block;
    width: 0.56rem;
    height: 0.56rem;
    margin-right: .16rem;
  }
  &__info{
    flex: 1;
    font-size: .13rem;
    color: #333;
    &--bordered{
      border-bottom: .01rem solid $content-bgColor;
    }
    &__title{
      font-size: .16rem;
      margin-bottom: .08rem;
    }
    &__tags{
      margin-bottom: .08rem;
      line-height: .18rem;
    }
    &__tag{
      margin-right: .16rem;
    }
    &__desc{
      color: #E93B3B ;
      line-height: .18rem;
      margin-bottom: .12rem;
    }
  }
}
</style>

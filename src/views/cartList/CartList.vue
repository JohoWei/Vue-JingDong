<template>
<div class="title">我的购物车({{cartData.total}})</div>
  <div class="wrapper">

    <div class="products__wrapper">
      <div class="empty" v-if="cartListWithProducts.length === 0">购物车当前为空</div>
      <div class="products" v-for="(item,index) in cartListWithProducts" :key="index">
          <h3 class="products__title">{{item.shopName}}</h3>
          <div class="products__list">
            <template v-for="innerItem in item.productList" :key="innerItem._id">
            <div class="products__item" v-if="innerItem.count > 0">
              <img class="products__item__img" :src="innerItem.imgUrl"/>
              <div class="products__item__details">
                <h4 class="products__item__title">{{innerItem.name}}</h4>
                <p class="products__item__price">
                  <span class="products__item__singal">
                    <span class="products__item__yen">&yen;{{innerItem.price}} x {{innerItem.count}}</span>
                  </span>
                  <span class="products__item__total">
                    <span class="products__item__yen">&yen;{{(innerItem.price * innerItem.count).toFixed(2)}}</span>
                  </span>
                </p>
              </div>
              </div>
              </template>
          </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="1"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
import { useCommonCartEffect } from '../../effects/CartEffect'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const useCartListEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const { cartList } = useCommonCartEffect(shopId)
  const cartData = computed(() => { // 计算购物车总数/总价
    const result = { total: 0 }
    if (cartList) {
      for (const shopId in cartList) {
        // console.log(cartList[shopId].productList)
        for (const key in cartList[shopId].productList) {
          const productInfo = cartList[shopId].productList[key]
          // console.log(productInfo)
          result.total += productInfo.count // 计算购物车总数量
        }
      }
    }
    return result
  })

  const cartListWithProducts = computed(() => {
    const newCartList = {}
    for (const shopId in cartList){
      let total = 0
      const products = cartList[shopId].productList
      for (const productId in products){
        const product = products[productId]
        total += (product.count || 0)
      }
      if (total > 0){
        newCartList[shopId] = cartList[shopId]
      }
    }
    return newCartList
  })
  return { cartListWithProducts, cartList, cartData }
}
export default {
  name:'CartList',
  components:{ Docker },
  setup() {
    const { cartListWithProducts, cartList, cartData } = useCartListEffect()
    return { cartListWithProducts, cartList, cartData }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.wrapper {
    position: absolute;
    left: 0;
    top: 0.5rem;
    bottom: .5rem;
    right: 0;
    padding: 0 .18rem;
    overflow: scroll;
    background: $dark-bgColor;
}
.title{
  line-height: .44rem;
  font-size: .16rem;
  text-align: center;
  background: $bgColor;
}

.products__wrapper{
  overflow-y: scroll;
  position: absolute;
  top: 0.1rem;
  right: .18rem;
  bottom: .1rem;
  left: .18rem;
  background: $bgColor;
}

.empty {
  line-height: .44rem;
  color: $light-fontColor;
  font-size: .16rem;
  text-align: center;
}

.products{
  &__list{
    background: $bgColor;
  }
  &__title{
    line-height: .22rem;
    font-size: .16rem;
    padding: .16rem;
    color: $content-fontcolor;
    font-weight: normal;
    margin: 0;
  }
  &__item{
    position: relative;
    display: flex;
    padding:0 .16rem;
    font-size: .14rem;
    &__img{
      width: 0.46rem;
      height: 0.46rem;
      margin-right: .16rem;
    }
    &__details{
      flex: 1;
    }
    &__title{
      line-height: .2rem;
      margin: 0;
      @include ellipsis;
    }
    &__price{
      display: flex;
      margin-top: 0.06rem;
      line-height: .2rem;
      color: $hightlight-fontColor;
    }
    &__singal{
      width: .8rem;
      color: $hightlight-fontColor ;
    }
    &__total{
      flex: 1;
      text-align: right;
      color: #000000 ;
    }
    &__yen{
      font-size: .14rem;
    }
  }
}
</style>

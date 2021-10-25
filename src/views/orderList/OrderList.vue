<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in cartList" :key="index">
        <div class="order__title">
          <span class="order__title__shopName">{{item.shopName}}</span>
          <span class="order__title__status">{{item.isCanceled ? '已取消' : '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem,innerIndex) in item.productList" :key="innerIndex">
              <img :src="innerItem.imgUrl" alt="" class="order__content__img"  v-if="innerIndex <= 4" />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen;{{cartData.price}}</div>
            <div class="order__content__count">共{{cartData.total}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2"/>
</template>

<script>
import Docker from '../../components/Docker.vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/CartEffect'
import { computed } from 'vue'

// 处理订单列表逻辑
// 疑问：如何分别计算两家商铺的商品总价
const useOrderListEffect = () => {
  const route = useRoute()
  const shopId = route.params.id
  const { cartList } = useCommonCartEffect(shopId)
  const cartData = computed(() => { // 计算购物车总数/总价
    const result = { total: 0, price: 0 }
    if (cartList) {
      for (const shopId in cartList) {
        // console.log(cartList[shopId].productList)
        for (const key in cartList[shopId].productList) {
          const productInfo = cartList[shopId].productList[key]
          // console.log(productInfo)
          result.total += productInfo.count // 计算购物车总数量
          result.price += productInfo.count * productInfo.price // 计算购物车总价
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartData, cartList }
}

export default {
  name:'OrderList',
  components:{ Docker },
  setup() {
    const { cartData, cartList } = useOrderListEffect()
    return { cartData, cartList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  background: $dark-bgColor;
}
.title{
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontcolor;
  text-align: center;
}
.order{
  margin: .16rem .18rem;
  background: $bgColor;
  padding: .16rem;
  &__title{
    display: flex;
    &__shopName{
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__status{
      flex: 1;
      font-size: .14rem;
      color: $light-fontColor;
      text-align: right;
    }
  }
  &__content{
    display: flex;
    margin-top: .16rem;
    &__imgs{
      flex: 1;
    }
    &__img{
      width: 0.4rem;
      height: 0.4rem;
      margin-right: .12rem;
    }
    &__info{
      width: 0.7rem;
      text-align: right;
    }
    &__price{
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &__count{
      font-size: .12rem;
      line-height: .14rem;
      color: $content-fontcolor;
      margin-top: .04rem;
    }
  }
}
</style>

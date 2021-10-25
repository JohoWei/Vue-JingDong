<template>
<div>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleShowCart"></div>
  <div class="Cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <!-- 头部 -->
        <div class="product__header__all">
          <div class="product__header__icon iconfont" v-html="calculations.allchecked ? '&#xe63b;' : '&#xe63a;'" @click="() => setCartItemsChecked(shopId)"></div>
          <span>全选</span>
        </div>

        <div class="product__header__clear" >
          <span @click="() => cleanCartProducts(shopId)">清空购物车</span>
        </div>
      </div>

      <!-- 商品栏 -->
      <template v-for="item in productList" :key="item._id">
        <div class="product__item" v-if="item.count > 0">
            <div class="product__item__checked iconfont"
            v-html="item.check ? '&#xe63b;' : '&#xe63a;'"
            @click="() => changeCartItemChecked(shopId, item._id)"></div>
          <img :src="item.imgUrl" alt="" class="product__item__img">
          <div class="product__item__info">
            <div class="title">{{item.name}}</div>
            <p class="price">
              <span class="price__now">&yen;{{item.price}}</span>
              <span class="price__origin">&yen;{{item.oldPrice}}</span>
            </p>
          </div>
          <div class="product__item__number">
            <span class="reduce iconfont" @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">&#xe650;</span>
            <span class="num">{{item.count || 0}}</span>
            <span class="add iconfont" @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">&#xe7ba;</span>
          </div>
        </div>
      </template>
    </div>

    <!-- 计算 -->
    <div class="check">
      <div class="check__basket">
        <div class="check__basket__icon iconfont" @click="handleShowCart">&#xe60e;</div>
        <div class="check__basket__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总结: <span class="check__info__price">&yen;{{calculations.price}}</span>
      </div>
      <div class="check__btn"><router-link :to="{path:`/OrderConfirmation/${shopId}`}">去结算</router-link></div>
    </div>
  </div>
</div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/CartEffect'
import { useStore } from 'vuex'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const { productList, calculations, changeCartItemInfo } = useCommonCartEffect(shopId)
  const store = useStore()

  // 商品选中
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }
  // 全选
  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  return { productList, calculations, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked }
}

// 蒙层逻辑
const toggleCartEffect = () => {
      const showCart = ref(false)
      const handleShowCart = () => {
        showCart.value = !showCart.value
      }
      return { showCart, handleShowCart }
    }

export default {
  name:'Cart',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleShowCart } = toggleCartEffect()
    const { calculations, productList, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked } = useCartEffect(shopId)
    return { showCart, shopId, handleShowCart, productList, calculations, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemsChecked }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.mask{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 1;
}
.Cart{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: $bgColor;
}

.product{
  &__header{
    height: 0.52rem;
    line-height: .52rem;
    display: flex;
    font-size: .14rem;
    border-bottom: .01rem solid $content-bgColor;
  &__all{
     width: 0.55rem;
     margin-left: .18rem;
     display: flex;
    }
  &__icon{
       font-size: .2rem;
       color: $btn-bgColor;
       flex: 1;
    }
  &__clear{
      flex: 1;
      text-align: right;
      margin-right: .18rem;
    }
  }
  &__item{
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    line-height: .5rem;
    border-bottom: .01rem solid $content-bgColor;
    position: relative;
    &__checked{
      font-size: .2rem;
      color: $btn-bgColor;
      margin-right: .18rem;
    }
    &__img{
      display: block;
      width: 0.46rem;
      height: 0.46rem;
      margin-right: .16rem;
    }
    &__info{
      font-size: .14rem;
    }
    &__number{
      flex: 1;
      position: absolute;
      right: 0;
      bottom: .12rem;
      line-height: .18rem;
      display: flex;
      align-items: center;
    }
  }
}
.title{
  font-weight: 700;
  margin-bottom: .06rem;
  margin: 0;
  line-height: .2rem;
  font-size: .14rem;
  color: $content-fontcolor;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.price{
  color: $hightlight-fontColor;
  line-height: .14rem;
  margin: .06rem 0 0 0;
  &__now{
    margin-right: .12rem;
  }
  &__origin{
    font-size: .12rem;
    color: $light-fontColor;
    text-decoration: line-through;
  }
}

.add{
  font-size: .2rem;
  color: $btn-bgColor;
}

.reduce{
  font-size: .2rem;
  color: $medium-fontColor;
}

.num{
  width: 0.2rem;
  text-align: center;
  font-size: .16rem;
}

.check{
  display: flex;
  height: 0.49rem;
  line-height: .49rem;
  &__basket{
    width: 0.52rem;
    margin-left: .24rem;
    &__icon{
      font-size: .3rem;
      color: $btn-bgColor;
    }
    &__tag{
      position: fixed;
      left:.48rem;
      bottom: .3rem;
      padding: 0 .04rem;
      width: 0.2rem;
      height: 0.2rem;
      line-height: .2rem;
      font-size: .12rem;
      transform: scale(.5);
      transform-origin: left center;
      background:$hightlight-fontColor;
      text-align: center;
      border-radius: 50%;
      color: $bgColor;

    }
  }
  &__info{
    flex: 1;
    font-size: .12rem;
    color: $content-fontcolor;
    &__price{
     font-size: .18rem;
     color: $hightlight-fontColor;
     line-height: .5rem;
     margin-left: .08rem;
    }
  }
  &__btn{
    width: 0.98rem;
    background: $btn-bgColor;
    color: $bgColor;
    text-align: center;
    font-size: .14rem;
    a{
      color: $bgColor;
      text-decoration: none;
    }
}
}
</style>

<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__wrapper">
      <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id">
          <img :src="item.imgUrl" alt="" class="products__item__img">
          <div class="products__item__detail">
            <h4 class="products__item__title">{{item.name}}</h4>
            <p class="products__item__price">
              <span class="products__item__yen">&yen;{{item.price}} x {{item.count}} </span>
              <span class="products__item__total">
                <span class="products__item__yen">&yen;{{(item.price * item.count).toFixed(2)}}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/CartEffect'
export default {
  name:'ProductList',
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import '../../style/viriables.scss';
.products{
  margin: .16rem .18rem 0 .18rem;
  background: $bgColor;
  border-radius: .04rem;
  border-radius: .04rem;
  &__title{
    padding: .16rem;
    font-size: .16rem;
  }
  &__wrapper{
    overflow-y: scroll;
    position: fixed;
    top: 2.56rem;
    left: 0;
    right: 0;
    bottom: .6rem;
    margin: 0 .18rem;
  }
  &__list{
    background: $bgColor;
  }
  &__item{
    display: flex;
    padding: .16rem;
    &__img{
      display: block;
      width: 0.46rem;
      height: 0.46rem;
      margin-right: .16rem;
    }
    &__detail{
      flex: 1;
    }
    &__title{
      margin: 0;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
      line-height: .2rem;
    }
    &__price{
      margin: .06rem 0 0 0;
      line-height: .14rem;
      font-size: .14rem;
      display: flex;
      color: $hightlight-fontColor;
    }
    &__total{
      flex: 1;
      text-align: right;
    }
  }
}
</style>

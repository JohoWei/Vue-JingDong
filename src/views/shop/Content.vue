<template>
  <div class="content">
    <div class="category">
      <div
        :class="{'category__item':true,'category__item--active': currentTab === item.tab}"
        v-for="item in categroies"
        :key="item.tab"
        @click="() => handleTabClick(item.tab)"
        >{{item.name}}</div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img :src="item.imgUrl" alt="" class="product__item__img">
        <div class="product__item__info">
          <div class="title">{{item.name}}</div>
          <div class="sales">月售{{item.sales}}件</div>
          <p class="price">
            <span class="price__now">&yen;{{item.price}}</span>
            <span class="price__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__item__number">
          <span class="reduce iconfont" @click="() => { changeCartItem(shopId, item._id, item, -1,shopName) }">&#xe650;</span>
          <span class="num">{{getProductCartCount(shopId, item._id)}}</span>
          <span class="add iconfont" @click="() => { changeCartItem(shopId, item._id, item, 1,shopName) }">&#xe7ba;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/CartEffect'

const categroies = [
  { name:'全部商品', tab:'all' },
  { name:'秒杀', tab:'seckill' },
  { name:'新鲜水果', tab:'fruit' }
]

// 左侧列表点击背景色样式
const useTabEffect = () => {
  // 设置默认
  const currentTab = ref(categroies[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}

// 获取商品列表:定义一个空数组，将MOCK数据赋值给空数组，返回出去并循坏展示
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list:[] })
  const getContentData = async () => {
    // url格式：/api/shop/:id/product?tab=all
    const result = await get(`/api/shop/${shopId}/products`, {
      tab:currentTab.value
    })
    if (result?.errno === 0 && result?.data?.length){
      content.list = result.data
    }
  }
  watchEffect(() => { getContentData() })
  const { list } = toRefs(content)
  return { list }
}

// 购物车逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()

  // 商品加减
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  // 获取商铺名称
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  // 得到商品数量
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}
export default {
  name:'Content',
  props:['shopName'],
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    return { categroies, currentTab, shopId, list, cartList, handleTabClick, changeCartItem, getProductCartCount }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.content{
  padding-top:.12rem;
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: .5rem;
  display: flex;
}

.category{
  width: 0.76rem;
  height: 100%;
  background: $search-bgColor;
  border-radius: .02rem;
  border-radius: .02rem;
  &__item{
    height: 0.4rem;
    font-size: .14rem;
    text-align: center;
    line-height: .4rem;
    &--active{
     background: $bgColor;
    }
  }
}

.product{
  flex: 1;
  overflow-y:hidden;
  &__item{
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    position: relative;
    &__img{
      display: block;
      width: 0.68rem;
      height: 0.68rem;
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
}
.sales{
  font-size: .12rem;
  line-height: .16rem;
  margin-bottom: .06rem;
}
.price{
  color: $hightlight-fontColor;
  line-height: .14rem;
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
</style>

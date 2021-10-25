<template>
  <div class="wrapper">
    <div class="search">
      <div class="search__back iconfont" @click="handleBackClick">&#xe606;</div>
      <div class="search__content">
        <div class="search__content__icon iconfont">&#xe69a;</div>
        <input type="text" class="search__content__input" placeholder="请输入商品名称搜索">
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl"/>
    <Content :shopName='item.name' />
    <Cart />
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from '../shop/Content.vue'
import Cart from '../shop/Cart.vue'

// 获取商铺信息
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item:{} })
  const getDataItem = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data){
      data.item = result.data
    }
  }
  const { item } = toRefs(data)
  return { item, getDataItem }
}

// 返回逻辑
const useBackEffect = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}

export default {
  name:'Shop',
  components:{ ShopInfo, Content, Cart },
  setup() {
    const { item, getDataItem } = useShopInfoEffect()
    getDataItem()
    const { handleBackClick } = useBackEffect()
    return { item, getDataItem, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper{
  margin: 0 .18rem;
}

.search{
  display: flex;
  line-height: .32rem;
  padding: .14rem 0 .12rem 0;
  &__back{
    font-size: .2rem;
    color: $icon-color;
    margin-right: .1rem;
  }
  &__content{
    flex: 1;
    display: flex;
    background: $search-bgColor;
    border-radius: .16rem;
    border-radius: .16rem;
    text-align: center;
    &__icon{
      font-size: .16rem;
      padding:0 .16rem 0 .12rem ;
      color: $icon-color;
    }
    &__input{
      width: 100%;
      outline: none;
      background: transparent;
      border: none;
      font-size: .14rem;
      color: $content-fontcolor;
    }
  }
}
</style>

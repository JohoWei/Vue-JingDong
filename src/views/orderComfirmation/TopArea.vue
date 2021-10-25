<template>
 <div class="top">
   <div class="top__header">
     <div class="top__header__back iconfont" @click="handleBackClick" v-if="address">&#xe606;</div>

     <div class="top__header__title">确认订单</div>
   </div>
   <div class="top__receiver">
    <div class="info" v-if="address">
      <!-- 因为渲染时，address还不存在，为空，那么获取他地址里的属性自然是报错，所以先给个v-if，如果获取不到就不加载 -->
      <div class="top__receiver__title">收货地址</div>
      <div class="top__receiver__address">
        {{address.city}}{{address.department}}{{address.houseNumber}}
      </div>
      <div class="top__receiver__info">
        <span class="top__receiver__info__name">{{address.name}}</span>
        <span class="top__receiver__info__phone">{{address.phone}}</span>
      </div>
      <div class="top__receiver__icon iconfont" @click="handleAddressClick">&#xe602;</div>
   </div>
   <div v-else>
        <div class="top__receiver__address">
          暂无可用地址
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import useAddressEffect from '../orderComfirmation/addressEffect'
export default {
  name:'TopArea',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const shopId = route.params.id
    const handleBackClick = () => { router.back() }
    const handleAddressClick = () => { router.push(`/chooseAddressList/${shopId}`) }
    const address = useAddressEffect()
    return { handleBackClick, handleAddressClick, address }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.top{
  position: relative;
  height: 1.96rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $btn-bgColor 50%);
  &__header{
    display: flex;
    line-height: .24rem;
    color: $bgColor;
    font-size: .16rem;
    padding-top: .2rem;
    text-align: center;
    margin: 0 .18rem;
    &__back{
      font-size: .2rem;
    }
    &__title{
      flex: 1;
    }
  }
  &__receiver{
    position: absolute;
    top: .85rem;
    left: .18rem;
    right: .18rem;
    height: 1.11rem;
    background: $bgColor;
    border-radius: .04rem;
    border-radius: .04rem;
    &__title{
      font-size: .16rem;
      font-weight: 500;
      padding-bottom: .14rem;
      line-height: .22rem;
    }
    &__address{
      font-size: .14rem;
      padding-bottom: .14rem;
      margin-right: .4rem;
    }
    &__info{
      color: $light-fontColor;
      &__name{
        margin-right: .06rem;
      }
    }
    &__icon{
      font-size: .16rem;
      position: absolute;
      right: 0.18rem;
      top: .5rem;
    }
  }
}
.info{
  margin: .16rem;
}
</style>

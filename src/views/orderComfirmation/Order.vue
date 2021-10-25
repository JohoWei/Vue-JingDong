<template>
  <div class="order">
    <div class="order__total">
      实付金额
      <span class="order__total__price">&yen;{{calculations.price}}</span>
    </div>
     <!-- 因为渲染时，address还不存在，为空，那么获取他地址里的属性自然是报错，所以先给个v-if，如果获取不到就不加载 -->
    <div class="order__btn" @click="() => handleShowMask(true)" v-if="address">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleShowMask(false)">
    <div class="mask__content" @click.stop>
      <div class="mask__content__info">
        <h3 class="mask__content__title">确认要离开收银台？</h3>
        <p class="mask__content__detail">请尽快完成支付，否则将被取消</p>

      <div class="mask__content__btns">
        <div
        class="mask__content__btns__btn mask__content__btns__btn--cancel"
        @click="()=>handleConfirmOrder(true)"
        >取消订单</div>

        <div
        class="mask__content__btns__btn mask__content__btns__btn--confirm"
        @click="()=>handleConfirmOrder(false)"
        >确认支付</div>
      </div>
      </div>
    </div>
  </div>
  <Toast :message='toastMessage' v-if="show"/>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/CartEffect'
import { useStore } from 'vuex'
import { post } from '../../utils/request'
import useAddressEffect from './addressEffect'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useOrderConfirmEffect = (shopId, shopName, productList, address, showToast) => {
  const router = useRouter()
  const store = useStore()

  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value){
      const product = productList.value[i]
      products.push({ id: product._id, num:product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: address.value._id,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        if (isCanceled === false){
          // showToast('下单成功')
          store.commit('clearCartDetail', shopId)
          router.push({ name: 'OrderList' })
        } else if (isCanceled === true){
          router.back()
        }
      } else {
        showToast('下单失败')
      }
    } catch (e){
        showToast('请求失败')
    }
  }
  return { handleConfirmOrder }
}

// 蒙层相关逻辑
const useMaskShowEffect = () => {
  const showConfirm = ref(false)
  const handleShowMask = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowMask }
}

export default {
  name:'Order',
  components:{ Toast },
  setup(){
    const route = useRoute()
    const shopId = route.params.id
    const address = useAddressEffect()
    const { show, toastMessage, showToast } = useToastEffect()
    const { productList, calculations, shopName } = useCommonCartEffect(shopId)
    const { handleConfirmOrder } = useOrderConfirmEffect(shopId, shopName, productList, address, showToast)
    const { showConfirm, handleShowMask } = useMaskShowEffect()
    return { show, toastMessage, showToast, address, productList, calculations, shopName, showConfirm, handleShowMask, handleConfirmOrder }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: rgba(0,0,0,0.50);
  &__content{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    width: 3rem;
    height: 1.56rem;
    border-radius: .04rem;
    text-align: center;
    &__title{
      font-size: .18rem;
      margin: .24rem auto .08rem auto;
    }
    &__detail{
      font-size: 14px;
      color: #666666
    }
    &__btns{
      display: flex;
      margin: .1rem .6rem;
      font-size: .14rem;
      &__btn{
      width: 0.8rem;
      height: 0.32rem;
      line-height: .32rem;
      border: 1px solid #4FB0F9;
      border-radius: 16px;
      border-radius: 16px;
      &--cancel{
        color: #0091FF;
        margin-right: .24rem;
      }
      &--confirm{
        color: #fff;
        background: #4FB0F9;
      }
      }

    }
  }
}
.order{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: .5rem;
  line-height: .5rem;
  display: flex;
  background: #fff;
  &__total{
    flex: 1;
    margin-left: .24rem;
    font-size: .14rem;
    &__price{
      line-height: .2rem;
      font-size: .16rem;
    }
  }
  &__btn{
    width: 1rem;
    line-height: .5rem;
    text-align: center;
    color: #fff;
    font-size: .14rem;
    background: #4FB0F9;
  }
}
</style>

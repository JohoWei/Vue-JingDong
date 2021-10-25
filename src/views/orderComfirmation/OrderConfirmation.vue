<template>
  <div class="wrapper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from '../orderComfirmation/TopArea'
import ProductList from '../orderComfirmation/ProductList.vue'
import Order from '../orderComfirmation/Order.vue'
import useCommonAddressEffect from '../../effects/addressEffect'
export default {
  name:'OrderConfirmation',
  components:{ TopArea, ProductList, Order },
  setup() {
    const { getAddressList } = useCommonAddressEffect()
    getAddressList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: $dark-bgColor;
  overflow-y: scroll;
}
</style>

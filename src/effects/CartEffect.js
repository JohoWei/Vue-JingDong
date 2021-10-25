import { useStore } from 'vuex'
import { computed } from 'vue'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList

  // 点击加减改变商品数量逻辑
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, num })
  }

  // 获取更新后的cartList
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList){
      const product = productList[i]
      if (product.count > 0){
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // 获取商铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = {
      total:0,
      price:0,
      allChecked:true
    }
    if (productList){
      for (const i in productList){
        const product = productList[i]
        result.total += product.count
        if (product.check) { result.price += (product.count * product.price) }
        if (product.count > 0 && !product.check) { result.allChecked = false }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })

  return { cartList, shopName, productList, calculations, changeCartItemInfo }
}

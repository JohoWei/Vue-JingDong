import Vuex, { createStore } from 'vuex'

const setLocalUsername = (state) => {
  const { username } = state
  const usernameString = JSON.stringify(username)
  localStorage.username = usernameString
}

const getLocalUsername = () => {
  try {
    return JSON.parse(localStorage.username)
  } catch (e){
    return {}
  }
}

const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocaCartList = () => {
  // { shopId: {shopName:'', productList:{ productId: {} }}}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // vuex会把state里面数据转化为proxy数据，具备双向响应式,一处改变，处处改变
    cartList:getLocaCartList(),
    username:getLocalUsername(),
    addressList:[]
  },
  mutations: {
    setUsername (state, username) {
      state.username = username
      setLocalUsername(state)
    },
    changeCartItemInfo(state, payload){
      const { shopId, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName:'', productList:{}
      }
      let product = shopInfo.productList[productId]
      if (!product){
        productInfo.count = 0
        product = productInfo
      }
      product.count += num
      if (num > 0){ product.check = true }
      if (product.count < 0){ product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeShopName(state, payload){
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName:'', productList:{}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked(state, payload){
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCartList(state)
    },
    cleanCartProducts(state, payload){
      const { shopId } = payload
      const shopInfo = state.cartList[shopId].productList
      for (const i in shopInfo){
        shopInfo[i].count = 0
      }
      setLocalCartList(state)
    },
    setCartItemsChecked(state, payload){
      const { shopId } = payload
      const shopInfo = state.cartList[shopId].productList
      for (const i in shopInfo){
        shopInfo[i].check = true
      }
      setLocalCartList(state)
    },
    clearCartDetail(state, shopId) {
      state.cartList[shopId].productList = {}
    },
    changeAddressList(state, addressList) {
      // 替换地址
      state.addressList.splice(0, state.addressList.length, ...addressList)
    }
  },
  actions: {
  },
  modules: {
  }
})

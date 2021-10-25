import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "Home" */ '../views/home/Home.vue')
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "Login" */ '../views/login/Login.vue'),
  beforeEnter (to, from, next) {
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next()
  }
},
{
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "Register" */ '../views/register/Register.vue')
},
{
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName: "CartList" */ '../views/cartList/CartList.vue')
},
{
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: "OrderList" */ '../views/orderList/OrderList.vue')
},
{
  path: '/person',
  name: 'PersonalInfo',
  component: () => import(/* webpackChunkName: "PersonalInfo" */ '../views/personalInfo/PersonalInfo.vue')
},
{
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "Shop" */ '../views/shop/Shop.vue')
},
{
  path: '/orderConfirmation/:id/:addressId?',
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderComfirmation/OrderConfirmation.vue')
},
{
  path: '/myAddressList',
  name: 'MyAddressList',
  component: () => import(/* webpackChunkName: "MyAddressList" */ '../views/myaddressList/MyAddressList.vue')
},
{
  path: '/upsertAddress/:id?',
  name: 'UpsertAddress',
  component: () => import(/* webpackChunkName: "UpsertAddress" */ '../views/upsertAddress/UpsertAddress.vue')
},
{
  path: '/chooseAddressList/:shopId',
  name: 'ChooseAddressList',
  component: () => import(/* webpackChunkName: "ChooseAddressList" */ '../views/chooseAddressList/ChooseAddressList.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to // 以组件名作为跳转对象
  const isLoginOrRegister = (name === 'Login' || name === 'Register') // 访问Login页面或者Register页面都可以执行next()
  if (isLogin || isLoginOrRegister) {
    next()
  } else {
    next({ name: 'Login' })
  }
})

export default router

<template>
   <div class="wrapper">
    <div class="header">
      <div class="header__info">
        <div class="header__info__user">{{username}}</div>
      </div>
      <img src="http://www.dell-lee.com/imgs/avatar.jpg" alt="" class="header__img">
    </div>

    <div class="list">
      <div class="list__item" @click="handleAddressClick">
        <div class="list__item__icon iconfont">&#xe617;</div>
        <div class="list__item__test">我的地址</div>
        <div class="list__item__enter iconfont"><router-link :to="{path:'MyAddressList'}">&#xe602;</router-link></div>
      </div>
    </div>

    <div class="logout" @click="handleLogout">
      退出登录
    </div>
  </div>
  <Docker :currentIndex="3"/>
</template>

<script>
import { toRefs } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Docker from '../../components/Docker.vue'
// import { useCommonCartEffect } from '../../effects/CartEffect'

const useGetUserNameEffect = () => {
  const store = useStore()
  const { username } = toRefs(store.state)
  return { username }
}

const useLogoutEffect = () => {
  const router = useRouter()
  const handleLogout = () => {
      localStorage.removeItem('isLogin')
      router.replace({ name:'Login' })
  }
  return { handleLogout }
}

export default {
  name:'PersonalInfo',
  components:{ Docker },
  setup() {
    const router = useRouter()
    const { handleLogout } = useLogoutEffect()
    const { username } = useGetUserNameEffect()
    const handleAddressClick = () => { router.push({ name:'MyAddressList' }) }
    return { username, handleLogout, handleAddressClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
    overflow-y: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    background: #f8f8f8;
}
.header{
  position: relative;
  height: 1.6rem;
  padding-top: .4rem;
  background-size: 100% 1.59rem;
  background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, #0091FF 50%);
  background-repeat: no-repeat;
  &__info{
    margin: .3rem .18rem 0 .18rem;
    padding-top: .46rem;
    height: .66rem;
    background: #fff;
    border-radius: .08rem;
    &__user{
      font-size: .24rem;
      color: #262628;
      text-align: center;
      line-height: .36rem;
    }
  }
  &__img{
    position: absolute;
    left: 50%;
    top: .2rem;
    transform: translateX(-50%);
    width: .94rem;
    height: .94rem;
    border-radius: 50%;
  }
}

.list{
    margin: .16rem .18rem 0 .18rem;
    background: #fff;
    box-shadow: 0 0.08rem 0.16rem 0 rgb(0 0 0 / 8%);
    border-radius: .08rem;
    &__item{
      display: flex;
      padding: .2rem;
      line-height: .22rem;
      font-size: .14rem;
      color: #262626;
      &__icon{
        margin-right: .12rem;
        width: .22rem;
        height: .22rem;
        background: #32c5ff;
        border-radius: .08rem;
        text-align: center;
        font-weight: 700;
        color: #fff;
      }
      &__test{
        flex: 1;
      }
      &__enter{
        font-size: .12rem;
        color: #C2C4CA;
        a{
          text-decoration: none;
          color: #C2C4CA;
        }
      }
    }
}

.logout{
    margin: .18rem;
    line-height: .32rem;
    background: #0091ff;
    color: #fff;
    text-align: center;
    border-radius: .04rem;
}
</style>

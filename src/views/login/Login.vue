<template>
  <div class="wrapper">
    <div class="content">
        <img src="http://www.dell-lee.com/imgs/vue3/user.png" alt="" class="content__img">

      <div class="content__input">
        <input type="text" class="content__input__username" placeholder="请输入用户名" v-model="username">
      </div>

       <div class="content__input">
        <input type="password" class="content__input__password" placeholder="请输入密码" v-model="password">
      </div>

      <div class="content__btn" @click="handleLoginClick">登录</div>

      <div class="content__register">
        <span @click="handleRegisterClick">立即注册</span>
      </div>
    </div>

    <Toast :message='toastMessage' v-if="show"/>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const store = useStore()
  const data = reactive({ username:'', password:'' })
  // 登录跳转,用户名验证
  const handleLoginClick = async () => {
    try {
      if (data.username === '' || data.password === ''){
        showToast('用户名或密码为空')
        return
      }
      const result = await post('/api/user/login', {
        username:data.username,
        password:data.password
      })
      if (result?.errno === 0){
        // 将用户名传入vuex保存
        store.commit('setUsername', username)
        localStorage.isLogin = true
        router.push({ name:'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e){
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLoginClick }
}

// 跳转注册逻辑
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name:'Register' })
  }
  return { handleRegisterClick }
}

export default {
  name:'Login',
  components:{ Toast },
  setup(){
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLoginClick } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return { username, password, show, showToast, toastMessage, handleRegisterClick, handleLoginClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.content{
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  margin: 0 .4rem;
  &__img{
    display: block;
    width: 0.66rem;
    height: 0.66rem;
    margin:0 auto .4rem auto
  }
  &__input{
    background: #F9F9F9;
    border: .01rem solid rgba(0,0,0,0.10);
    border-radius: .06rem;
    border-radius: .06rem;
    height: .48rem;
    margin-bottom: .16rem;
    font-size: .16rem;
    &__username,&__password{
      width: 100%;
      line-height: .48rem;
      outline: none;
      border: none;
      text-indent: 1em;
      background: none;
      color: $content-fontcolor;
    }
  }
  &__btn{
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    line-height: .48rem;
    text-align: center;
    font-size: .16rem;
    color: $search-bgColor;
    margin-top: .32rem;
  }
  &__register{
    width: 100%;
    text-align: center;
    margin-top:.16rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }
}
</style>

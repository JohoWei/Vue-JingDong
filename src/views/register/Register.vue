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

      <div class="content__input">
        <input type="password" class="content__input__confirmpassword" placeholder="请再次输入密码" v-model="confirmpassword">
      </div>

      <div class="content__btn" @click="handleRegisterClick">注册</div>

      <div class="content__register">
        <span @click="handleLoginClick">已有账号请登录</span>
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

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const store = useStore()
  const data = reactive({ username:'', password:'', confirmpassword:'' })
  // 登录跳转,用户名验证
  const handleRegisterClick = async () => {
    try {
      if (data.username === '' || data.password === '' || data.confirmpassword === ''){
        showToast('用户名或密码为空')
        return
      }
      const result = await post('/api/user/register', {
        username:data.username,
        password:data.password,
        confirmpassword:data.confirmpassword
      })
      if (result?.errno === 0){
        router.push({ name:'Home' })
      } else {
        showToast('注册失败')
      }
    } catch (e){
      showToast('请求失败')
    }
  }
  const { username, password, confirmpassword } = toRefs(data)
  return { username, password, confirmpassword, handleRegisterClick }
}

// 跳转登录逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name:'Login' })
  }
  return { handleLoginClick }
}

export default {
  name:'Login',
  components:{ Toast },
  setup(){
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, confirmpassword, handleRegisterClick } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return { username, password, confirmpassword, show, showToast, toastMessage, handleRegisterClick, handleLoginClick }
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
    &__username,&__password,&__confirmpassword{
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

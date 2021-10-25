<template>
  <div class="docker">
    <div
    :class="{'docker__item':true,'docker__item--active':index == currentIndex}"
    v-for="(item,index) in dockerList"
    :key="item.icon">

      <router-link :to="item.to">
        <div class="docker__item__iconfont iconfont" v-html="item.icon"></div>
        <div class="docker__item__desc">{{item.text}}</div>
      </router-link>

    </div>
  </div>
</template>

<script>
export default {
  name:'Docker',
  props:['currentIndex'],
  setup() {
    const dockerList = [
      { icon:'&#xe609;', text:'首页', to:{ name:'Home' } },
      { icon:'&#xe7e1;', text:'购物车', to:{ name:'CartList' } },
      { icon:'&#xe713;', text:'订单', to:{ name:'OrderList' } },
      { icon:'&#xe640;', text:'我的', to:{ name:'PersonalInfo' } }
    ]

    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.docker{
  display: flex;
  position: fixed;
  bottom: 0;
  height: 0.5rem;
  width: 100%;
  border-top:.01rem solid $search-bgColor;
  &__item{
    flex: 1;
    text-align: center;
    a{
      text-decoration: none;
      color: #333;
    }
    &--active{
      a{
      color: #1FA4FC ;
      }
    }
    &__iconfont{
      margin: .07rem 0 .02rem 0;
      font-size: .2rem;
    }
    &__desc{
      font-size: .2rem;
      transform: scale(.5);
    }
  }
}
</style>

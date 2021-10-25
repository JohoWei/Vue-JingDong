<template>
  <!-- 位置 -->
  <div class="position">
    <div class="position__left">
      <span class="position__icon iconfont">&#xe6b4;</span>
      惠州惠城区山姆会员店
    </div>
    <div class="position__right">
      <span class="position__notice iconfont">&#xe628;</span>
    </div>
  </div>

  <!-- 搜索栏 -->
  <div class="search">
    <div class="search__icon iconfont">&#xe69a;</div>
    <input type="text" class="search__input" placeholder="山姆会员商店优惠商品">
  </div>

  <!-- banner位 -->
  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" class="banner__img">
  </div>

  <!-- 列表 -->
  <div class="icons">
    <div class="icons__item" v-for="item in iconList" :key="item.imgName">
      <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`" alt="" class="icons__item__img">
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>

  <!-- 过渡 -->
  <div class="gap"></div>
</template>

<script>
export default {
  name:'StaticPart',
  setup() {
    const iconList = [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '烘培蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ]

    return { iconList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixins.scss';
@import'../../style/viriables.scss';
.position{
  display: flex;
  position: relative;
  padding-top: .16rem;
  align-items: center;
  font-size: .16rem;
  color: $content-fontcolor;
  justify-content: space-between;
  &__left{
    @include ellipsis;
  }
  &__icon,&__notice{
    font-size: .2rem;
  }
  &__icon{
    margin-right: .08rem;
  }
}

.search{
  display: flex;
  margin-top: .16rem;
  width: 100%;
  line-height: .32rem;
  background: $search-bgColor;
  border-radius: .16rem;
  border-radius: .16rem;
  color: #333;
  &__icon{
    margin-left: .16rem;
  }
  &__input{
    outline: none;
    border: none;
    width: 100%;
    background: transparent;
    text-indent: 1em;
    font-size: .14rem;
  }
}

.banner{
  overflow: hidden;
  margin-top: .2rem;
  &__img{
    width: 100%;
  }
}

.icons{
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item{
    width: 20%;
    &__img{
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 auto;
    }
    &__desc{
      text-align: center;
      margin-top: .06rem;
    }
  }
}

.gap{
  margin: 0.04rem -.18rem;
  height: .1rem;
  background: $search-bgColor;
}
</style>

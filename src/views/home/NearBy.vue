<template>
  <div class="nearby">
    <h2 class="nearby__title">附近商铺</h2>
      <router-link v-for="item in nearbyList" :key="item._id"  :to="`/shop/${item._id}`">
        <ShopInfo :item='item' />
      </router-link>
  </div>
</template>

<script>
import ShopInfo from '../../components/ShopInfo.vue'
import { ref } from 'vue'
import { get } from '../../utils/request'

const useNearByListEffect = () => {
  const nearbyList = ref([])
  const getNearByList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length){
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearByList }
}
export default {
  name:'NearBy',
  components:{ ShopInfo },
  setup(){
    const { nearbyList, getNearByList } = useNearByListEffect()
    getNearByList()
    return { nearbyList, getNearByList }
  }

}
</script>

<style lang="scss" scoped>
.nearby{
  &__title{
    font-weight: normal;
  }
  a{
    text-decoration: none;
  }
}
</style>

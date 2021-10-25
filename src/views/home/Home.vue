<template>
  <div class="wrapper">
    <StaticPart/>
    <NearBy />
  </div>
  <Docker :currentIndex="0"/>
</template>

<script>
// import { useStore } from 'vuex'
import Docker from '../../components/Docker.vue'
import StaticPart from '../home/StaticPart.vue'
import NearBy from '../home/NearBy.vue'
export default {
  name: 'Home',
  components:{ Docker, StaticPart, NearBy },
  setup () {
    // const store = useStore()
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: .5rem;
  padding: 0 .18rem .1rem .18rem;
}
</style>

<template>
  <div>
    <Headtab />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Headtab from '@/components/Headtab.vue'

export default {
  name: 'home',
  components: {
    Headtab
  }
}
</script>

<style scoped>
html,body {
  margin:0;
  padding:0;
}
</style>

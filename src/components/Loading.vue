<template>
  <div class="loading">
      <van-loading  size="18" type="circle" >加载中...</van-loading>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);
export default {

}
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
}
</style>

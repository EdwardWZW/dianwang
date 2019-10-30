<template class="toptab">
  <div >
    <van-tabs title-active-color="#5c9dec" color="#5c9dec">
      <van-tab  title="要闻" >
        <News/>
      </van-tab>
      <van-tab title="专题">
        <Themes />
      </van-tab>
      <van-tab title="电网">
        <Elecweb />
      </van-tab>
      <van-tab title="产经">
        <Industry />
      </van-tab>
      <van-tab title="北京">
        <Beijing />
      </van-tab>
      <van-tab title="文化">
        <Culture />
      </van-tab>
      <van-tab title="人物">
        <People />
      </van-tab>
      <van-tab title="琥珀">
        <Hupo />
      </van-tab>
      <van-tab title="报刊">
        <Newspaper />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import News from './News.vue'
import Themes from './Themes'
import Elecweb from './Elecweb'
import Industry from './Industry'
import Beijing from './Beijing'
import Culture from './Culture'
import People from './People'
import Hupo from './Hupo'
import Newspaper from './Newspaper'

import Vue from 'vue';
import { Tab, Tabs } from 'vant';

Vue.use(Tab).use(Tabs);

export default {
  data () {
    return {
    }
  },
  components: {
    News,
    Themes,
    Elecweb,
    Industry,
    Beijing,
    Culture,
    People,
    Hupo,
    Newspaper
  },
  mounted () {
    // let item = document.getElementsByClassName("tabItem")
    // console.log(item)
    // item.setAttribute("text-align", "center")
  }
}
</script>

<style scoped>
span[class="van-ellipsis"] {
  text-align: center
}
</style>
<template>
  <div>
    <Loading v-if="loadFlag" />
    <!-- 头部 -->
     <div class="top">
       <div class="downloadapp">立即下载</div>
     </div>
    <!--标题 正文 -->
    <div class="body_wrap">
      <div style="text-align:center;font-size:0.13rem;margin-bottom:0.05rem;">专题</div>
      <p class="head_name">
        {{ headName }}
      </p>
      <img class="head_pic" :src="headPic" alt="">
      <div class="mainBody" >
        <div style="color:#999;margin-bottom:0.05rem">导读</div>
        {{ shareDesc }}
      </div>
    </div>
    <!-- 分类模块  更多 -->
    <div v-for="(item,i) of classifyList" :key="i">
      <div class="classify">
        <span>{{ item.name }}</span>
        <!-- <a :href="item.moreURL" > -->
          <span>更多>></span>
        <!-- </a> -->
      </div>
      <ul class="newsul">
        <!-- <router-link tag="li" :to="" class="newsli" v-for="(item,index) of newsList1.childList" :key="index"> -->
          <router-link tag="li"  :to="{name:'detail',params:{id1:itm.contId, id2:itm.prdContId}}" class="newsli" v-for="(itm,j) of item.articleList" :key="j">
            <div class="leftsec">
              <h3 class="title">{{ itm.name }}</h3>
              <span class="type">{{ itm.cpName }}</span>
                <span class="date"> {{ itm.distribute_time }} </span>
            </div>
            <div class="rightsec">
                <img :src="itm.imageURL_small"/>
            </div>
          </router-link>
      </ul>
    </div>

    <div class="backhome" @click="backhome()">返回首页</div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Popup } from 'vant';

Vue.use(Popup);

export default {
  data () {
    return {
      loadFlag: true,
      classifyList: [],
      headName: '',
      headPic: '',
      shareDesc: '',

    }
  },
  components: {
    Loading
  },
  methods: {
    backhome: function () {
      this.$router.push({path:'/'})
    },
  },
  mounted () {
    window.scrollTo(0, 0)
    let ids = this.$route.params;
    let id1 = ids.id1
    let id2 = ids.id2
    let themeDetail = {  nodeId: id1, specialContId: id2, v: 312, cv: 400, debug: 1 }
    const options = {
      method: 'POST',
      // headers: { 'content-type': 'application/www-x-form-urlencoded' },
      url: '/api/portal/resources/v1/specialInfo.jsp',
      data: qs.stringify(themeDetail) ,
    };
    axios(options).then(res => {
      let data = res.data
      console.log(data)
      this.loadFlag = false
      this.headName = data.name
      this.headPic = data.imageURL_top
      this.shareDesc = data.shareDesc
      this.classifyList = data.classifyList

    })
  }
  
}
</script>

<style scoped>
div,p,h1,h2,h3,h4,h5,span,a {
  box-sizing: border-box;
  text-align: left;
  margin: 0
}
.top {
  width: 100%;
  height:0.4rem;
  background: lightgrey;
  position: relative;
}
.downloadapp {
  width: 0.6rem;
  height:0.24rem;
  border: 1px solid #999;
  border-radius: 0.05rem;
  text-align: center;
  line-height: 0.24rem;
  font-size: 0.10rem;
  position: absolute;
  right: 0.2rem;
  top:0.09rem;
}
.body_wrap {
  width: 100%;
  padding: 0.1rem;
  background: #fff;
}
.head_name {
  width: 100%;
  font-size: 0.2rem;
  text-align: center;
  margin-bottom: 0.1rem;
}
.head_pic {
  box-sizing: border-box;
  display: block;
  width: 100%;
  height: 0.8rem;
  margin: 0 auto 0.1rem;
}
.mainBody {
  font-size: 0.11rem;
}
.newsli {
    box-sizing: border-box;
    width: 100%;
    height:0.9rem;
    line-height: 0.9rem;
    border-bottom: 1px solid #ccc;
    padding: 0.14rem 0.1rem;
    font-size:0.1rem;
    
 }
 .leftsec,.rightsec {
     display: inline-block;
     position: relative;
     vertical-align: top;
 }
 .leftsec {
     width: 60%;
     height: 100%;
     text-align: left;
     margin:0;
 }
 .rightsec {
     width: 40%;
     height: 100%;
 }
 .rightsec img {
     width: 80%;
     height: 100%;
     position: relative;
     left: 16%;
 }
 .title {
     box-sizing: border-box;
     display: block;
     width: 100%;
     height:0.32rem;
     margin:0;
     padding-right:0.04rem;
     line-height:0.16rem;
     font-size: 0.12rem;
     color:#222;
     font-weight: normal;
 }
 .date,.type {
    display: inline-block;
    height: 16%;
    line-height: 100%;
    font-size: 0.08rem;
    color: #999;
    position: absolute;
    right: 0;
    bottom: 0;
 }
  .type {
     left:0;
 }
 .classify {
   width: 100%;
   color: #5e9beb;
   font-size: 0.12rem;
   font-weight: bold;
   display: flex;
   justify-content: space-between;
   padding:0.1rem 0.1rem 0;
   border-top: 0.08rem solid rgb(226, 225, 225);
 }
 .classify span {
   display:inline-block;
 }
 .backhome {
  width:0.6rem;
  height:0.2rem;
  border-radius:0.03rem;
  background:#eee;
  color:#999;
  font-size:0.1rem;
  text-align:center;
  line-height:0.2rem;
  position:fixed;
  bottom:0.2rem;
  right:0.2rem;
}
</style>

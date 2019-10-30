<template>
  <div>
    <Loading v-if="loadFlag" />
      <!-- banner轮播 -->
    <van-swipe class="banner" :autoplay="2900"  :height="180">
        <div v-for="(item,i) of banner1" :key="i">
            <van-swipe-item>
                <router-link tag="img" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}"  :src="item.imageURL_big" alt="" />
            </van-swipe-item>
        </div>
    </van-swipe>
    <!-- 标题列表 -->
    <van-swipe :touchable="false" :autoplay="4200"  :height="30" :show-indicators="false">
        <div v-for="(item,i) of titleList1" :key="i">
            <van-swipe-item class="title_li">
                <router-link tag="div" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" > {{ item.name }} </router-link>
            </van-swipe-item>
        </div>
    </van-swipe>
    <van-swipe :touchable="false" :autoplay="4200"  :height="30" :show-indicators="false">
        <div v-for="(item,i) of titleList2" :key="i">
            <van-swipe-item class="title_li">
                <router-link tag="div" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" > {{ item.name }} </router-link>
            </van-swipe-item>
        </div>
    </van-swipe>

    <!-- 新闻列表 -->
        <ul class="newsul">
            <router-link tag="li" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="newsli" v-for="(item,index) of newsList1.childList" :key="index">
               <div class="leftsec">
                   <h3 class="title"> {{ item.name }} </h3>
                   <span class="type"> {{ item.cpName }} </span>
                   <span class="date"> {{ item.distribute_time }} </span>
               </div>
               <div class="rightsec">
                   <img :src="item.imageURL_small" />
               </div>
            </router-link>
        </ul>
        <!-- 第二个banner轮播 -->
        <van-swipe :autoplay="3000" :height="120">
            <div v-for="(item,i) of banner2" :key="i">
                <van-swipe-item class="banner2">
                    <router-link tag="img" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" :src="item.imageURL_small" alt="" />
                </van-swipe-item>
            </div>
        </van-swipe>
        <!-- 第二个新闻列表 -->
        <ul class="newsul">
            <router-link tag="li" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="newsli" v-for="(item,index) of newsList2" :key="index">
               <div class="leftsec">
                   <h3 class="title"> {{ item.name }} </h3>
                   <span class="type"> {{ item.cpName }} </span>
                   <span class="date"> {{ item.distribute_time }} </span>
               </div>
               <div class="rightsec">
                   <img :src="item.imageURL_small" alt="图片丢失" />
               </div>
            </router-link>
        </ul>
        <!-- 大家都在看什么 -->
        <!-- <h3 class="kansm">{{ kansm.nodeName }} </h3> -->
        <div class="kanbanner_wrap">
            <!-- swiper 滑动banner -->
            <swiper  :options="swiperOption" ref="mySwiper" class="swiper-container">
                <!-- <div class="swiper-wrapper"> -->
                    <swiper-slide  v-for="(item,i) of kansm.childList" :key="i"  class="swiper-slide">
                       <router-link tag="img" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="ksm_pic" :src="item.imageURL_small" alt="" />
                       <router-link tag="div" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="ksm_info"> {{ item.name }} </router-link> 
                    </swiper-slide>
                <!-- </div> -->
            </swiper >
        </div>
        <!-- 视频 -->
        <div class="newsVideoImg">
            <router-link :to="{name:'detail2',params:{id:videoId}}"  tag="img" class="lazy" :src="videoPic" />
            <div class="timespan">00: {{ videoDuration }}</div>
            <router-link tag="div" :to="{name:'detail2',params:{id:videoId}}" class="playicon">
                <van-icon color="#fff" size="0.36rem" name="play-circle-o" />
            </router-link>
            <!-- <img src="./img/play.png" class="palyImg" alt=""> -->
        </div>
        <!-- 更多新闻懒加载 -->
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
            <ul class="newsul">
                <router-link tag="li" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="newsli" v-for="(item,index) of newsList3.childList" :key="index">
                <!-- <router-link tag="li" :to="{name:'detail',params:( item.prdContId == '' ? {id1:item.contId} :{id1:item.contId, id2:item.prdContId})}" class="newsli" v-for="(item,index) of newsList3.childList" :key="index"> -->
                <div class="leftsec">
                    <h3 class="title"> {{ item.name }} </h3>
                    <span class="type"> {{ item.cpName }} </span>
                    <span class="date"> {{ item.distribute_time }} </span>
                </div>
                <div class="rightsec">
                    <img :src="item.imageURL_small" alt="图片丢失" />
                </div>
                </router-link>
            </ul>
        </van-list>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import '../../node_modules/swiper/css/swiper.css'

import Loading from '@/components/Loading.vue'
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { List } from 'vant';
import { Icon } from 'vant';


Vue.use(Swipe).use(SwipeItem).use(Icon);
Vue.use(List);



export default {
    data() {
      return {
        // 新闻列表懒加载
        loading: false,
        finished: false,
        morenewsList:[],
        pageNum: 1,
        loadFlag: true,
        banner1:[],
        titleList1: '',
        titleList2: '',
        titleArr: [],
        newsList1: {},
        banner2: [],
        newsList2: [],
        kansm: {},
        videoId:'',
        videoDuration:'',
        videoPic:'',
        newsList3: {},
        swiperOption: {
            direction: 'horizontal',
            loop: true,
            autoplay: 1000,
            slidesPerView: "auto",
            centeredSlides:true,
            spaceBetween: 20,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:false,//修改swiper的父元素时，自动初始化swiper
            // onSlideChangeEnd: function(swiper){
            // swiper.update();  
            // mySwiper.startAutoplay();
            // mySwiper.reLoop();  
            // }
        }
      }
    
    
    },
    components: {
        Loading,
        swiper,
        swiperSlide
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
        onLoad () {
            // console.log('可以加载数据了')
            this.loading = true
            const moreNewsData = { nodeId: 400, start: this.pageNum, cv: 400, debug: 1 };
            const moreoptions = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(moreNewsData),
                url: '/api/portal/resources/v1/yaowenPage.jsp',
            };
            axios(moreoptions).then(res => {
                this.loading = false
                this.pageNum++
                const moreResult = res.data.contentList[0].childList
                // console.log('数据加载完毕')
                if(moreResult.length == 0){
                    this.finished = true
                } else {
                    this.newsList3.childList = [...this.newsList3.childList, ...moreResult]
                }
            })
        }
    },
    mounted () {
        // var mySwiper = new Swiper ('.swiper-container', {
            
        // })
        // onSlideChangeEnd: function(swiper){
        // swiper.update();  
        // mySwiper.startAutoplay();
        // mySwiper.reLoop();  
        // }
        // console.log('this is current swiper instance object', this.swiper)
        // this.swiper.slideTo(3, 1000, true)

        const newsData = { nodeId: 368, cv: 400, debug: 1 };
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(newsData),
            url: '/api/portal/resources/v1/yaowen.jsp',
        };
        axios(options).then(res => {
            this.loadFlag = false
            let data = res.data.contentList
            console.log(data)
            this.banner1 = data[0].childList
            this.titleList1 = data[1].childList
            this.titleList2 = data[2].childList
            this.newsList1 = data[3]
            this.banner2 = data[4].childList
            this.newsList2 = data[5].childList
            this.videoId = this.newsList2[1].contId
            this.videoDuration = this.newsList2[1].video_duration
            this.videoPic = this.newsList2[1].imageURL_big
            this.kansm = data[6]
            this.newsList3 = data[7]
            console.log(this.newsList3.childList)
        });
    }
}
</script>

<style scoped>
 .banner,.banner2 {
    width:100%;
  }
 .banner,.banner img {
     height:1.4rem;
 }
 .banner img, .banner2 img {
    width:100%;
    font-size: 0.16rem;
 }
 ul,li {
     list-style: none;
 }
 .title_li {
     box-sizing: border-box;
     width: 100%;
     height:0.3rem;
     line-height:0.22rem;
     border-bottom: 1px solid #ccc;
     padding: 0.1rem;
     text-align:left;
     padding:0 0.2rem;
     font-size:0.08rem;
     font-weight: normal;
     margin:0;
     white-space: nowrap;
     text-overflow: ellipsis;
     overflow: hidden;
     word-break: break-all;
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
 .kansm {
     font-size:0.14rem;
     font-weight:normal;
     text-align:left;
     padding:0.1rem 0.2rem 0;
     border-bottom:1px solid #ccc;
 }
 .kanbanner_wrap {
     width:100%;
     height:1.5rem;
     background:rgb(245, 242, 242);
     position: relative;
     overflow: hidden;
 }
  /* swiper样式 */
   .swiper-container {
    margin-top: 3%;
    width: 100%;
    height:100%;
    overflow: visible!important;
    /* position: relative;
    left:-73%; */
}
.swiper-slide {
    width: 62%;
    height: 89%; 
    border-radius: 0.05rem;
    background: #fff;
}
.ksm_pic {
    width: 100%;
    height: 70%;
    border-radius: 0.05rem 0.05rem 0 0;
}
.ksm_info {
    box-sizing: border-box;
    font-size: 0.08rem;
    position: relative;
    top:-10%;
    padding:0 0.08rem;
}
 .newsVideoImg {
     box-sizing: border-box;
     width: 100%;
     height: 2rem;
     padding: 0.2rem 0.14rem;
     position: relative;
 }
 .newsVideoImg .lazy {
     display: block;
     width:100%;
     height: 100%;
 }
 .timespan {
     font-size: 0.08rem;
     background: #444;
     color:#fff;
     display: inline;
     position: absolute;
     right:6%;
     top:13%;
 }
 .videoword {
     width:100%;
     font-size: 0.10rem;
     color: #fff;
     position:absolute;
     bottom:0.26rem;
     text-align:center;
 }
 .playicon {
     position:absolute;
     left:46%;
     top:10%;
 }

</style>
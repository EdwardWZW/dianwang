<template>
  <div>
    <Loading v-if="loadFlag" />
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" :show-indicators="true" @change="onChange" class="banner">
        <div v-for="(item,i) of bannerList" :key="i">
            <van-swipe-item class="banner_wrap">
                <router-link tag="img" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="bannerImg" :src="item.imageURL_big" alt="" />
            </van-swipe-item>
        </div>

        <div class="custom-indicator" slot="indicator">
            <div style="width:100%;height:1rem;background:transparent"></div>
            <div v-for="(item,i) of bannerList" :key="i">
                <div class="banner_info" v-show="current == i">
                    <router-link tag="div" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="banner_name">
                        {{ item.name }}
                    </router-link>
                    <div class="banner_bottom" >
                        <span>
                            {{ item.cpName }}
                        </span>
                        <span class="distime">
                            {{ item.distribute_time }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </van-swipe>
    <!-- 新闻列表 -->
    <!-- 更多新闻懒加载 -->
    <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
        <ul class="newsul">
            <router-link tag="li" :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="newsli" v-for="(item,index) of newsList" :key="index">
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
    </van-list>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import { Swipe, SwipeItem } from 'vant';
import { List } from 'vant';

Vue.use(Swipe).use(SwipeItem);
Vue.use(List);

export default {
    data () {
       return {
           loading: false,
           finished: false,
           morenewsList:[],
           pageNum: 1,
           loadFlag: true,
           bannerList:[],
           newsList:[],
           current:0
       }
    },
    components: {
        Loading
    },
    methods: {
        onChange (index) {
            this.current = index;
        },
        onLoad () {
            // console.log('可以加载数据了')
            this.loading = true
            const moreNewsData = {  modeType: 1, nodeId: 366, start: this.pageNum, cv: 400, debug: 1 };
            const moreoptions = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(moreNewsData),
                url: '/api/portal/resources/v1/homePage.jsp',
            };
            axios(moreoptions).then(res => {
                this.loading = false
                this.pageNum++
                const moreResult = res.data.articleList
                // console.log('数据加载完毕')
                if(moreResult.length == 0){
                    this.finished = true
                } else {
                    this.newsList = [...this.newsList, ...moreResult]
                }
            })
        }
    },
    mounted () {
        function getBannerData() {
            return   axios({
                        method: 'post',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        url:'/api/portal/resources/v1/home.jsp',
                        data: qs.stringify({ modeType: 1, nodeId: 366, cv: 400, debug: 1 }),
                    })
        }

        function getListData() {
            return  axios({
                        method: 'post',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        url:'/api/portal/resources/v1/homePage.jsp',
                        data: qs.stringify({ modeType: 1, nodeId: 366, cv: 400, debug: 1 }),
                    })
        }

        axios.all([getBannerData(), getListData()])
        .then(axios.spread((res1, res2) => {
            this.loadFlag = false
            console.log(res1.data.posterList,res2.data.articleList)
            this.bannerList = res1.data.posterList
            this.newsList = res2.data.articleList
        }));
    }
}
</script>
<style scoped>
.banner {
    width: 100%;
    height: 20%;
    position: relative;

}
.bannerImg {
    display: block;
    width: 100%;
    height: 1.4rem;
    margin-bottom: 0.04rem;
}
.banner_info {
    width: 100%;
    height: 1.06rem;
    font-size: 0.12rem;
    color:#222;
    padding: 0.1rem;
    border-bottom:1px solid #ccc;
    padding-bottom: 0;
}
.banner_bottom {
    width: 100%;
    font-size: 0.09rem;
    color: #999;
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
}
.distime {
    margin-left: 12%;
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
    bottom: -0.26rem;
 }
  .type {
     left:0;
 }
</style>

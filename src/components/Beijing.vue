<template>
  <div>
    <Loading v-if="loadFlag" />
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
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import qs from 'qs'
import { List } from 'vant'
import Vue from 'vue';

Vue.use(List);

export default {
    data () {
       return {
           loading: false,
           finished: false,
           morenewsList:[],
           pageNum: 1,
           loadFlag: true,
           newsList: []
       }
    },
    components: {
        Loading
    },
    methods: {
        onLoad () {
            // console.log('可以加载数据了')
            this.loading = true
            const moreNewsData = { modeType: 1, nodeId: 372, start: this.pageNum, cv: 400, debug: 1 };
            const moreoptions = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(moreNewsData),
                url: '/api/portal/resources/v1/home.jsp',
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
        const bjData =  {  modeType: 1, nodeId: 372, cv: 400, debug: 1 }
        axios({
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data:qs.stringify(bjData),
            url:'/api/portal/resources/v1/home.jsp'
        }).then(res => {
            this.loadFlag = false
            console.log(res.data.articleList)
            this.newsList = res.data.articleList
        })
    }
}
</script>

<style scoped>
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

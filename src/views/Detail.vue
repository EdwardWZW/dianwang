<template class="root">
  <div>
    <Loading v-if="loadFlag" />
     <div class="top">
       <div class="downloadapp">立即下载</div>
     </div>
     <!-- 新闻详情 -->
     <div class="content_wrap">
       <!-- 标题 -->
        <h1 class="headtitle"> {{ newsTitle }} </h1>
        <!-- 作者 时间 来源 -->
        <div class="cont_author">
          <span class="cont_head">
            <img :src="contHead" alt="">
          </span>
          <span class="cont_authorname"> {{ contAuthor }} </span>
        </div>
        <div class="cont_tcp">
          <span class="cont_time"> {{ contTime }} </span>
          <span style="display:inline-block;margin-left:0.3rem;margin-right:0.05rem;" >来源：</span>  
          <span class="cont_cpname"> {{ contCpname }} </span>
        </div>
        <!-- 视频 -->



        <!-- 文章内容 -->
        <div class="main_body" v-html="mainbody" ref="mainBody"></div>
        <div class="cover_rect" @click="coverFn()" ref="coverRect"></div>
     </div>
     <div class="apptip">
       打开电网头条APP,阅读体验更佳
     </div>
     <div class="share_wrap">
        <span class="share" @click="showPopup()"><i class="fa fa-share-square-o" aria-hidden="true"></i>&nbsp;&nbsp;分享</span>
        <span class="share2" @click="thumbUpFun()"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>&nbsp;&nbsp;  {{ thumbUp }} </span>
     </div>
     <!-- <van-cell is-link @click="showPopup" class="popup">1</van-cell> -->
      <!-- 分享到 弹出层 -->
      <van-popup
        v-model="show"
        closeable
        position="bottom"
        :style="{ height: '20%', fontSize:'0.2rem' }" >
        <span class="weibo">微博</span> <span class="qq">QQ空间</span>
      </van-popup>

     <!-- 相关推荐 -->
     <div class="recommend_wrap">
       <span class="recommend_line"></span>相关推荐<span class="recommend_line"></span>
     </div>
     <ul>
       <router-link :to="{name:'detail',params:{id1:item.contId, id2:item.prdContId}}" class="recommend_list" tag="li" v-for="(item,i) of recommendList" :key="i">
         <div class="left_pic">
           <img :src="item.imageURL_small" alt="">
         </div>
         <div class="right_info">
           {{ item.name }}
           <div>
             <span class="au_time"> {{ item.cpName }} </span> &nbsp;&nbsp;&nbsp;&nbsp;
             <span class="au_time"> {{ item.distribute_time }} </span>
           </div>
         </div>
       </router-link>
     </ul>
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
      newsTitle:'',
      thumbUp: 68,
      recommendList:[],
      show:false,
      mainbody: '',
      coverflag: true,
      contHead:'',
      contAuthor:'',
      contTime:'',
      contCpname:'',
    }
  },    
  components: {
    Loading
  },
  watch: {
    '$route' (to) {
      let newId = to.params
      const newid1 = parseInt(newId.id1)
      const newid2 = parseInt(newId.id2)
      const newContData = { channelNodeId: 368, excludeContId:newid1, contId:newid2, cv: 400, debug: 1 };
      const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: '/api/portal/resources/v1/content.jsp',
            data: qs.stringify(newContData),
        };
        this.loadFlag = true
        axios(options).then(res => {
            this.loadFlag = false
            let data = res.data
            this.recommendList = data.recommendList
            this.newsTitle = data.name
            this.mainbody = data.mainBody
        });
        window.scrollTo(0, 0)
        this.cover_rect = true
        this.$refs.coverRect.style.display = 'block'
        this.$refs.mainBody.style.height = '3rem'
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    let ids = this.$route.params
    let id1 = parseInt(ids.id1)
    let id2 = parseInt(ids.id2)
      //  console.log(id1,id2)
    let contentData = {}
    isNaN(id2) ? contentData = { channelNodeId: 368, excludeContId: id1, cv: 400, debug: 1 } : contentData = { channelNodeId: 368, excludeContId: id1, contId: id2, cv: 400, debug: 1 }
    // console.log(contentData)
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: '/api/portal/resources/v1/content.jsp',
            data: qs.stringify(contentData)
        };
        axios(options).then(res => {
            let data = res.data
            console.log(data)
            this.loadFlag = false
            this.recommendList = data.recommendList
            this.newsTitle = data.name
            this.mainbody = data.mainBody
            this.contHead = data.headImage
            this.contAuthor = data.author
            this.contTime = data.distributeTime
            this.contCpname = data.cpName
        });
  },
  methods: {
    backhome: function () {
      this.$router.push({path:'/'})
    },
     showPopup: function () {
      this.show = true
    },
    thumbUpFun: function () {
      this.thumbUp++
    },
    coverFn: function () {
      this.cover_rect = false
      this.$refs.coverRect.style.display = 'none'
      this.$refs.mainBody.style.height = 'auto'
      
    }
    
  }
}
</script>

<style lang="scss" scoped>
@import '@/lib/reset.scss';
div,p,h1,h2,h3,h4,h5,span,a {
  box-sizing: border-box;
  text-align: left;
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
.headtitle {
  width: 100%;
  height:auto;
  padding:0.17rem 0.11rem 0.21rem;
  font-size: 0.18rem;
}
.apptip {
  width: 90%;
  height: 0.3rem;
  margin:0 auto;
  border: 1px solid #5c9dec;
  border-radius: 0.03rem;
  font-size: 0.1rem;
  color: #5c9dec;
  text-align: center;
  line-height: 0.3rem;
}
.popup {
  width: 48.5%;
  height: 0.3rem;
  background: orange;
}
.weibo,.qq {
  display: inline-block;
  position: relative;
  top:35%;
  left:20%;
}
.qq {
  left:40%;
}
.share_wrap {
  width: 90%;
  height: auto;
  margin: 0.1rem auto;
  display: flex;
  justify-content: space-between;
}
.share,.share2 {
  display: inline-block;
  width: 45%;
  height: 0.3rem;
  background: #5c9dec;
  color: #fff;
  text-align: center;
  font-size:0.16rem;
  line-height: 0.3rem;
}
.recommend_wrap {
  width: 90%;
  height: 0.3rem;
  line-height:0.3rem;
  text-align:center;
  padding:0.14rem auto;
  font-size:0.1rem;
  color: #222;
  position: relative;
}
.recommend_line {
  display: inline-block;
  width:10%;
  height: 0.02rem;
  margin:0.03rem 0.1rem;
  background:#222;
}
.recommend_list {
  width: 90%;
  height: 0.8rem;
  margin:0 auto;
  border-bottom: 1px solid #ccc;
  font-size:0.11rem;
  padding:0.1rem 0;
}
.left_pic,.right_info {
  display: inline-block;
}
.left_pic {
  width:25%;
  height:0.6rem;
  vertical-align: top;
  position: relative;
}
.left_pic img {
  width: 0.6rem;
  height:100%;
  background:orange;
}
.right_info {
  width:70%;
  height:0.3rem;
  margin-left:5%;
}
.au_time {
  font-size:0.08rem;
  color:#999;
}
.content_wrap {
  width: 100%;
  padding: 0 0.1rem;
  position: relative;
}
.cont_author, .cont_tcp {
  width:100%;
  margin-bottom: 0.1rem;
  font-size: 0.08rem;
}
.cont_head {
  display:inline-block;
  width:0.2rem;
  height:0.2rem;
  border-radius:50%;
  background:#ccc;
}
.cont_head  img {
  width: 100%;
}
.cont_authorname {
  display:inline-block;
  margin-left:0.14rem;
  vertical-align: top;
  margin-top: 0.04rem;
}
.cont_time {
  color: #999;
}
.cont_cpname {
  color:blue;
  
}
.main_body {
  font-size: 0.11rem;
  width: 100%;
  height: 3rem;
  overflow: hidden;
  margin-bottom: 0.2rem;
}
.cover_rect {
  position: absolute;
  width: 94%;
  height: 1.6rem;
  bottom: -0.04rem;
  // background:red;
  background: linear-gradient(180deg,hsla(0,0%,100%,0),#fff);
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

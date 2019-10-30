<template>
  <div>
     <div class="top">视频</div>
     <!-- 视频 -->
     <video-player class="video-player vjs-custom-skin video-js vjs-big-play-centered"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
     >
     </video-player>

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
        <!-- 文章内容 -->
        <div class="main_body">
            {{ mainbody }}
        </div>
     </div>
     <!-- 底部 -->
     <div class="bottom">
       <div class="downloadapp">立即下载</div>
     </div>
     <div class="backhome" @click="backhome()">返回首页</div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs';
// import Vue from 'vue';
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
    data () {
        return {
            newsTitle:'',
            contHead:'',
            contAuthor:'',
            contTime:'',
            contCpname:'',
            mainbody: '',
            playerOptions : {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [
                    {
                        src: 'http://test.aliyun.vod.sgcctop.com/2e1858e93275429f86a60b80f6c6ebb5/de00e60821a245ea8b7e930ab3e7f7a3-0414f0e471cd0e756ada51fa17c9f66f-sd.mp4',  // 路径
                        type: 'video/mp4'  // 类型
                    }, 
                    // {
                    //     src: 'http://180.167.180.242:28082/portal/resources/v1/DBVideo.jsp?contId=1000118529&channelNodeId=368',
                    //     type: 'video/webm'
                    // }
                ],
                poster: "http://test.aliyun.vod.sgcctop.com/image/default/761D8B7CE12C4A6DA95DDD226F0F226C-6-2.png", //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                timeDivider: true,
                durationDisplay: true,
                remainingTimeDisplay: false,
                fullscreenToggle: true  //全屏按钮
                }
            }
            
        }
    },
    components: {
        videoPlayer
    },
    methods: {
        backhome: function () {
            this.$router.push({path:'/'})
        },
    },
    mounted () {
        const videoId = this.$route.params
        const contentData = { contId: videoId.id, cv: 400, debug: 1 };
        // console.log(contentData)
        const options = {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            url: '/api/portal/resources/v1/DBVideo.jsp',
            data: qs.stringify(contentData)
        };
        axios(options).then(res => {
            let data = res.data
            console.log(data)
            this.newsTitle = data.name
            this.contHead = data.headImage
            this.contAuthor = data.author
            this.contTime = data.distribute_time
            this.contCpname = data.cpName
            this.mainbody = data.shortDesc
            console.log(this.$refs.videoPlayer.style)
        })
    }
}
</script>

<style>
.video-js.vjs-playing .vjs-tech {
    pointer-events: auto;
}
.vjs-paused .vjs-big-play-button,
.vjs-paused.vjs-has-started .vjs-big-play-button {
    display: block;
}
.video-js .vjs-big-play-button{
    /* font-size: 2.5em;
    height: 2.5em;
    width: 2.5em;
    -webkit-border-radius: 2.5em;
    -moz-border-radius: 2.5em;
    border-radius: 2.5em; */
    background-color: #73859f;
    background-color: rgba(115,133,159,.5);
    border-width: 0.15em;
    line-height: 0.36rem;
}
.vjs-big-play-button .vjs-icon-placeholder {
    font-size: 0.3rem;
}
.video-player {
  display: block;
  width: 100%;
}
</style>
<style scoped>
.top {
  width: 100%;
  height:0.4rem;
  background: #fff;
  position: relative;
  font-size: 0.15rem;
  font-weight: bold;
  line-height: 0.4rem;
  text-align: center;
}
.bottom {
  width: 100%;
  height:0.4rem;
  background: lightgrey;
  position: fixed;
  bottom: 0;
  left: 0;
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
.content_wrap {
  width: 100%;
  padding: 0 0.1rem;
  position: relative;
  top: 0.3rem;
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
  overflow: hidden;
  margin-bottom: 0.5rem;
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
  bottom:0.6rem;
  right:0.2rem;
}
</style>

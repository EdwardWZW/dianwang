<template>
  <div>
     <Loading v-if="loadFlag" /> 
     <ul>
         <router-link tag="li" :to="{name:'themeDetail',params:{id1:item.nodeId, id2:item.specialContId}}" class="news_list" v-for="(item,i) of newsList" :key="i">
            <img class="list_img" :src="item.imageURL_big" alt="">
            <div class="news_list_bottom">
                <span class="time"> {{ item.distribute_time }} </span>
                <span class="tag"> {{ item.tag }} </span>
            </div>
         </router-link>
     </ul>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import axios from 'axios'
import qs from 'qs'


export default {
    data () {
       return {
           loadFlag: true,
           newsList: []
       }
    },
    components: {
        Loading
    },
    mounted () {
        const themesData = { modeType: 4, nodeId: 384, cv: 400, debug: 1 }
        axios({
            method: 'post',
            headers: {'content-type': 'application/x-www-form-urlencoded' },
            url:'/api/portal/resources/v1/special.jsp',
            data: qs.stringify(themesData),
        }).then(res => {
            this.loadFlag = false
            // console.log(res.data.specialList)
            this.newsList = res.data.specialList
            
        })
    }
}
</script>

<style scoped>
.news_list,.time,.tag {
    font-size: 0.08rem;
    color: #999;
}
.news_list {
    width: 100%;
    height: 1.5rem;
}
.news_list img {
    height: 80%;
}
.news_list_bottom {
    position: relative;
    width:100%;
    height:auto;
    padding:0.06rem 0.2rem;
}
.list_img {
    width: 100%;
    height: 18%;
}
.tag {
    border:1px solid #ccc;
    border-radius: 0.03rem;
    padding: 0.01rem 0.03rem;
    position: absolute;
    right: 0.2rem;
    top:0.03rem;
}
</style>

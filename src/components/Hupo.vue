<template>
  <div>
      <ul class="testul">
          <li v-for="(item,i) of arr" :key="i">
          <!-- <li v-for="(item,i) in arr" :key="i"> -->
              <!-- {{ item.message }} -->
          </li>
      </ul>
      <!-- 绑定class -->
      <!-- <button :class="{reset_btn:btnClass, def_btn:defaultClass, active:activeClass}" @click="changeBtn()"> {{ word }} </button> -->
      <!-- <button :class="btnObj" @click="changeBtn()"> {{ word }} </button> -->
      <van-button :loading="loadStatus" type="info" text="登录" loading-text="正在登录..." :class="btnObj" @click="changeBtn()"/>
      
      <!-- 绑定style   -->
      <!-- <button class="reset_btn btngreen" :style="{background:'green' ? 'yellow': 'green', color: '#333'}">click</button> -->
 
       <!-- 复选框  -->
       <!-- <div v-for="(item,i) of [1,2,3,4]" :key="i">
            <van-checkbox v-model="checked" class="fuxuan">
            自定义图标
            <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? activeIcon : inactiveIcon"
                class="fuxunimg"
            >
            </van-checkbox>
       </div> -->


       
            <!-- <van-checkbox class="fuxuan" v-model="checked" @click="checkedFn(i)" checked-color="#07c160">商品{{ i+1 }}</van-checkbox> -->
            <van-button @click="edit()" type="warning">商品管理</van-button>
            <div v-if="management">
                <div v-for="(item,i) of arr2" :key="i" class="fuxuan_wrap">
                    <div class="fuxuan">商品{{ i+1 }}</div>
                </div>
            </div>
            <div v-else>
                <van-checkbox-group class="fuxuan" v-model="checkResult" @change="checkedFn()" ref="checkboxGroup">
                    <div v-for="(item,i) of arr2" :key="i" class="fuxuan_wrap">
                        <van-checkbox  :name="i">
                            <span class="checkitem">商品{{ i+1 }}</span>
                        </van-checkbox>
                    </div>
                </van-checkbox-group>
            </div>
       



  </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Button);
Vue.use(Checkbox).use(CheckboxGroup);

export default {
    data () {
        return {
            arr: [
                { message: 'Foo' },
                { message: 'Bar' }
            ],
            arr2: [1,2,3,4],
            // btnClass:true,
            // defaultClass:true,
            // activeClass:false
            btnObj: {
                reset_btn:true,
                def_btn:true,
                active:false
            },
            loadStatus: false,
            checked: false,
            checkResult: [0,2],
            management:true
        }
    },
    // computed: {
    //     checkedArr.map()
    // },
    mounted () {
        this.word = '登录'
    },
    methods: {
        changeBtn () {
            // this.activeClass = !this.activeClass
            // this.defaultClass = !this.defaultClass
            this.btnObj.def_btn = !this.btnObj.def_btn
            this.btnObj.active = !this.btnObj.active
            if (!this.btnObj.def_btn) {
                this.loadStatus = true
                setTimeout(() => {
                    this.loadStatus = false
                    this.btnObj.def_btn = !this.btnObj.def_btn
                    this.btnObj.active = !this.btnObj.active
                }, 2000);
            }
        },
        // checkedFn (index) {
        //     console.log(index)
        // },
        checkedFn () {
            console.log(this.checkResult)
        },
        checkAll() {
            this.$refs.checkboxGroup.toggleAll(true);
        },
        toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
        },
        edit () {
            this.management = !this.management
        }
     }
}
</script>

<style scoped>
.testul {
    font-size: 0.2rem;
}
.reset_btn {
    display: block;
    font-size: 0.12rem;
    width: 2.3rem;
    height: 0.24rem;
    line-height: 0.24rem;
    border-radius: 0.03rem;
    border:none;
    margin: 0 auto;
    color: #fff;
    margin-bottom: 0.2rem;
}
.btngreen {
    background: green;
}
.def_btn {
    background: #66f;
}
.active {
    background: rgb(81, 166, 247);
}
.fuxuan_wrap {
    box-sizing: border-box;
    width:100%;
    height: 0.3rem;
    padding: 0.1rem;
}
.fuxuan {
    font-size: 0.14rem;
}
.fuxunimg {
    width:0.1rem;
    height: 0.1rem;
}
.checkitem {
    display: inline-block;
    position: relative;
    left: 0.02rem
}
</style>

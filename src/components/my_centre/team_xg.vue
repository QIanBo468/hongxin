<template>
  <div class="teamxg">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">我的团队</slot>
    </van-nav-bar>
    <van-tabs v-model="active" 
    title-active-color='#ffddaa' 
    title-inactive-color='#fff' 
    color='#ffddaa'
    background='transparent'
    >
      <van-tab title="直接推荐账户">
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
        <div class="direct" v-for="(item,index) of directlist" :key="index">
          <div class="direct-content">
            <span>账号</span>
            <p>{{item.account}}</p>
          </div>
           <div class="direct-content">
            <span>昵称</span>
            <p>{{item.usename}}</p>
          </div>
           <!-- <div class="direct-content">
            <span>排单币余额</span>
            <p>{{item.balance}}</p>
          </div> -->
           <div class="direct-content">
            <span>注册时间</span>
            <p>{{item.time}}</p>
          </div>
           <div class="direct-content">
            <span>状态</span>
            <p  :style="{color:item.active === 0 ? '#f00': '#00FFFF'}">{{item.active === 0 ? '未激活': '已完成'}}</p>
          </div>
        </div>
        </van-list>
      </van-tab>
      <van-tab title="关联伙伴账户">
               <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
         <div class="direct" v-for="(item,index) of indirectlist" :key="index">
          <div class="direct-content">
            <span>账号</span>
            <p>{{item.account}}</p>
          </div>
           <div class="direct-content">
            <span>昵称</span>
            <p>{{item.usename}}</p>
          </div>
           <!-- <div class="direct-content">
            <span>排单币余额</span>
            <p>{{item.balance}}</p>
          </div> -->
           <div class="direct-content">
            <span>注册时间</span>
            <p>{{item.time}}</p>
          </div>
           <div class="direct-content">
            <span>状态</span>
            <p :style="{color:item.active === 0 ? '#f00': '#00FFFF'}">{{item.active === 0 ? '未激活': '已完成'}}</p>
          </div>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 2,
       loading: false,
      finished: false,
      directlist:[
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:0},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:1},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:0},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:1}
      ],
      indirectlist: [
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:0},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:1},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:0},
        {account:18866668888,usename:'usdt',balance:100,time:'2019-11-5 14:01',active:1}

      ]
    };
  },
  created() {
    this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/myuser/team').then(res=>{
      console.log(res)
    })
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
     onLoad() {
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
     
          this.finished = true;
  }
}
}
</script>

<style lang='less' scope>
  .teamxg{
    color: #ffddaa;
    padding: 10px;
    .direct{
      display: flex;
      justify-content: space-between;
      background: #1C1C51;
      margin-top: 10px;
      padding: 5px 5px;
      border-radius: 8px;
      .direct-content{
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > p{
          color: #fff;
          padding: 0;
          margin: 5px 0;
          font-size: 12px;
        }
      }
    }
  }


.jhnav {
  background: none;
  margin-bottom: 10px;
  .van-nav-bar__title {
    color: #ffddaa;
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-hairline--bottom::after {
  border: none;
}
</style>
<template>
  <div class="detailbuy">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{activetype == 0? '购买明细': (activetype ==1 ? '出售明细': '收益明细')}}</slot>
    </van-nav-bar>
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="activetype !=2"
    >
      <div
        class="datail-moneylist"
        v-for="(item, index) of list"
        :key="index+'list'"
        @click="$router.push({path: '/helplock',query:{ items: item.id,type:activetype}})"
      >
        <div class="list-left">
          <p>编号:{{item.timeid}}</p>
          <div class="left-active">
            
            <div class="red"></div>
            {{item.note}}
          </div>
          
        </div>
        <div class="list-right">
          <p class="right-time">{{item.date}}</p>
          <div class="purse">￥{{item.jbsum}}</div>
        </div>
      </div>
    </van-list>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="activetype ==2"
    >
      <div class="datail-moneylist" v-for="(item, index) of list" :key="index+'list'">
        <div class="list-left">
          <div class="left-active">
            <div class="red"></div>编号：{{item.timeid}}
          </div>
          <p>利息发放：{{item.stoptime}}天</p>
        </div>
        <div class="list-right">
          <p class="right-time">{{item.create_time}}</p>
          <div class="purse">￥{{item.commission}}</div>
        </div>
      </div>
    </van-list>
    <!-- <div class="yijian" @mousedown="submit" v-if="activetype == 2">一键收获</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activetype: null,
      loading: false,
      finished: false,
      list: []
    };
  },
  created() {
    this.activetype = this.$route.query.type;
    console.log(this.activetype);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      if (this.activetype == 0) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/tgbz/buylist")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.tgbzlist;
              this.loading = false;
              this.finished = true;
            }
          });
      } else if (this.activetype == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/jsbz/selllist")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.jsbzlist;
              this.loading = false;
              this.finished = true;
            }
          });
      } else {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/freeze_log")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.loglist;
              this.loading = false;
              this.finished = true;
            }
          });
      }
    },
    submit(){
      this.$axios.fetchPost('http://hxly.czxxyk.cn/home/info/finish_settle')
      .then(res=>{
        console.log(res)
        if(res.code ==1){
          this.onLoad()
          this.$toast(res.msg)
        } else {
          this.$toast(res.msg)
        }
      })
    }
  }
};
</script>

<style lang='less' scope>
.detailbuy {
  position: relative;
  width: 100%;
  height: 100%;
}
.datail-moneylist {
  background: #ffddaa;
  color: #26263c;
  height: 80px;
  margin-bottom: 5px;
  padding: 0 11px;
  margin: 10px 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  p {
    margin: 0;
    padding: 0;
  }
  .list-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .left-active {

      display: flex;
      align-items: center;
      .red {
        background: #f00;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 5px;
      }
      color: #0b0b1f;
      font-size: 15px;
    }
    p {
      font-size: 14px;
      color: #000;
    }
  }
  .list-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    p {
      margin: 0;
      padding: 0;
    }
    .right-time {
      color: #956621;
      font-size: 12px;
    }
    .purse {
      color: #000;
      font-weight: bold;
    }
  }
}
.yijian {
  // background: #ffddaa;
  background: linear-gradient(90deg,#ffddaa , #E6AF61);
  width: 100%;
  height: 40px;
  // border-radius: 8px;
  text-align: center;
  line-height: 40px;
  font-size: 15px;
  font-weight: bold;
  position: fixed;
  // left: 70%;
  bottom: 0;
  z-index: 2;
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
<template>
  <div class="Jhcode">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="激活码管理">激活码管理</slot>
    </van-nav-bar>

    <div class="integral-contnet">
      <div class="integral-contnet-head" @click="$router.push({path:'mydeal',qeury:{type: 1}})">
        <div class="integral-contnet-head-left">激活码余额(个)</div>
        <div class="integral-contnet-head-cont">{{integral}}</div>
        <div class="integral-contnet-head-right"></div>
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="peopleId"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="转入激活码到"
            placeholder="输入账号"
          />
        </van-cell-group>
      </div>
      <div>
        <van-cell-group>
          <van-field
            v-model="peopleNum"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="转入激活码数量"
            placeholder="输入数量"
          />
        </van-cell-group>
      </div>
    </div>
    <div class="integral-btn">
      <van-button size="large" color="#ffddaa" @click="submit">转出</van-button>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="dealtitle" v-for="(item, index) of mydata" :key="index">
        <!-- <span>{{item.account}}</span>
        <span>{{item.active_time}}</span>-->

        <div class="jh-content">
          <span>账号</span>
          <p>{{item.account}}</p>
        </div>
        <div class="jh-content">
          <span>注册时间</span>
          <p>{{item.reg_time}}</p>
        </div>
        <div class="jh-content"  @click="showPopup(item.account)">
          <!-- <span>状态</span> -->
          <p :style="{color: item.isactive ==1 ? '#f00': '#fff' }">激活</p>
        </div>
        <!-- <span>{{item.isactive}}</span> -->
        <!-- <span :class="[item.isactive == 1 ? 'blue' : 'red']">激活</span> -->
      </div>
    </van-list>
    <van-popup class="teamshow" v-model="show">
      <div class="show">
        <div class="showtitle">.. 我的激活码 ..</div>
        <div class="shownum">
          <span>{{integral}}</span>个
        </div>
        <div class="xian"></div>
        <div class="showjihuo" @click="jihuosubmit">
          <span>立即激活</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      zhanghao: "",
      shuliang: null,
      integral: "",
      peopleId: "",
      peopleNum: "",
      mydata: [],
      show:false,
      clksub:null
    };
  },
  created() {
    // this.getdata();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup(item) {
      this.show = true;
      this.clksub = item
    },
    submit() {
      this.$axios
        .fetchPost("http://hxlc.ltlfd.cn/home/info/pin", {
          account: this.peopleId,
          num: this.peopleNum
        })
        .then(res => {
          console.log(res);
          this.$toast(res.msg);
          this.getdata();
        });
    },
    jihuosubmit() {
      this.$axios.fetchGet('http://hxlc.ltlfd.cn/home/info/activeOp',
      {account: this.clksub})
      .then(res=>{
        console.log(res)
        this.show = false
        if(res.data.code ==1 ){
          this.onLoad()
        } else {
          this.$toast(res.data.msg)
        }
      })
    },
    onLoad() {
      this.getdata()
      this.loading = false
      this.finished = true
    },
    getdata() {
      this.$axios.fetchPost("http://hxlc.ltlfd.cn/home/info/pin").then(res => {
        console.log(res);
        this.integral = res.data.user.pin;
        this.mydata = res.data.onelist;
      });
    }
  }
};
</script>

<style lang='less' scope>
.integral-contnet {
  .integral-contnet-head {
    background: url("../../../static/images/titleBg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    height: 85px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    .integral-contnet-head-left {
      position: absolute;
      top: 3px;
      left: 10px;
      font-size: 16px;
    }
    .integral-contnet-head-cont {
      display: flex;
      align-items: center;
      font-size: 45px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
    }
  }
  // 输入框
  .van-cell-group {
    background: transparent;
    .van-cell__title {
      color: #ffffff;
    }
    .van-cell {
      background: transparent;
      padding: 10px;
      .van-field__control {
        color: #ffffff;
      }
      border: 0.5px solid #ffddaa;
      border-top: 0;
    }
  }
}
  .dealtitle{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      background: #1C1C51;
      margin-top: 10px;
      padding: 5px 5px;
      border-radius: 8px;
      color: #ffddaa;
      .jh-content{
        flex: 1;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > p{
          color: #fff;
          padding: 0;
          margin: 5px 0;
          font-size: 14px;
        }
      }
      .jh-content:last-child{
        align-self: center;
        p{
          font-size: 16px;
        }
      }
    }

.teamshow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 341px;
  background-color: transparent  !important;
}
.show {
  width: 250px;
  height: 301px;
  background: url("../../../static/images/5.png") no-repeat no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 20px 13px;
  // z-index: 9;
  .showtitle {
    font-size: 16px;
    color: #000;
    letter-spacing: 2px;
    font-weight: bold;
    position: absolute;
    top: 10px;
  }
  .shownum {
    color: #fff;
    width: 224px;
    text-align: center;
    line-height: 40px;
    background: url("../../../static/images/9@3x.png") no-repeat no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
    span {
      font-size: 30px;
      color: #fff;
    }
  }
   .xian {
    height: 1px;
    width: 90%;
    border: 0.5px dashed #956621;
    position: absolute;
    top: 47%;
    // background: #956621;
  }
  .showjihuo {
    width: 224px;
    height: 44px;
    text-align: center;
    background: url("../../../static/images/9@3x.png") no-repeat no-repeat;
    background-size: 100%;
    span {
      line-height: 44px;
      font-size: 14px;
      color: #fff;
    }
    position: absolute;
    bottom: 30%;
  }
}

.integral-btn {
  margin: 30px 0;
}
.integral-input-text {
  color: #ffddaa;
}
.van-field__body {
  display: flex;
  justify-content: flex-end;
}
.van-button {
  // background: transparent;
  color: #000 !important ;
}

.Jhcode {
  padding: 0 11px;
  .jhnav {
    background: transparent !important;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  .jh_content {
    background: url(../../../static/images/14@3x.png) no-repeat no-repeat;
    display: flex;
    flex-direction: column;
    border-radius: 3px;
  }
}
.van-hairline--bottom::after {
  border: none;
}
</style>
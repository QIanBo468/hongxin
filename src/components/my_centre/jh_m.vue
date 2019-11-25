<template>
  <div class="integral">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{type == 0 ? '弘信积分': (type == 1 ? '激活码管理' : '排单币')}}</slot>
    </van-nav-bar>
    <!-- 激活码展示 -->
    <div class="integral-contnet" v-if="type == 1">
      <div class="integral-contnet-head">
        <div class="integral-contnet-head-left">激活码余额(个)</div>
        <div class="integral-contnet-head-cont">{{integral}}</div>
        <div class="integral-contnet-head-right"></div>
      </div>

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
      <!-- </div> -->
    </div>
    <!-- 积分展示 -->
    <div class="integral-contnet" v-else-if="type == 0">
      <div class="integral-contnet-head">
        <div class="integral-contnet-head-left">弘信积分个数(个)</div>
        <div class="integral-contnet-head-cont">{{integral}}</div>
        <div class="integral-contnet-head-right"></div>
      </div>

      <van-cell-group>
        <van-field
          v-model="jifenid"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="转入弘信积分到"
          placeholder="输入账号"
        />
      </van-cell-group>
      <!-- </div> -->

      <van-cell-group>
        <van-field
          v-model="jifennum"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="转入弘信积分数量"
          placeholder="输入数量"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="erji"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="输入二级密码"
          placeholder="输入密码"
        />
      </van-cell-group>
      <!-- </div> -->
    </div>

    <!-- 排单币展示 -->
    <div class="integral-contnet" v-else>
      <div class="integral-contnet-head">
        <div class="integral-contnet-head-left">排单币(个)</div>
        <div class="integral-contnet-head-cont">{{integral}}</div>
        <div class="integral-contnet-head-right"></div>
      </div>
      <!-- <div> -->
      <van-cell-group>
        <van-field
          v-model="jifenid"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="转入排单币到"
          placeholder="输入账号"
        />
      </van-cell-group>
      <!-- </div> -->
      <!-- <div> -->
      <van-cell-group>
        <van-field
          v-model="jifennum"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="转入排单币数量"
          placeholder="输入数量"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="erji"
          label-width="60%"
          input-align="right"
          label-class="integral-input-text"
          label="输入二级密码"
          placeholder="输入密码"
        />
      </van-cell-group>
      <!-- </div> -->
    </div>

    <div class="integral-btn">
      <van-button size="large" color="#ffddaa" @click="submit">转出</van-button>
    </div>
    <div class="intergral-record">
      <div class="intergral-record-title">
        <div class="intergral-record-title-left">
          <div style="width:0px;height:10px; border:1px solid #fff; margin-right:10px;"></div>
          <div>
            <p style="color:#FFF;">近五次{{type == 0 ? '弘信积分': (type == 1 ? '激活码管理' : '排单币')}}交易记录</p>
            <!-- {{type == 0 ? '弘信积分': (type == 1 ? '激活码管理' : '排单币')}} -->
          </div>
        </div>
        <div>
          <p style="color:#ffddaa;" @click="mydeals">全部交易记录</p>
        </div>
      </div>
      <div class="deal">
        <div class="dealtitle">
          <span>时间</span>
          <span>{{dealtype.dzhanghu}}</span>
          <span>{{dealtype.dnum}}</span>
          <span>{{dealtype.dway}}</span>
        </div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="dealtitle" v-for="(item, index) of mydata" :key="index">
            <span>{{item.time}}</span>
            <span>{{item.ug_othraccount ? item.ug_othraccount : item.zhanghu}}</span>
            <span>{{item.num}}</span>
            <span :class="[item.way =='激活' ? 'blue' : 'red']">{{item.way}}</span>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 0,
      integral: null,
      peopleId: null, // 激活码转入id
      peopleNum: null, // 激活码数量
      jifenid: null, // 积分转入id
      jifennum: null, // 积分数量
      erji: "", //二级密码
      dealtype: {
        dzhanghu: "转入/转出",
        dnum: "数量",
        dway: "方式"
      },
      title: "激活码管理",
      loading: false,
      finished: false,
      mydata: []
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    getdata() {
      this.type = this.$route.query.type;
      if (this.type == 0) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/integral")
          .then(res => {
            console.log(res);
            this.mydata = res.data.coinlist;
          });
      } else if (this.type == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/pin")
          .then(res => {
            console.log(res);
            this.mydata = res.data.coinlist;
          });
      } else {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/buycoin")
          .then(res => {
            console.log(res);
            this.mydata = res.data.coinlist;
          });
      }
      this.$axios
        .fetchPost("http://hxly.czxxyk.cn/home/info/integral")
        .then(res => {
          console.log(res);
          if (this.type === 0) {
            this.integral = res.data.user.credit3;
          } else if (this.type === 1) {
            this.integral = res.data.user.pin;
          } else {
            this.integral = res.data.user.buycoin;
          }
        });
    },
    submit() {
      if (this.type == 0) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/integral", {
            account: this.jifenid,
            num: this.jifennum,
            secpwd: this.erji
          })
          .then(res => {
            console.log(res);
            this.$toast(res.msg);
            this.getdata();
            if (res.code == 0) {
              this.jifenid = null,
               this.jifennum = null,
               this.erji ='',
              this.$router.go(0);
            }
          });
      } else if (this.type == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/pin", {
            account: this.peopleId,
            num: this.peopleNum,
            secpwd: this.erji
          })
          .then(res => {
            console.log(res);
            this.$toast(res.msg);
            this.getdata();
            if (res.code == 0) {
              this.peopleId = null,
              this.peopleNum = null,
              this.erji = ''
              this.$router.go(0);
            }
          });
      } else {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/info/buycoin", {
            account: this.jifenid,
            num: this.jifennum,
            secpwd: this.erji
          })
          .then(res => {
            console.log(123132, res);
            this.$toast(res.msg);
            this.getdata();
            if (res.code == 0) {
              this.jifenid = null,
              this.jifennum = null,
              this.erji = '',
              this.$router.go(0);
            }
          });
      }
    },
    onLoad() {
      (this.loading = false), (this.finished = true);
    },
    mydeals() {
      console.log(this.type);
      this.$router.push({ path: "mydeal", query: { type: this.type } });
    }
    // onClickRight() {
    //   Toast('按钮');
    // }
  }
};
</script>

<style lang='less' scope>
.deal {
  .dealtitle {
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #ffddaa;
    font-size: 12px;
    color: #ffffff;
    span {
      display: inline-block;
      flex: 1;
      text-align: center;
    }
    .red {
      color: #f00;
    }
    .blue {
      color: #00ffff;
    }
  }
}
.van-button__text {
  color: #000;
}
.integral {
  padding: 0 20px;
}
.integralnav {
  background: transparent;
}
.van-nav-bar__title {
  color: #f2c684;
  border: 0;
  font-family: PingFang SC;
  font-weight: 800;
  color: rgba(242, 198, 132, 1);
}
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

  //   .van-cell__value {
  //     width: 30%;
  //   }
}
// 按钮
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
.intergral-record {
  .intergral-record-title {
    display: flex;
    justify-content: space-between;
    .intergral-record-title-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }

  .intergral-record-none {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 10px;
    .intergral-record-none-text {
      display: flex;
      justify-content: center;
    }
    .intergral-record-none-imgbox {
      display: flex;
      justify-content: center;
      .van-image {
        width: 152px;
        height: 135px;
      }
    }
  }
  .intergral-record-list {
    .intergral-record-item {
      border: 0.01rem solid #f2c684;
      color: #ffffff;
      height: 2.5rem;
      > div {
        display: flex;
        justify-content: center;
      }
    }
    .intergral-record-item:not(:first-child) {
      border-top: 0;
    }
  }
}

.jhnav {
  background: transparent !important;
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
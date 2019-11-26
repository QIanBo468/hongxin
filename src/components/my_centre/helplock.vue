<template>
  <div class="helplock">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="帮助记录">明细记录</slot>
    </van-nav-bar>

    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="type == 0"
    >
      <div class="help-content" v-for="item of pstate" :key="item.id">
        <div class="cont-top">
          <div class="arrow">
            <p>≈{{item.usdtprice}}</p>USDT
            <p>￥{{item.jb}}</p>
          </div>
          <div class="cont-left">
            <!-- <img width="58px" height="58px" :src="item.pavatar" alt /> -->
            <div class="seter">
              <div>
                <div class="g"></div>
                <span>{{item.pname}}</span>
              </div>
              <!-- <div class="clear">
                <div class="g"></div>
                <span>{{item.p_user}}</span>
              </div>-->
            </div>
          </div>
          <div class="cont-right">
            <!-- <img width="58px" height="58px" :src="item.gavatar" alt /> -->
            <div class="seter">
              <div>
                <span>{{item.gname}}</span>
                <div class="g"></div>
              </div>
              <!-- <div class="clear">
                <span>{{item.g_user}}</span>
                <div class="g"></div>
              </div>-->
            </div>
          </div>
        </div>
        <div class="cont-bottom">
          <div class="useid">
            <p>打款时间: {{item.dakuan}}</p>
            <div class="danhaotime">
              <div>单号：{{item.id}}</div>
              <div>{{item.date}}</div>
            </div>
          </div>
          <div class="state">
            <div
              @click="showPopups(item)"
              :class="['state-cont',item.zt === '2'? 'blue' : 'red']"
            >{{item.zt == '1'? '已付款' :( item.zt == 2 ? '已完成': (item.creditpay ==1 ? '积分支付' : '待打款'))}}</div>

            <!-- <van-cell > -->
            <div class="state-cont" @click="showPopup(item)">详细资料</div>
            <!-- </van-cell> -->
            <van-image
              v-preview="item.pic"
              v-if="item.zt"
              width="40px"
              height="40px"
              :src="item.pic"
              alt
            />
          </div>
        </div>
      </div>
    </van-list>

    <!-- <van-tab title="接受帮助" name="j"> -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-if="type ==1"
    >
      <div class="help-content" v-for="item of pstate" :key="item.id">
        <div class="cont-top">
          <div class="arrow">
            <p>≈{{item.usdtprice}}</p>
            <!-- <van-icon name="exchange" /> -->
            USDT
            <p>￥{{item.jb}}</p>
          </div>
          <div class="cont-left">
            <div class="seter">
              <div>
                <div class="g"></div>
                <span>{{item.pname}}</span>
              </div>
            </div>
          </div>
          <div class="cont-right">
            <div class="seter">
              <div>
                <span>{{item.gname}}</span>
                <div class="g"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-bottom">
          <div class="useid">
            <p>打款时间: {{item.dakuan}}</p>
            <div class="danhaotime">
              <div>单号：{{item.id}}</div>
              <div>{{item.date}}</div>
            </div>
          </div>
          <div class="state">
            <div
              @click="queren(item)"
              :class="['state-cont',item.zt === '2'? 'blue' : 'red']"
            >{{item.zt == '1'? '待确认' :( item.zt == 2 ? '已完成': '待收款')}}</div>

            <div class="state-cont" @click="showPopup(item)">详细资料</div>

            <van-image
              v-preview="item.pic"
              v-if="item.zt"
              width="40px"
              height="40px"
              :src="item.pic"
              alt
            />
          </div>
        </div>
      </div>
    </van-list>
    <van-popup
      class="help-pop"
      v-model="show"
      close-icon="close"
      closeable
      close-icon-position="top-right"
    >
      <div class="shows">
        <div class="use">
          <p>打款方昵称:</p>
          {{showdata.pname}}
        </div>
        <div class="use">
          <!-- <span></span> -->
          <p>打款方推荐人昵称:</p>
          {{showdata.pnickname}}
          <!-- <span></span> -->
        </div>
        <div class="use">
          <p>收款方昵称:</p>
          {{showdata.gname}}
          <!-- <span></span> -->
        </div>
        <div class="use">
          <p>收款方推荐人昵称:</p>
          {{showdata.gnickname}}
        </div>
        <div class="dingdan">
          <p>订单生成时间:</p>
          <span>{{showdata.date}}</span>
          <p>订单号</p>
          <span>{{showdata.id}}</span>
        </div>
        <div class="user">
          <div class="user-dizhi">
            <p>USDT地址</p>
            <span>{{showdata.usdt}}</span>
          </div>
          <button class="userbtn" @click="copy(showdata.usdt)">复制地址</button>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="shows" close-icon="close" closeable close-icon-position="top-right">
      <div class="pou">
        <p>上传截图凭证</p>
        <div>
          <van-uploader preview-size="80px" :max-count="1" v-model="fileList" multiple />
          <van-circle
            v-if="jindutiao"
            v-model="currentRate"
            :rate="currentRates"
            :speed="100"
            :text="text"
          />
        </div>
        <van-button class="btn" @click="paysubmit" type="default" color="#ffddaa">确认提交</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      show: false,
      shows: false,
      showdata: {},
      showsdata: {},
      usestate: [],
      fileList: [],
      shoukuanimg: {},
      loading: false,
      finished: false,
      pstate: [],
      id: null,
      type: null,
      actives: "j",
      state: "已付款",
      currentRate: 0,
      currentRates: 0,
      jindutiao: false
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    }
  },
  created() {
    this.id = this.$route.query.items;
    this.type = this.$route.query.type;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup(item) {
      this.show = true;
      this.showdata = item;
      console.log(this.showdata);
    },
    showPopups(item) {
      if (item.zt != 2 && item.creditpay != 1) {
        this.shows = true;
        this.showsdata = item;
        console.log(this.showsdata);
      } else if (item.creditpay == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/index/creditPay", {
            id: item.id
          })
          .then(res => {
            this.$toast(res.msg);
            this.$router.go(0);
          });
      }
    },
    onLoad() {
      this.shuaxin();
    },
    shuaxin() {
      if (this.type == 0) {
        console.log(this.id);
        this.actives = "t";
        this.$axios
          .fetchGet("http://hxly.czxxyk.cn/home/tgbz/transaction", {
            id: this.id
          })
          .then(res => {
            console.log(res);
            // res.data.data.forEach(item => {
            this.pstate = res.data.data;
            console.log(this.pstate);
            // });
            this.loading = false;
            this.finished = true;
            this.fileList = [];
            this.jindutiao = false;
            this.currentRates = 0;
            this.currentRate = 0;
          });
      } else {
        console.log("111");
        this.$axios
          .fetchGet("http://hxly.czxxyk.cn/home/jsbz/transaction", {
            id: this.id
          })
          .then(res => {
            console.log(res);
            // res.data.data.forEach(item => {
            this.pstate = res.data.data;
            console.log(this.pstate);
            // });
            this.loading = false;
            this.finished = true;
            this.fileList = [];
            this.jindutiao = false;
            this.currentRates = 0;
            this.currentRate = 0;
          });
      }
    },
    paysubmit() {
      var that = this;
      console.log(this.showsdata.id);
      if (this.fileList) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/index/home_ddxx_pcz_cl", {
            id: this.showsdata.id,
            id_pic_1: this.fileList
          })
          .then(res => {
            this.jindutiao = true;
            this.currentRates = 30;
            this.currentRates = 100;
            setTimeout(function() {
              console.log(res);
              if (res.code == 1 && that.currentRates) {
                that.showsdata.zt = 1;
                that.shows = false;

                // window.location.reload()
                // that.payqueren()

                that.$toast(res.msg);

                that.shuaxin();
              } else {
                that.$toast(res.msg);
                that.jindutiao = false;
                that.currentRates = 0;
              }
            }, 2000);
          });
      }
    },

    // 确认收款
    queren(item) {
      console.log(item.zt);
      if (item.zt == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/index/home_ddxx_gcz_cl", {
            id: item.id,
            comfir: item.zt
          })
          .then(res => {
            this.$toast(res.msg);
            console.log(res);
            window.location.reload();
            this.shuaxin();
            // this.onLoad();
          });
      }
    },
    copy(num) {
      this.show = true;
      this.$toast("已复制");
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", num);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
      }
      document.body.removeChild(input);
    }
  }
};
</script>

<style lang='less' scope>
.helplock {
  padding: 0 11px;
}
// 内容样式
.van-tabs__content {
  width: 100%;
}
.help-content {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .cont-top {
    width: 100%;
    height: 100px;
    position: relative;

    display: flex;
    .arrow {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
      z-index: 1;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px 0px #ffffff;
      background: #ffddaa;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      p {
        color: #000;
        z-index: 9;
        margin: 0;
        padding: 0;
        font-size: 12px;
      }
      .van-icon {
        font-size: 16px;
      }
    }
    .cont-left {
      margin-right: 10px;
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      img {
        position: absolute;
        top: -27px;
        left: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-right: 10.5px;
      }

      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
    .cont-right {
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      align-items: flex-end;
      img {
        position: absolute;
        top: -27px;
        right: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-left: 10.5px;
      }
      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          //   margin-top: 16px;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
  }
  .cont-bottom {
    background: #1c1c51;
    width: 100%;
    margin-top: 2px;
    border-radius: 4px;
    display: flex;
    height: 78px;
    padding: 14px 9px;
    box-sizing: border-box;
    .useid {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      p {
        font-size: 12px;
        margin: 0;
        padding: 0;
        color: #fff;
      }
      .danhaotime {
        div:first-child {
          color: #ffddaa;
          font-size: 12px;
          margin-top: 14px;
        }
        div:last-child {
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .state {
      flex: 1;
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      .state-cont {
        width: 60px;
        height: 25px;
        border-radius: 12.5px;
        background: #ffddaa;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        color: #0b0b1f;
      }
      img {
        z-index: 99;
      }
      .red {
        background: #f00;
      }
      .blue {
        background: aqua;
      }
    }
  }
}

// tab 样式
.helptab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.van-tab {
  border: none !important;
}
.van-tabs--card > .van-tabs__wrap {
  width: 200px;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  border-radius: 15px;
}
.van-tabs__nav--card {
  border-radius: 15px !important;
  border: 1px solid #000;
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

// 详细信息
.help-pop {
  width: 60%;
  height: 60%;
  // background: #fff;
  border-radius: 8px;
  padding: 5px;
}
.shows {
  // width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background: #212243;
  padding: 0 5px;
  .use {
    width: 100%;

    font-size: 13px;
    display: flex;
    align-items: center;

    color: #d4850e;
    margin-bottom: 10px;
    .user-dizhi{
      
      width: 100%;
    }
  }
  p {
    color: #fff;
    margin: 5px;
    font-size: 14px;
  }
  span {
    width: 150px;
    font-size: 13px;
    color: #d4850e;
    display: inline-block;
    margin-left: 10px;
    // display: flex;
    // flex-wrap: wrap;
    word-wrap: break-word;
    word-break: normal;
  }
}
.user {
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    align-items: center;
  }
  p {
    font-size: 12px;
  }
  .userbtn {
    font-size: 12px;
    width: 80px;
    height: 20px;
    border: none;
    background: #ffddaa;
    border-radius: 6px;
  }
}
// 支付弹窗
.pou {
  width: 200px;
  height: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  // justify-content: space-around;
  p {
    margin: 0 0 50px 0;
    padding: 0;
  }
  .van-uploader {
    width: 100%;
    // height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    margin-left: -44px;
  }
}
</style>
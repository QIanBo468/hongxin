<template>
  <div class="help">
    <van-image
      style="position: absolute; top:0.7rem;z-index:999;"
      width="1.5rem"
      height="1.5rem"
      @click="onClickLeft"
      src="./static/images/left@3x.png"
    />
    <van-nav-bar class="team-title" :title="checkNum == 0 ? '购买旅游套餐':'出售旅游套餐'" :border="false" />/
    <!--right-text="帮助记录"   @click-right="onClickRight"-->
    <!-- <div class="help-check acea-row row-center-wrapper">
      <div
        class="help-check-item acea-row row-center-wrapper"
        v-bind:class="checkNum==0? 'check' :'' "
        v-on:click="check(0)"
      >提供帮助</div>
      <div
        class="help-check-item acea-row row-center-wrapper"
        v-bind:class="checkNum==1? 'check' :'' "
        v-on:click="check(1)"
      >接受帮助</div>
    </div>-->

    <div class="help-head acea-row row-center-wrapper" v-show="checkNum==0">
      <div class="help-contnet-head-left">购买金额</div>
      <div class="help-contnet-head-cont">
        <span>1000</span>
        <!-- <span style="font-size:14px;margin-left:-9px;">00</span> -->
      </div>
    </div>
    <div class="accept-head acea-row row-between-wrapper" v-show="checkNum==1">
      <div class="accept-head-left acea-row row-center-wrapper row-column">
        <div class="accept-num">
          <span>{{staticNum}}.</span>
          <span style="font-size:14px;margin-left:-9px;">00</span>
        </div>
        <div class="accept-text">静态钱包</div>
      </div>
      <div class="accept-head-right acea-row row-center-wrapper row-column">
        <div class="accept-num">
          <span>{{DynamicNum}}.</span>
          <span style="font-size:14px;margin-left:-9px;">00</span>
        </div>
        <div class="accept-text">动态钱包</div>
      </div>
    </div>
    <div class="help-table">
      <div v-show="checkNum==0">
        <van-cell title="排单币" value="1个" :border="false" />
        <p>注: 新账户首次排单，需手动操作，一次生成两单，消耗两个排单币，以后由系统自动排单，注意保持账户上排单币充足即可</p>
        <!-- <van-cell-group>
          <van-field
            v-model="toPeopleNum"
            type="number"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="提供帮助"
            placeholder="输入金额"
            disabled
          />
        </van-cell-group>-->
        <van-button size="large" color="#ffddaa" style="color:#000;" @click="paidansub">确认</van-button>
      </div>

      <div v-show="checkNum==1">
        <van-cell class="accept-check" :border="false">
          <div class="help-xx">
            <van-radio-group v-model="radio" class="acea-row row-between-wrapper">
              <van-radio
                name="2"
                class="acea-row row-center-wrapper"
                :class="radio==2?'check':'checked'"
              >
                静态钱包
                <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </van-radio>
              <van-radio
                name="1"
                class="acea-row row-center-wrapper"
                :class="radio==1?'check':'checked'"
              >
                动态钱包
                <img
                  slot="icon"
                  slot-scope="props"
                  :src="props.checked ? activeIcon : inactiveIcon"
                />
              </van-radio>
            </van-radio-group>
          </div>
        </van-cell>
        <van-cell-group>
          <van-field
            v-model="toPeoplesNums"
            type="number"
            label-width="60%"
            input-align="right"
            label-class="integral-input-text"
            label="出售金额"
            placeholder="输入金额"
          />
        </van-cell-group>
        <van-button size="large" color="#ffddaa" style="color:#000;" @click="tixiansub">确认</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      checkNum: 0,
      toPeopleNum: 1000, //提供帮助
      toPeoplesNums: null,
      helpNum: 0,
      acceptNum: "", //接受帮助
      DynamicNum: 0, //动态钱包
      staticNum: 0, //静态钱包
      radio: "2", //单选
      inactiveIcon: "./static/images/check.png",
      activeIcon: "./static/images/checked.png"
    };
  },
  created() {
    console.log(this.$route.query.type);
    this.checkNum = this.$route.query.type;
    // buysum 总数  credit1 静态钱包 2 动态 3积分
    this.pinnum();
  },
  methods: {
    onClickLeft() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        return false;
      } else {
        this.$router.go(-1);
      }
    },
    pinnum() {
      this.$axios.fetchPost("http://hxly.czxxyk.cn/home/jsbz/jsbz").then(res => {
        console.log(res);
        if (res.code == 1) {
          this.helpNum = res.data.user.buysum;
          this.DynamicNum = res.data.user.credit2;
          this.staticNum = res.data.user.credit1;
        }
      });
    },
    onClickRight() {
      this.$router.push("/helplock");
    },
    paidansub() {
      this.$axios
        .fetchPost("http://hxly.czxxyk.cn/home/tgbz/tgbzcl", {
          amount: this.toPeopleNum
        })
        .then(res => {
          console.log(res);
          this.$toast(res.msg);
          this.pinnum();
        });
    },
    tixiansub() {
      if (this.radio == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/jsbz/jsbzcl", {
            sellmoney: this.toPeoplesNums,
            selltype: 2002
          })
          .then(res => {
            console.log(res);
            Toast(res.msg);
            this.pinnum();
          });
      } else {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/jsbz/jsbzcl", {
            sellmoney: this.toPeoplesNums,
            selltype: 2001
          })
          .then(res => {
            console.log(res);
            Toast(res.msg);
            this.pinnum();
          });
      }
    },
    check(num) {
      this.checkNum = num;
    }
  }
};
</script>

<style lang='less' scope>
.help {
  padding: 0 1rem;

  .van-nav-bar {
    background: transparent;
    .van-nav-bar__title {
      color: #f2c684;
      font-size: 20px;
    }
    .van-nav-bar__right {
      .van-nav-bar__text {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
  }

  .help-check {
    color: #ffffff;
    font-size: 0.9rem;
    color: #ffddaa;
    margin-top: 1rem;
    div:first-child {
      border-radius: 1rem 0 0 1rem;
    }
    div:nth-child(2) {
      border-radius: 0 1rem 1rem 0;
    }
    div {
      width: 6rem;
      height: 2rem;
      border: 1px solid #ffddaa;
      box-sizing: border-box;
    }
    .check {
      background: #ffddaa;
      color: #000;
    }
  }
  .help-head {
    height: 6rem;
    position: relative;
    background: url("../../../static/images/titleBg.png");
    background-size: 100% 100%;
    margin-top: 1rem;
    .help-contnet-head-left {
      position: absolute;
      top: 1rem;
      left: 0.5rem;
    }
    .help-contnet-head-cont {
      font-size: 30px;
      font-family: Microsoft YaHei UI;
      font-weight: bold;
      color: rgba(11, 11, 31, 1);
    }
  }
  .accept-head {
    margin-top: 1rem;
    display: flex;
    .accept-head-left,
    .accept-head-right {
      width: 10.4rem;
      height: 6rem;
      background: url("../../../static/images/14@3x.png");
      background-size: 100% 100%;
      .accept-num {
        font-size: 2rem;
        font-family: Microsoft YaHei UI;
        font-weight: bold;
      }
      .accept-text {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
  .help-table {
    margin-top: 1rem;
    .van-cell-group,
    .van-cell {
      background: transparent;
    }
    > div > div:nth-child(2) {
      border-top: 0;
      border-radius: 0 0 0.3rem 0.3rem;
    }
    > div > div {
      border: 1px solid #ffddaa;
      border-radius: 0.3rem 0.3rem 0 0;
    }
    .van-cell__title {
      color: #ffddaa;
    }
    .van-field__control,
    .van-cell__value {
      color: #ffffff;
    }
    p{
      color: #f00;
    }
  }
  .accept-check {
    .help-xx {
      display: flex;
      justify-content: space-around;
    }
    //  border: 1px solid #ffddaa;
    .van-cell__title {
      width: 3rem;
    }
    .van-cell__value {
      overflow: visible;
    }
  }
  .van-radio-group {
    width: 11rem;
    z-index: 1000;
    .van-radio {
      width: 5rem;
    }
    img {
      width: 1rem;
    }
    .check .van-radio__label {
      color: #ffddaa;
    }
    .checked .van-radio__label {
      color: #ffffff;
    }
  }
  .van-button {
    margin-top: 4rem;
    color: #000 !important;
  }
}
</style>
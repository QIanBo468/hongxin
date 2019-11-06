<template>
  <div class="my_deal">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{title}}</slot>
    </van-nav-bar>

    <div class="deal">
      <div class="dealtitle">
        <span>时间</span>
        <span>{{dealtype.dzhanghu}}</span>
        <span>{{dealtype.dnum}}</span>
        <span>{{dealtype.dway}}</span>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="dealtitle" v-for="(item, index) of mydata" :key="index">
          <span>{{item.createtime}}</span>
          <span>{{item.account}}</span>
          <span>{{item.money}}</span>
          <span :class="[item.status ==1 ? 'blue' : 'red']">{{item.ug_note}}</span>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dealtype: {
        dzhanghu: "接受账户",
        dnum: "数量",
        dway: "方式"
      },
      type: null,
      title: "全部交易记录",
      loading: false,
      finished: false,
      mydata: [
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "激活"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "转账"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "激活"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "转账"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "激活"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "转账"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "转账"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "激活"
        // },
        // {
        //   time: "2019.10.01",
        //   zhanghu: 1234567652,
        //   num: 1,
        //   way: "转账"
        // }
      ]
    };
  },
  created() {
    this.type = this.$route.query.type;
    console.log(this.type);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      let posttype;
      switch (this.type) {
        case 0:
          posttype = "credit3"; // 积分
          break;
        case 1:
          posttype = "pin"; //  激活码
          break;
        case 2:
          posttype = "buycoin"; //排单币
          break;
        case 4:
          posttype = "credit2"; //动态收益
          break;
        default:
          posttype = "credit1"; //静态收益
          break;
      }
      this.$axios
        .fetchGet("http://hxlc.ltlfd.cn/home/info/buycoin_log", {
          type: posttype
        })
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            this.mydata = res.data.data.loglist
            this.loading = false;
            this.finished = true;
          }
        });
    }
  }
};
</script>

<style lang='less' scope>
.my_deal {
  padding: 0 11px;
  color: #ffffff;
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
        font-size: 12px;
      }
      .red {
        color: #f00;
      }
      .blue {
        color: #00ffff;
      }
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
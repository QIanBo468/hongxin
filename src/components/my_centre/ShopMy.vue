<template>
  <div class="ShopMy">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">我的交易</slot>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      color="#ffddaa"
      background="transparent"
      title-active-color="#ffddaa"
      title-inactive-color="#fff"
      @click="submit"
    >
      <van-tab title="我的买入">
        <div
          class="datail-moneylist"
          v-for="(item, index) of list"
          :key="index+'list'"
          @click="$router.push({path: '/Cions',query:{ items: item.id,type:0}})"
        >
          <div class="list-left">
            <p>编号:{{item.id}}</p>
            <div class="left-active">
              <div class="red"></div>
              {{item.note}}
            </div>
          </div>
          <div class="list-right">
            <p class="right-time">{{item.createtime}}</p>
            <div class="purse">￥{{item.jb}}</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="我的卖出">
        <div
          class="datail-moneylist"
          v-for="(item, index) of list"
          :key="index+'list'"
          @click="$router.push({path: '/Cions',query:{ items: item.id,type:1}})"
        >
          <div class="list-left">
            <p>编号:{{item.id}}</p>
            <div class="left-active">
              <div class="red"></div>
              {{item.note}}
            </div>
          </div>
          <div class="list-right">
            <p class="right-time">{{item.createtime}}</p>
            <div class="purse">￥{{item.jb}}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      list: []
    };
  },
  created() {
    this.$axios
      .fetchPost("http://hxly.czxxyk.cn/home/coin/buyCoinlist")
      .then(res => {
          console.log(res)
        if (res.code == 1) {
          this.list = res.data.tgbzlist;
        } else {
          this.$toast(res.msg);
        }
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push('myindex');
    },
    submit() {
      if (this.active == 0) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/coin/buyCoinlist")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.tgbzlist;
            } else {
              this.$toast(res.msg);
            }
          });
      } else if (this.active == 1) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/coin/sellCoinlist")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.jsbzlist;
            } else {
              this.$toast(res.msg);
            }
          });
      }
    }
  }
};
</script>

<style lang='less'>
.ShopMy {
  width: 100%;
  height: 100%;

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
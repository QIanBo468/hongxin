<template>
  <div id="payment">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{this.active == 0 ? '未打款会员':'未收款会员'}}</slot>
    </van-nav-bar>

    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="mingxi" v-for="(item, index) of list" :key="index">
        <div class="mingxi-content">
          <span>账号</span>
          <p>{{item.account}}</p>
        </div>
        <div class="mingxi-content">
          <span>昵称</span>
          <p>{{item.nickname}}</p>
        </div>
        <div class="mingxi-content">
          <span>状态</span>
          <p style="color:#f00">{{item.isactive != 1? '已完成': '交易中'}}</p>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      active: 0,
      list: [{ dakuan: "", shoukuan: "" }]
    };
  },
  created() {
    this.active = this.$route.query.type;
    console.log(this.active);
    // this.onLoad();
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onLoad() {
      if (this.active == 0) {
        this.$axios
          .fetchPost("http://hxlc.ltlfd.cn/home/myuser/buyTeam")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.onelist;
              this.loading = false
              this.finished = true
            }
          });
      } else {
        this.$axios
          .fetchPost("http://hxlc.ltlfd.cn/home/myuser/sellTeam")
          .then(res => {
            console.log(res);
            if (res.code == 1) {
              this.list = res.data.onelist;
              this.loading = false
              this.finished = true
            }
          });
      }
    }
  }
};
</script>

<style lang='less' scope>
#payment {
  width: 100%;
  height: 100%;
  color: #ffddaa;
  padding: 0 10px;
}
.mingxi {
  display: flex;
  justify-content: space-between;
  background: #1c1c51;
  margin-top: 10px;
  padding: 5px 5px;
  border-radius: 8px;
  .mingxi-content {
    flex: 1;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > p {
      color: #fff;
      padding: 0;
      margin: 5px 0;
      font-size: 10px;
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
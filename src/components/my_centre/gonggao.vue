<template>
  <div class="gonggaos">
   <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="公告">公告</slot>
      <!-- <slot slot="right" name="right">查看全部</slot> -->
    </van-nav-bar>
    <div class="gglist">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="gg_content" v-for="(item, index) of list" :key="index">
          <div class="cont">
            <p v-html="item.if_theme"></p>
            <span>{{item.if_time}}</span>
          </div>
          <div class="chakan" @click="submit(item)">点击查看</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.$axios.fetchGet("http://hxly.czxxyk.cn/home/info/news").then(res => {
      console.log(res);
      if (res.data.code == 1) {
        this.list = res.data.data.newlist;
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit(item) {
      this.$router.push({ path: "/news", query: { id: item.if_id } });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 6; i++) {
      //     console.log(this.list[i]);
      //   }
      //   // 加载状态结束
      this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length > 5) {
      this.finished = true;
      //   }
      // }, 500);
    }
  }
};
</script>

<style lang='less' scope>
.gonggaos {
  padding: 0 11px;
}
.ggnav {
  background: transparent !important;
}
.gglist {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.gg_content {
  width: 100%;
  height: 75px;
  background: #1c1c51;
  border-radius: 4px;
  padding: 0 8px 0 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  .cont {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      padding: 0;
      margin: 0;
      font-size: 16px;
      color: #ffddaa;
    }
    span {
      color: #fff;
      font-size: 12px;
    }
  }
  .chakan{
    color: #4594f0;
    font-size: 16px;
  }
}
.van-hairline--bottom::after {
  border: none;
}
</style>
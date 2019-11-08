<template>
  <div class="new">
    <van-nav-bar class="ggnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="公告">新闻详情</slot>
    </van-nav-bar>
    <div class="head">{{wenzhang.if_theme}}</div>
    <span class="time">{{wenzhang.if_time}}</span>
    <div class="newscont" v-html="wenzhang.if_content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      wenzhang: {}
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    }
  },
  created() {
    this.id = this.$route.query.id;
    console.log(this.$route.query.id);
    this.$axios
      .fetchGet("http://hxlc.ltlfd.cn/home/info/notice", { id: this.id })
      .then(res => {
        console.log(res);
        if (res.data.code == 1) {
          this.wenzhang = res.data.data.notice;
        }
      });
  }
};
</script>

<style lang='less' scope>
.ggnav {
  background: transparent !important;
}
.new {
  padding: 0 11px;
  word-wrap: break-word;
  .head {
    font-size: 18px;
    color: #ffffff;
    margin-bottom: 20px;
  }
  .time {
    color: #a6a6a6;
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
  }
  p {
    color: #a6a6a6;
  }
  .newscont {
    span {
      color: #ccc !important;
    }
    img {
      width: 100%;
      margin-top: 10px;
    }
  }
}
</style>
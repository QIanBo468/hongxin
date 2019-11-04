<template>
  <div id="payment">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">未打款会员</slot>
    </van-nav-bar>
    <van-tabs v-model="active"
     color="#ffddaa"
    background='transparent'
    title-active-color='#ffddaa'
    title-inactive-color='#fff'
     >
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods:{
      onClickLeft() {
          this.$router.go(-1)
      }
  }
};
</script>

<style lang='less' scope>
#payment {
  width: 100%;
  height: 100%;
  color: #ffddaa;
  padding:0 10px;
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
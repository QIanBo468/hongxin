<template>
  <div class="my-data">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">个人资料</slot>
    </van-nav-bar>
    <div class="name">
      <!-- <van-cell-group>
        <van-field v-model="mydata.name" placeholder="请输入姓名" label="姓名" input-align="right" />
      </van-cell-group> -->
      <van-cell-group>
        <van-field v-model="mydata.nicheng" placeholder="请输入昵称" label="昵称" input-align="right" />
      </van-cell-group>
    </div>
    <div class="name">
      <van-cell-group>
        <van-field v-model="mydata.usdt" placeholder="填写地址" label="USDT地址" input-align="right" />
      </van-cell-group>
    </div>

    <div class="name">
      <van-cell-group>
        <van-radio-group class="danxuan" v-model="radio" checked-color='#ffddaa'>
          <span>密保问题</span>
          <div>
          <van-radio name="1">你最喜欢的数字是多少</van-radio>
          <van-radio name="2">你最爱的人叫什么</van-radio>
          <van-radio name="3">你最喜欢的颜色</van-radio>
          </div>
        </van-radio-group>
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="mydata.mibao"
          placeholder="请输入密保答案"
          label="密保答案"
         
          input-align="right"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="mydata.pay"
          placeholder="请输入安全密码"
          label="安全密码"
          :error="errors.has('password')"
          input-align="right"
        />
      </van-cell-group>
    </div>
    <button class="btn" @click="submit">保存</button>
    <p class="zhushi">注: 资料只可自行完善一次，请认真填写!</p>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      radio: "1",
      dataNickname:'',
      mydata: {
        // name: "",
        nicheng: "",
        usdt: "",
        phone: null,
        pay: "",
        mibao:'',
      }
    };
  },
  created() {
    this.mydata.nicheng = this.$route.query.nickname
    this.mydata.usdt  = this.$route.query.usdt
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      var that = this;
      this.$validator.validateAll().then(function(reslut, field) {
        if (reslut) {
          that.$axios
            .fetchPost("http://hxlc.ltlfd.cn/home/info/editUser", {
              realname: that.mydata.nicheng,
              nickname: that.mydata.nicheng,
              // phone: that.mydata.phone,
              secpwd: that.mydata.pay,
              usdt: that.mydata.usdt,
              encrypt_problem:that.radio,
              encrypt_answers:that.mibao
            })
            .then(res => {
              console.log(res);
              if (res.code === 1) {
                that.$router.push("/myindex");
              } else {
                Toast(res.msg);
              }
            });
        } else {
          console.log(that.errors);
          Toast(that.errors.items[0].msg);
        }
      });
    }
  }
};
</script>

<style lang='less' scope>
.my-data {
  padding: 0 11px;
  .name {
    margin-bottom: 22px;
    .danxuan{
      margin-bottom: 20px;
      padding: 5px;
      display: flex;
      // flex-direction: column;
      align-items: center;
      justify-content: space-between;
      border: 1px solid #ffddaa;
    }
    span {
      color: #ffddaa;
      font-size: 14px;
    }
    .van-cell-group {
      background: transparent;
    }
    .van-cell {
      background: transparent;
      border: 1px solid #ffddaa;
    }
    .van-field__control {
      color: #fff;
    }
  }
  .btn {
    width: 100%;
    height: 45px;
    background: #ffddaa;
    border: none;
    text-align: center;
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
.zhushi{
  color: #f00;
}
</style>
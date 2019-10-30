<template>
  <div class="my-data">
      <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <img width="20px" height="20px" src="../../../static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">个人资料</slot>
    </van-nav-bar>
    <div class="name">
      <van-cell-group>
        <van-field
        v-model="mydata.name" 
        placeholder="请输入姓名" 
        label="姓名" 
        input-align="right" />
      </van-cell-group>
      <van-cell-group>
        <van-field 
        v-model="mydata.nicheng"
         placeholder="请输入昵称" 
         label="昵称" 
         input-align="right" />
      </van-cell-group>
    </div>
    <div class="name">
      <van-cell-group>
        <van-field
         v-model="mydata.usdt"
        placeholder="填写地址"
         label="USDT地址"
          input-align="right" />
      </van-cell-group>
    </div>

    <div class="name">
      <van-cell-group>
        <van-field
          v-model="mydata.phone"
          placeholder="请输入手机号"
          type="number"
          label="手机号"
          maxlength="11"
          :error="errors.has('phones')"
          input-align="right"
        />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="mydata.pay"
         placeholder="请输入安全密码"
          label="安全密码"
          :error="errors.has('password')"
           input-align="right" />
      </van-cell-group>
    </div>
      <button class="btn" @click="submit">保存</button>
  </div>
</template>

<script>

import { Toast } from 'vant'

export default {
    data () {
        return{
            mydata: {
                name:'',
                nicheng:'',
                usdt:'',
                phone: null,
                pay:''
            }
        }
    },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    submit() {
        var that = this;
      this.$validator.validateAll().then(function(reslut, field) {
        if (reslut) {
          that.$axios
            .fetchPost("http://hxlc.ltlfd.cn/home/info/editUser", {
              realname: that.mydata.name,
              nickname: that.mydata.nicheng,
              phone: that.mydata.phone,
              secpwd: that.mydata.pay,
              usdt: that.mydata.usdt
            })
            .then(res => {
              console.log(res);
              if (res.code === 1) {
                that.$router.push("/Login");
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
.my-data{
    padding: 0 11px;
    .name{
        margin-bottom: 22px;
        span{
            color: #FFDDAA;
            font-size: 14px;
        }
        .van-cell-group{
            background: transparent;
        }
        .van-cell{
            background: transparent;
            border: 1px solid #FFDDAA;
        }
        .van-field__control{
            color: #fff;
        }
    }
    .btn{
        width: 100%;
        height: 45px;
        background: #FFDDAA;
        border: none;
        text-align: center;
    }
}



  .jhnav {
    background: none;
    margin-bottom: 10px;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  [class*=van-hairline]::after{
      border: none;
  }
  .van-hairline--bottom::after {
  border: none;
}
</style>
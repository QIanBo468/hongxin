<template>
  <div id="login">
    <div class="loginindex">
      <van-nav-bar class="navbar" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <div class="logo">
        <p>USDT</p>
        <span>|</span>
        <p>注册</p>
      </div>
      <div class="redlogin">
        <van-cell-group>
          <van-field 
          class="userName" 
          v-model="userName" 
          placeholder="输入账号" 
          v-validate="'required'"
          autocomplete="off" />
          <van-field
            v-model="password"
            class="userName"
            type="password"
            v-validate="'required'"
            placeholder="请输入密码"
            autocomplete="off"
          />
          <van-field
            class="userName"
            v-model="repeassword"
            type="password"
            v-validate="'required'"
            placeholder="请再次输入密码"
            autocomplete="off"
          />
           <van-field 
          class="userName" 
          v-model="xingming" 
          placeholder="姓名"
          maxlength="4"
          v-validate="'required'"
          autocomplete="off" />
        </van-cell-group>
      </div>
      <div class="redlogin">
         <van-cell-group>
          <van-field 
          class="userName" 
          v-model="pay" 
          placeholder="输入安全码" 
          type="password"
         
          v-validate="'required|numeric|min:6'"
          autocomplete="off" />
          <van-field
            v-model="pays"
            class="userName"
            type="password"
         
            v-validate="'required|numeric|min:6'"
            placeholder="再输入安全码"
            autocomplete="off"
          />
          <van-field
            class="userName"
            v-model="tuijian"
            

            v-validate="'required'"
            placeholder="推荐码"
            autocomplete="off"
          />
        </van-cell-group>
      </div>
      <van-button type="default" class="btn" @click="submit">立即注册</van-button>
    </div>
  </div>
</template>

<script>

import { Toast } from 'vant'

export default {
  data() {
    return {
      userName: "",
      password: "",
      repeassword: '',
      pay: '',
      pays:'',
      tuijian:'',
      xingming:''
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit () {

            var that = this
            this.$validator.validateAll().then(function(result) {
                if(result){
                    that.$axios.fetchPost('http://hxlc.ltlfd.cn/home/login/regadd',
                    {
                        uid: that.userName,
                        realname: that.xingming,
                        password: that.password,
                        passworded: that.repeassword,
                        secpwd: that.pay,
                        secpwded: that.pays,
                        pid: that.tuijian
                    }).then(res => {
                      console.log(res)
                      // 返回成功状态
                        if (res.code) {
                            Toast('注册成功')
                            // that.$cookies.set('status', res.data.status)
                            that.$router.push('/login')
                            // that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
                        }else{
                            Toast(res.msg)
                        }
                    })
                }else{
                    console.log(that.errors)
                    Toast(that.errors.items[0].msg)
                }
            })
    }
  }
};
</script>

<style lang='less' scope>
#login {
  width: 100%;
  height: 100%;
}
.loginindex {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  box-sizing: border-box;
  padding: 0 15px;
  padding-top: 20px;
  .navbar {
    padding: 0;
    margin: 0;
    background: none;
    position: fixed;
    top: 0;
    .van-icon {
      color: #fff;
      font-size:20px;
      padding: 0;
      margin: 0;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    p:last-child {
      color: #ffddaa;
      font-size: 18px;
    }
    p:first-child {
      color: #cfa972;
      font-size: 24px;
      font-weight: 900;
      font-style: italic;
    }
    span {
      color: #fff;
      font-size: 14px;
      margin: 0 15px;
    }
  }
  .redlogin {
    margin-bottom: 20px;
    .userName {
      background: none;
      border:.5px solid #FFDDAA;
      border-radius: 2px;
      margin: 10px 0;
      input{
        color: #fff;
      }
    }
  }
  .btn {
    height: 50px;
    background: #ffddaa;
    font-size: 18px;
    font-weight: bold;
    border: none;
  }
}
.van-cell-group {
  background: transparent;
}
/deep/.van-cell {
  background: none;
}
[class*=van-hairline]::after{
  position: relative;
}
.van-cell{
  border: #cfa972;
}
.van-cell:not(:last-child)::after{
  border: none;
}
.van-nav-bar__left{
  left: 0;
}
</style>
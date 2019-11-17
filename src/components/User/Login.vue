<template>
  <div id="login">
    <div class="gif">
    <div class="logo">
      <p>HXLL</p>
      <span>|</span>
      <p>登录</p>
    </div>
    <div class="loginlog">
      <img width="100px" height="200px" src='../../../static/images/logo.png'/>
    </div>
    <div class="redlogin">
      <van-cell-group>
        <van-field
          class="userName"
          v-model="userName"
          placeholder="输入账号"
          v-validate="'required'"
          autocomplete="off"
           maxlength=16
          :error="errors.has('phones')"
        />
        <van-field
          v-model="password"
          class="userName"
          type="password"
          v-validate="'required'"
          placeholder="请输入密码"
           maxlength=16
          :error="errors.has('password')"
          autocomplete="off"
        />
         </van-cell-group>
         <van-cell-group class="tuxing">
         <van-field
          v-model="yanzheng"
          class="userName"
          v-validate="'required'"
          placeholder="数字验证码"
           maxlength=4
          :error="errors.has('password')"
          autocomplete="off"
        >
         </van-field>
         <van-image class="txyanzheng" width="84px" height="44px;" :src="imgs" @click="imgs ='http://hxlc.ltlfd.cn//Home/Login/verify?'+Math.random()" />

      </van-cell-group>
    </div>
    <div class="login-register">
      <van-button type="default" class="btn" @click="submit">登录</van-button>
      <div class="logway">
        <!-- <div class="reg" @click="toregister">还没账户，去注册!</div> -->
        <div class="reslut" @click="toreset">忘记密码?</div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      userName: "",
      password: "",
      yanzheng:null,
      imgs:'http://hxlc.ltlfd.cn//Home/Login/verify'
    };
  },
  created() {
    let logintoken;
    this.$axios
      .fetchPost("http://hxlc.ltlfd.cn/home/login/getToken")
      .then(res => {
        // console.log(res)
        console.log(res);
        if (res.code) {
          logintoken = res.token;
          localStorage.setItem("status", res.data.status);
          localStorage.setItem("accessToken", res.data.token);
          this.$router.push("/index");
        }
      });
  },
  // this.$axios
  //         .fetchPost("http://hxlc.ltlfd.cn/home/login/logincl", {
  //           account: this.userName,
  //             password: this.password
  //         })
  //         .then(res => {

  //         })
  methods: {
    tuxing() {

    },
    submit() {
      this.$axios
        .fetchPost("http://hxlc.ltlfd.cn/home/login/logincl", {
          account: this.userName,
          password: this.password,
          verCode: this.yanzheng
        })
        .then(res => {
          console.log(res);
          if (res.code) {
            localStorage.setItem("status", res.data.status);
            localStorage.setItem("accessToken", res.data.token);
            this.$router.push("/index");
          } else {
            this.imgs = 'http://hxlc.ltlfd.cn//Home/Login/verify?'+Math.random()
            Toast(res.msg);
          }
        });

      //   else {
      //     console.log(that.errors)
      //     Toast(that.errors.items[0].msg);
      //   }
      // });
    },
    // toregister() {
    //   this.$router.push("/register");
    // },
    toreset() {
      this.$router.push("/reset");
    }
  }
};
</script>

<style lang='less' scope>
#login {
  width: 165px;
  height: 176px;
  

  display: flex;
  flex-direction: column;
  // opacity: .5;
  .loginlog{
    // width: 345px;
    // // height: 100%;
    // height: 300px;
    display: flex;
    justify-content: center;
    img{
      width: 50%;
    }
  }
  .tuxing{
    .userName{
      flex: 6;
      margin-right: 15px;
    }
    display: flex;
    align-items: center;
    .txyanzheng{
      flex: 3;
      height: 44px;
      margin-left: 10px;
    }
  }
}
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  // 
  .gif{
    // width: 100%;
    height: 100%;
    background: url(../../../static/images/2.gif) no-repeat;
    
    background-color:rgba(0, 0, 0, 1);
  background-position-y: 100%;
  background-size: 100%  100%;
  padding: 0 20px;
  // mix-blend-mode: darken;
  }
  .navbar {
    padding: 0;
    margin: 0;
    background: none;
    position: fixed;
    top: 0;
    .van-icon {
      color: #fff;
      font-size: 20px;
      padding: 0;
      margin: 0;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    // margin-bottom: 50px;
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
    margin-bottom: 50px;
    .userName {
      background: none;
      border: 0.5px solid #ffddaa;
      border-radius: 2px;
      margin: 10px 0;
      input {
        color: #fff;
      }
    }
  }
  .login-register {
    width: 100%;
    // height: 100%;
    margin-bottom: 100px;
    .btn {
      width: 100%;
      height: 50px;
      background: #ffddaa;
      font-size: 18px;
      font-weight: bold;
      border: none;
    }
    .logway {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #fff;
      margin-top: 11px;
    }
  }

  .van-cell-group {
    background: transparent;
  }
  /deep/.van-cell {
    background: none;
  }
}
[class*=van-hairline]::after{
  border: none;
}
</style>
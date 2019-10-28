<template>
  <div id="login">
    <div class="logo">
      <p>USDT</p>
      <span>|</span>
      <p>登录</p>
    </div>
    <div class="redlogin">
      <van-cell-group>
        <van-field
          class="userName"
          v-model="userName"
          placeholder="输入账号"
          v-validate="'required'"
          autocomplete="off"
          :error="errors.has('phone')"
        />
        <van-field
          v-model="password"
          class="userName"
          type="password"
          v-validate="'required'"
          placeholder="请输入密码"
          :error="errors.has('password')"
          autocomplete="off"
        />
      </van-cell-group>
    </div>
    <div class="login-register">
      <van-button type="default" class="btn" @click="submit">登录</van-button>
      <div class="logway">
        <div class="reg" @click="toregister">还没账户，去注册!</div>
        <div class="reslut" @click="toreset">忘记密码?</div>
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
      password: ""
    };
  },
  methods: {
    submit() {
      // this.$axios
      //   .fetchPost("http://hxlc.ltlfd.cn/home/login/logincl", {
      //     // data: {
      //       account: this.userName,
      //       password: this.password
      //     // }
      //   })
      //   .then(res => {
          
      //     console.log(res);
      //     if (res.succes) {
      //       that.$router.push("/index");
      //     } else {
      //       Toast(res.msg);
      //     }
      //   });

      var that = this;
      this.$validator.validateAll().then(function(reslut, field) {
        if (reslut) {
          that.$axios
            .fetchPost("http://hxlc.ltlfd.cn/home/login/logincl", {
             
              account: that.userName,
                password: that.password
              
                
            })
            .then(res => {
              console.log(res);
              if (res.code) {
                that.$router.push("/index");
              } else {
                Toast(res.msg);
              }
            });
        } else {
          console.log(that.errors)
          Toast(that.errors.items[0].msg);
        }
      });
    },
    toregister() {
      this.$router.push("/register");
    },
    toreset() {
      this.$router.push("/reset");
    }
  }
};
</script>

<style lang='less' scope>
#login {
  width: 100%;
  height: 100%;
}
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 20px;
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
</style>
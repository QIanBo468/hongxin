<template>
  <div id="login">
    <div class="loginindex">
      <van-nav-bar class="navbar" left-arrow @click-left="onClickLeft"></van-nav-bar>
      <div class="logo">
        <p>USDT</p>
        <span>|</span>
        <p>忘记密码</p>
      </div>
      <div class="redlogin">
        <van-cell-group>
           <van-field
            class="userName"
            v-model="userPhone"
            placeholder="输入用户编号"
             maxlength=11
            v-validate="'required|phones'"
            autocomplete="off"
          />
          <!-- </van-field>  -->
          <van-field
            v-model="password"
            class="userName"
            type="password"
             maxlength=16
            v-validate="'required'"
            placeholder="请输入新密码"
            autocomplete="off"
          />
          <van-field
            class="userName"
            v-model="repeassword"
            type="password"
             maxlength=16
            v-validate="'required'"
            placeholder="请再次输入密码"
            autocomplete="off"
          />
           
          <van-radio-group class="danxuan" v-model="radio" checked-color="#ffddaa">
              <span>密保问题</span>
              <div>
                <van-radio name="1">你最喜欢的数字是多少</van-radio>
                <van-radio name="2">你的初中老师叫什么</van-radio>
                <van-radio name="3">你最喜欢的颜色</van-radio>
              </div>
            </van-radio-group>
           <van-field v-model="mibao" class="userName"  maxlength=16 placeholder="请输入密保答案" />
        </van-cell-group>
      </div>
      <van-button type="default" class="btn" @click="submit">确认</van-button>
    </div>
  </div>
</template>

<script>

import { Toast } from 'vant'

export default {
  data() {
    return {
      userPhone: '',
      radio:1,
      mibao:'',
      password: "",
      repeassword: "",
      // sms: null,
      security: null,
      // time: 60,
      // btntxt: '发送验证码',
      // captcha: '验证码',
      disabled: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push("/Login");
    },
    // codesubmit() {
    //     //  var phone = this.userPhone;
    //     //     if(!(/^[1][3,4,5,7,8][0-9]{9}$/.test(phone))){ 
    //     //         Toast("手机号码有误，请重填");  
    //     //         return false; 
    //     //     }
    //         // if(this.disabled == false){
    //             this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/login/smsend',
    //             {
    //                 phone: this.userPhone
    //             }).then(res => {
    //               console.log(res)
    //                 Toast(res.msg)
    //             if(res.code === 1){
    //                 this.disabled = true;
    //                 var  that = this
    //                 var times = setInterval(function() {
    //                 that.time--;
    //                 if( that.time > 0){
    //                     that.btntxt = '重新获取('+ that.time +'s)'
    //                 }else{
    //                     clearInterval(times)
    //                     that.time = 10
    //                     that.btntxt = "获取验证码";
    //                     that.disabled = false;
    //                 } 
    //                 }, 1000);
    //             }
    //             }).catch( res => {
    //             Toast(res.msg)
    //             })
    //         // }
    //     },
         submit() {
        //  var that = this;
      // this.$validator.validateAll().then(function(reslut, field) {
      //   if (reslut) {
          this.$axios
            .fetchPost("http://hxlc.ltlfd.cn/home/login/forget_pwd", {
             account: this.userPhone,
             encrypt_problem: this.radio,
             encrypt_answers:this.mibao,
             password: this.password,
             passworded: this.repeassword
            })
            .then(res => {
              console.log(res);
              if (res.code ===1) {
                this.$router.push("/Login");
              } else {
                Toast(res.msg);
              }
            });
        } 
      //   else {
      //     console.log(that.errors)
      //     Toast(that.errors.items[0].msg);
      //   }
      // });
    }
    // },
   
  }
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
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 15px;
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
    .userName {
      background: none;
      border: 0.5px solid #ffddaa;
      border-radius: 2px;
      margin: 10px 0;
      input {
        color: #fff;
      }
      .smsbtn {
        background: none;
        border: none;
        color: #f00;
      }
      .securitybtn {
        background: url(../../../static/images/sms.jpg);
        border: none;
      }
    }
    .security {
      position: relative;
      // display: flex;//
      img {
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -11.5px;
      }
    }
  }
  .btn {
    height: 50px;
    background: #ffddaa;
    font-size: 18px;
    font-weight: bold;
    border: none;
    margin-bottom: 80px;
  }
}

.danxuan {
  margin-bottom: 20px;
  padding: 5px;
  display: flex;
  // flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ffddaa;
  color: #a6a6a6;
  .van-radio__label {
    color: #ffddaa;
    font-size: 14px;
  }
}
.van-cell-group {
  background: transparent;
}
/deep/.van-cell {
  background: none;
}
[class*="van-hairline"]::after {
  position: relative;
}
.van-cell {
  border: #cfa972;
}
.van-cell:not(:last-child)::after {
  border: none;
}
.van-nav-bar__left {
  left: 0;
}
</style>
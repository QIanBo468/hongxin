<template>
  <div class="changePassword">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">修改密码</slot>
    </van-nav-bar>
    <van-tabs
      color="#ffddaa"
      background="transparent"
      title-active-color="#ffddaa"
      title-inactive-color="#fff"
    >
      <van-tab title="修改登录密码">
        <div class="chang-form">
          <van-cell-group>
            <!-- label="用户名" -->
            <van-field v-model="login.password" type="password" placeholder="请输登录密码" />
            <!-- label="密码" -->
            <!-- <van-field v-model="login.passwordRepeat" type="password" placeholder="再次输入登录密码" /> -->
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="login.newPassword" type="password" placeholder="请输入新密码" />
            <van-field v-model="login.newPasswordRepeat" type="password" placeholder="再次输新入密码" />
          </van-cell-group>
          <van-cell-group>
            <van-radio-group class="danxuan" v-model="login.radio" checked-color="#ffddaa">
              <span>密保问题</span>
              <div>
                <van-radio name="1">你最喜欢的数字是多少</van-radio>
                <van-radio name="2">你最爱的人叫什么</van-radio>
                <van-radio name="3">你最喜欢的颜色</van-radio>
              </div>
            </van-radio-group>
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="login.mibao" placeholder="请输入密保答案" />
          </van-cell-group>
          <!-- </van-cell-group> -->
        </div>
      </van-tab>
      <van-tab title="修改安全密码">
        <div class="chang-form">
          <van-cell-group>
            <!-- label="用户名" -->
            <van-field v-model="erji.password" type="password" placeholder="请输安全密码" />
            <!-- label="密码" -->
            <!-- <van-field v-model="erji.passwordRepeat" type="password" placeholder="再次输入安全密码" /> -->
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="erji.newPassword" type="password" placeholder="请输入新密码" />
            <van-field v-model="erji.newPasswordRepeat" type="password" placeholder="再次输新入密码" />
          </van-cell-group>
          <van-cell-group>
            <van-radio-group class="danxuan" v-model="erji.radio" checked-color="#ffddaa">
              <span>密保问题</span>
              <div>
                <van-radio name="1">你最喜欢的数字是多少</van-radio>
                <van-radio name="2">你最爱的人叫什么</van-radio>
                <van-radio name="3">你最喜欢的颜色</van-radio>
              </div>
            </van-radio-group>
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="erji.mibao" placeholder="请输入密保答案" />
          </van-cell-group>
          <!-- </van-cell-group> -->
        </div>
      </van-tab>
    </van-tabs>
    <div class="change-request">
      <van-button size="large" color="#ffddaa" @click="submit">
        <span class="btn">确认修改</span>
      </van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      login: {
        radio: "1", // ，密保选项
        password: "", //原密码
        // passwordRepeat: "", //原密码确认
        newPassword: "", //新密码
        newPasswordRepeat: "", //新密码确认
        mibao: "" //密保
      },
      erji: {
        radio: "1", // ，密保选项
        password: "", //原密码
        passwordRepeat: "", //原密码确认
        newPassword: "", //新密码
        newPasswordRepeat: "", //新密码确认
        mibao: "" //密保
      },
      time: 60,
      btntxt: "发送验证码",
      captcha: "验证码",
      disabled: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    codesubmit() {
      if (this.disabled == false) {
        this.$axios
          .fetchPost("http://hxlc.ltlfd.cn/home/login/smsend", {
            phone: this.phoneNum
          })
          .then(res => {
            console.log(res);
            Toast(res.msg);
            if (res.code === 1) {
              this.disabled = true;
              var that = this;
              var times = setInterval(function() {
                that.time--;
                if (that.time > 0) {
                  that.btntxt = "重新获取(" + that.time + "s)";
                } else {
                  clearInterval(times);
                  that.time = 10;
                  that.btntxt = "获取验证码";
                  that.disabled = false;
                }
              }, 1000);
            }
          })
          .catch(res => {
            Toast(res.msg);
          });
      }
    },
    submit() {
      var that = this;
      this.$validator.validateAll().then(function(reslut, field) {
        if (reslut) {
          that.$axios
            .fetchPost("http://hxlc.ltlfd.cn/home/info/changePwd", {
              newpwd: that.newPassword,
              // secnewpwd: that.newPasswordRepeat,
              phone: that.phoneNum,
              phonecode: that.sms
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

<style  lang='less' scope>
.changePassword {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
    font-size: 20px;
  }
}
.chang-form {
  .van-cell-group {
    margin-top: 1rem;
    background: transparent !important;
    van-cell {
      background: transparent;
    }
    div:nth-child(2) {
      border-top: 0;
      border-radius: 0 0 0.3rem 0.3rem;
    }
    > div {
      border: 1px solid #ffddaa;
      border-radius: 0.3rem 0.3rem 0 0;
    }
    .van-button {
      background: none;
      border: none;
    }
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
  color: #ffffff;
  .van-radio__label {
    color: #ffddaa;
    font-size: 14px;
  }
}
.btn {
  color: #000;
}
.van-button__text {
  color: #fff;
}
.van-cell {
  background: none;
}
.van-cell:not(:last-child)::after {
  border: none;
}
.van-field__control {
  color: #ffffff;
}
.change-request {
  .van-button {
    margin-top: 4rem;
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
<template>
  <div id="login">
    <div class="loginindex">
      <!-- <slot slot="right" name="right">查看全部</slot> -->
      <div class="logos">
        <div>
          <van-image
            class="fuck"
            width="20px"
            height="20px"
            @click="onClickLeft"
            src="./static/images/left@3x.png"
          />
        </div>
        <div class="cao">
          <p>USDT</p>
          <span>|</span>
          <p>注册</p>
        </div>
      </div>
      <div class="redlogins">
        <van-cell-group>
          <van-field
            class="userName"
            v-model="zhanghao"
            placeholder="输入账号"
            v-validate="'required'"
            autocomplete="off"
          />
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
        </van-cell-group>
      </div>
      <div class="redlogins">
        <van-cell-group>
          <van-field
            class="userName"
            v-model="pay"
            placeholder="输入安全码"
            type="password"
            v-validate="'required|numeric|min:6'"
            autocomplete="off"
          />
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
            disabled
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
import { Toast } from "vant";

export default {
  data() {
    return {
      password: "",
      repeassword: "",
      pay: "",
      pays: "",
      tuijian: "",
      zhanghao: ""
    };
  },
  created() {
    this.tuijian = this.$route.query.uid
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      // var that = this
      // this.$validator.validateAll().then(function(result) {
      //     if(result){
      this.$axios
        .fetchPost("http://hxlc.ltlfd.cn/home/login/regadd", {
          uid: this.zhanghao,
          // realname: this.xingming,
          password: this.password,
          passworded: this.repeassword,
          secpwd: this.pay,
          secpwded: this.pays,
          pid: this.tuijian
        })
        .then(res => {
          console.log(res);
          // 返回成功状态
          if (res.code == 1) {
            Toast("注册成功");
            // that.$cookies.set('status', res.data.status)
            this.$router.push("/login");
            // that.$cookies.set('accessToken', res.data.tokenType + " " + res.data.accessToken , res.data.expiresIn)
          } else {
            Toast(res.msg);
          }
        });
    }
    // else{
    //     console.log(that.errors)
    //     Toast(that.errors.items[0].msg)
    // }
  }
};
</script>

<style lang='less' scope>
#login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: autol;
}
.loginindex {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // box-sizing: border-box;
  padding: 30px 15px 0 15px;
  // padding-top: 10px;
  position: relative;
  .fuck {
    margin-bottom: 10px;
  }
  .navbarss {
    padding: 0;
    // margin:0 0 40px 0;

    background: none;
    .van-icon {
      color: #fff;
      font-size: 20px;
      padding: 0;
      margin: 0;
    }
  }
  .logos {
    margin: 10px 0 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .cao {
      display: flex;
      align-items: center;
      p:last-child {
        color: #ffddaa;
        font-size: 18px;
        margin: 0;
        padding: 0;
      }
      p:first-child {
        color: #cfa972;
        font-size: 24px;
        font-weight: 900;
        font-style: italic;
        margin: 0;
        padding: 0;
      }
      span {
        color: #fff;
        font-size: 14px;
        margin: 0 15px;
      }
    }
  }
  .redlogins {
    margin-bottom: 10px;
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
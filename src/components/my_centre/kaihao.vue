<template>
  <div class="kaihao">
      <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">便捷开号</slot>
    </van-nav-bar>

        <div class="kh-form">
        <van-cell-group>
            <!-- label="用户名" -->
            <van-field v-model="khindex.newid"  placeholder="请设置一个新的账号" />
            <!-- label="密码" -->
            <!-- <van-field v-model="login.passwordRepeat" type="password" placeholder="再次输入登录密码" /> -->
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="khindex.uid" disabled  placeholder="推荐人账号" />
            <van-field v-model="khindex.pay"  placeholder="请输入本账号安全密码" />
          </van-cell-group>
          </div>
        <van-button color="#ffddaa" class="kh-btn" @click="submit">确认</van-button>
        <p class="zhushi">注: 您只需要为准备新开的账号设置一个登录账号名称，输入本账号的安全密码即可生成一个直推账户
          ,此操作将直接扣除本账号的一个激活码，资料信息，USDT地址自动复制本账户
        </p>
  </div>
</template>

<script>
export default {
data () {
  return{
    khindex:{
      newid:'',
      uid:'',
      pay:''
    }
  }
},
created(){
  
  this.khindex.uid = this.$route.query.uid
},
methods:{
  onClickLeft() {
    this.$router.go(-1)
    
  },
  submit(){
      this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/info/addQuickUser',{
        account:this.khindex.newid,
         secpwd: this.khindex.pay
      }).then(res=>{
        console.log(res)
        if(res.code ==1){
          this.khindex.newid = '',
          this.khindex.pay = ''
          this.$toast(res.msg)
        } else {
          this.$toast(res.msg)
        }
      })
  }
}
}
</script>

<style lang='less' scope>
.kaihao{
  padding:0 10px;
}

.kh-form {
  input{
    color: #fff;
  }
  .van-cell{
    background: transparent !important;
  }
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
  }
}
.kh-btn{
  background: #ffddaa;
  width: 100%;
  margin-top: 100px;
  font-size: 16px;
  font-weight: bold;
  
}
.van-button__text{
color: #000;
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
.zhushi{
  color: #f00;
  font-size: 14px;
}
</style>
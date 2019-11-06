<template>
  <div class="kaihao">
      <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">便携开号</slot>
    </van-nav-bar>

        <div class="kh-form">
        <van-cell-group>
            <!-- label="用户名" -->
            <van-field v-model="khindex.newid"  placeholder="请输入账号" />
            <!-- label="密码" -->
            <!-- <van-field v-model="login.passwordRepeat" type="password" placeholder="再次输入登录密码" /> -->
          </van-cell-group>
          <van-cell-group>
            <van-field v-model="khindex.uid" disabled  placeholder="推荐人账号" />
            <van-field v-model="khindex.pay"  placeholder="请输入安全密码" />
          </van-cell-group>
          </div>
        <van-button class="kh-btn" @click="submit">确认</van-button>
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
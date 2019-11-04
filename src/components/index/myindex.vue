<template>
  <div class="my_index">
    <van-nav-bar class="mi_nav" title="我的"></van-nav-bar>
    <div class="usetitle">
      <div class="useatuo">
        <div class="touxiang">
          <img :src="usexg.avatar" width="53px" height="53px" alt />
        </div>
        <div class="usename">
          <span>{{usexg.realname}}</span>
          <p>用户编号:{{usexg.account}}</p>
        </div>
      </div>
      <div class="active">会员</div>
    </div>
    <div class="indexitem">
      <span>资料管理</span>
      <van-grid :border="false" :column-num="3" class="ziliaoicon">
        
        <van-grid-item to="/mydata">
          <van-image width="30px" src="./static/my_index/Folder@3x.png" />资料完善
        </van-grid-item>
        <van-grid-item to='register'>
          <van-image width="30px" src="./static/images/user-s.png" />会员注册
        </van-grid-item>
        <van-grid-item to='changpassword'>
          <van-image width="30px" src="./static/my_index/lock_2@3x.png" />密码修改
        </van-grid-item>
      </van-grid>
    </div>
    <div class="indexitem">
      <span>团队管理</span>
      <van-grid :border="false" :column-num="5" class="ziliaoicon">
        <van-grid-item to='teamm'>
          <van-image width="30px" src="./static/my_index/18@3x.png" />我的团队
        </van-grid-item>
        <van-grid-item >
          <van-image  width="30px" src="./static/my_index/Ways_of_payment@3x.png" />未打款会员
        </van-grid-item>
        <van-grid-item to="payment">
          <van-image width="30px" src="./static/my_index/Purse@3x.png" />未收款会员
        </van-grid-item>
         <van-grid-item to='teamm'>
          <van-image width="30px" src="./static/my_index/18@3x.png" />便捷开号
        </van-grid-item>
        <van-grid-item to='teamm'>
          <van-image width="30px" src="./static/my_index/18@3x.png" />我的团队
        </van-grid-item>
        <!-- <van-grid-item @click="$toast('正在维护')">
          <van-image width="30px" src="./static/my_index/Purse@3x.png" />购买旅游套餐明细
        </van-grid-item>
        <van-grid-item :to="{path:'jhm',query:{type:1}}">
            <van-image width="30px" src="./static/my_index/Сalendar@3x.png" />激活码管理
        </van-grid-item>
        <van-grid-item to="help">
          <van-image width="30px" src="./static/my_index/Page@3x.png" />帮助
        </van-grid-item> -->
      </van-grid>
    </div>
    <div class="indexitem">
      <span>财务管理</span>
      <van-grid :border="false" :column-num="5" class="ziliaoicon">
        <van-grid-item to="mydeal">
          <van-image width="30px" src="./static/my_index/Ways_of_payment@3x.png" />财务明细
        </van-grid-item>
        <van-grid-item @click="$toast('正在维护')">
          <van-image width="30px" src="./static/my_index/15@3x.png" />购买明细
        </van-grid-item>
        <van-grid-item @click="$toast('正在维护')">
          <van-image width="30px" src="./static/my_index/16@3x.png" />出售明细
        </van-grid-item>
        <van-grid-item :to="{path:'jhm',query:{type:1}}">
          <van-image width="30px" src="./static/my_index/Purse@3x.png" />激活码转账
        </van-grid-item>
        <van-grid-item @click="$toast('正在维护')">
          <van-image width="30px" src="./static/my_index/16@3x.png" />待定
        </van-grid-item>
      </van-grid>
    </div>
    <div class="indexitem">
      <span>其他项目</span>
      <van-grid :border="false" :column-num="4" class="ziliaoicon">
       
        <van-grid-item @click="$toast('暂未开放')">
          <van-image width="30px" src="./static/my_index/17@3x.png" />弘信商城
        </van-grid-item>
        <van-grid-item to="/gonggao">
          <van-image width="30px" src="./static/my_index/19@3x.png" />公告
        </van-grid-item>
        <van-grid-item to="/gonggao">
        <van-icon name="share" size="30px" />退出
        </van-grid-item>
         <van-grid-item to="/gonggao">
        <van-icon name="share" size="30px" color='#f00' />退出
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img:{},
      show: false,
      usexg: {
        name: "大林子",
        bianhao: 1234567,
        active: "会员",
        auther: "./static/my_index/auther.png"
      }
    };
  },
  created () {
    this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/index/personal')
    .then(res=>{
      console.log(res)
      if(res.code ==1 ){
        this.usexg = res.data
      }
      
    })
    // .then(res =>{
    //   console.log(res)
    // })
  },
  methods: {
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang='less' scope>
.my_index {
  padding: 0 11px;
  .mi_nav {
    background: transparent;
    .van-nav-bar__title {
      color: #ffddaa;
    }
  }
  .usetitle {
    height: 80px;
    background: #ffddaa;
    border-radius: 3px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .useatuo {
      display: flex;
      align-items: center;
      height: 100%;
      .touxiang{
        width: 53px;
        height: 53px;
        border-radius: 50%;
        background: #0b0b1f;
      }
      .usename {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 53px;
        p {
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #0b0b1f;
        }
        span {
          padding: 0;
          margin: 0;
          font-size: 16px;
          color: #0b0b1f;
        }
      }
    }
    .active {
      background: #0b0b1f;
      border-top-left-radius: 13px;
      border-bottom-left-radius: 13px;
      color: #ffddaa;
      text-align: center;
      font-size: 12px;
      padding: 6px 12px;
    }
  }
  .indexitem {
    color: #ffddaa;
    span {
      color: #ffddaa;
      display: inline-block;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .ziliaoicon {
      border: 0.5px solid #ffddaa;
      height: 80px;
    }
    .van-grid-item__content {
      background: transparent;
      font-size: 8px;
      box-sizing: border-box;
      padding: 0;
    }
    .poup {
      background: none;

      .van-cell__value {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #ffddaa;
      }
    }
  }
}

</style>
<template>
  <div class="team">
    <van-nav-bar class="jhnav" @click-left="onClickLeft" @click-right="onClickRight">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="团队管理">团队管理</slot>
      <slot slot="right" name="right">查看全部</slot>
    </van-nav-bar>
    <!-- 展示 -->

    <div class="team-head">
      <div class="team-contnet-head-left">团队总人数(人)</div>
      <div class="team-contnet-head-cont">{{teamNum}}</div>
      <!-- <div class="team-contnet-head-right"></div> -->
    </div>
    <div class="team-list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in teamList" :key="item.ue_id">
         <div class="listbox">
           <div class="useava">
             <van-image src="./static/images/17-s.png" alt=""/>
             <span>昵称</span>
             <p>{{item.nickname}}</p>
           </div>
           <div class="useava">
             <span>手机</span>
             <p>{{item.phone}}</p>
           </div>
           <div class="useava">
             <span>状态</span>
             <p :style="{'color':item.isactive == 0 ? '#00FFFF': '#FF5A5A'}">{{item.isactive == 0 ? '已激活': '未激活'}}</p>
           </div>
           <div class="jihuo">
             <div>激活码</div>
             <div class="xuanze"  @click="showPopup">
             <div>{{item.isactive == 0 ? '已激活': '去激活'}}</div>
             </div>
           </div>
         </div>
        </van-cell>
      </van-list>
    </div>
    <van-popup class="teamshow" v-model="show">
      <div class="show">
        <div class="showtitle">.. 我的激活码 ..</div>
        <div class="shownum">
          <span>{{pin}}</span>个
        </div>
        <div class="xian"></div>
        <div class="showjihuo">
          <span>立即激活</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teamNum: 0,
      show: false,
      pin:null,
      teamList: [],
      loading: false,
      finished: false
    };
  },
  created() {
    this.$axios.fetchPost("http://hxlc.ltlfd.cn/home/myuser/team").then(res => {
      if (res.code == 1) {
        console.log(res);
        this.teamNum = res.data.teamcount;
        this.teamList = res.data.onelist;
        this.pin = res.data.onelist[0].pin
      }
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/teamall");
    },
    jhcode() {},
    showPopup() {
      this.show = true;
    },
    onLoad() {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.teamList.push(this.teamList.length + 1);
      //   }
      //   // 加载状态结束
        this.loading = false;
      //   // 数据全部加载完成
      //   if (this.teamList.length >= 40) {
          this.finished = true;
      //   }
      // }, 500);
    }
  }
};
</script>
<style lang='less' scope>
.jhnav{
  background: transparent !important;
}
.font-white {
  color: #ffffff;
}
.font-yellow {
  color: #f2c684;
}
.team {
  padding: 0 1rem;
}
.van-nav-bar {
  background: transparent;
  .van-nav-bar__title {
    color: #f2c684;
    font-size: 20px;
  }
  .van-nav-bar__right {
    .van-nav-bar__text {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
.team-head {
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("../../../static/images/titleBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-top: 1rem;
  margin-bottom: 2rem;
  .team-contnet-head-left {
    position: absolute;
    top: 0.3rem;
    left: 0.5rem;
  }
  .team-contnet-head-cont {
    font-size: 50px;
    font-family: Microsoft YaHei UI;
    font-weight: bold;
    color: rgba(11, 11, 31, 1);
  }
}
.team-list {
  .van-list {
    padding: 1rem 0;
    .van-cell {
      height: 5.2rem;
      background: url("../../../static/images/teamBg.png");
      background-size: 100% 100%;
      margin-top: 3.6rem;
      padding: 1.3rem 0.5rem 0.5rem 1rem;
      overflow: visible;
      .van-cell__value {
        height: 4rem;
        overflow: visible;
      }
      .team-item-head {
        position: absolute;
        bottom: 3rem;
        left: 0.5rem;
      }
      .team-item-btn {
        .font-yellow,
        .bg-yellow {
          height: 50%;
          width: 100%;
          text-align: center;
        }
        .font-yellow {
          border: 0.05rem solid #f2c684;
          box-sizing: border-box;
          border-radius: 0px 0px 5px 5px;
        }
        .bg-yellow {
          background: #f2c684;
          border-radius: 5px 5px 0px 0px;
        }
      }
    }
  }
}
[class*="van-hairline"]::after {
  border: none;
}
.van-cell:not(:last-child)::after {
  border: none;
}


.listbox{
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  display: flex;
  color: #ffffff;
  justify-content: space-around;
  p{
    padding: 0;
    margin: 0;
    color: #f2c684;
  }
  .useava{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 50px;
      height: 50px;
      position: absolute;
      top: -50px;
    }
  }
  .jihuo{
    display: flex;
    width: 60px;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    color: #000;
    >div:first-child{
      height: 25px;
      width: 60px;
      text-align: center;
      background: #f2c684;
      border-top-right-radius: 3px;
      border-top-left-radius: 3px;
    }
    div:last-child{
      height: 25px;
      width: 60px;
      text-align: center;
      color: #f2c684;
      // background: #f2c684;
      box-sizing: border-box;
      border: .5px solid #f2c684;
      border-bottom-right-radius: 3px;
      border-bottom-left-radius: 3px;
    }
  }
}
.team-list .van-list .van-cell{
  margin-top: 0px;
}
.van-cell{
  margin-bottom: 30px;
}
.teamshow{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 341px;
  background-color: transparent  !important;
}
.show {
  width: 250px;
  height: 301px;
  background: url("../../../static/images/5.png") no-repeat no-repeat;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding: 20px 13px;
  // z-index: 9;
  .showtitle {
    font-size: 16px;
    color: #000;
    letter-spacing: 2px;
    font-weight: bold;
    position: absolute;
    top: 10px;
  }
  .shownum {
    color: #fff;
    width: 224px;
    text-align: center;
    line-height: 40px;
    background: url("../../../static/images/9@3x.png") no-repeat no-repeat;
    background-size: 100%;
    position: absolute;
    top: 20%;
    span {
      font-size: 30px;
      color: #fff;
    }
  }
  .xian {
    height: 1px;
    width: 90%;
    border: 0.5px dashed #956621;
    position: absolute;
    top: 47%;
    // background: #956621;
  }
  .showjihuo {
    width: 224px;
    height: 44px;
    text-align: center;
    background: url("../../../static/images/9@3x.png") no-repeat no-repeat;
    background-size: 100%;
    span {
      line-height: 44px;
      font-size: 14px;
      color: #fff;
    }
    position: absolute;
    bottom: 30%;
  }
}
.van-popup{
  background: none;
}
</style>
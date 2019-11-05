<template>
  <div class="index">
    <van-nav-bar class="indexnav" title="首页">
      <slot name="left" slot="left">
        <div class="left-title-use">
          <span>用户：123</span>
          <span>编号：123456</span>
           <!-- <p>编号</p> -->
        </div>
      </slot>
    </van-nav-bar>
    <van-swipe :loop="false" :width="300" @change="onChange" class="swiper">
      <van-swipe-item v-for="item of adSwiper" :key="item.id">
        <img class="pic" :src="item.pic" alt />
      </van-swipe-item>

      <div class="custom-indicator" slot="indicator">
        <span
          v-for="(item, index) of adSwiper"
          :key="index+1"
          :class="current == index ?  indicator : ''"
        ></span>
      </div>
    </van-swipe>

    <div class="gonggao">
      <div class="ggtitle">
        <img src="../../../static/images/gonggao.png" alt />
        <span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{gonggao}}</span>
      </div>
      <p @click="$router.push('/gonggao')">查看</p>
    </div>
    <span class="bilv">比例汇率:1233</span>
    <div class="moneytitle">
      <div class="g"></div>
      <p>我的操作项</p>
    </div>

    <van-grid square :column-num="5" class="moneyswiper">
      <div class="money-item" @click="$router.push({path:'/jhm',query:{type:0}})">
        <img :src="moneySwiper[0].zuimg" alt />
        <span>{{moneySwiper[0].zuname}}</span>
      </div>
      <div class="money-item" @click="$toast('正在维护')">
        <img :src="moneySwiper[1].zuimg" alt />
        <span>{{moneySwiper[1].zuname}}</span>
      </div>
      <div class="money-item" @click="$toast('正在维护')">
        <img :src="moneySwiper[2].zuimg" alt />
        <span>{{moneySwiper[2].zuname}}</span>
      </div>
      <div class="money-item" @click="$router.push({path:'jhm',query:{type:1}})">
        <img :src="moneySwiper[3].zuimg" alt />
        <span>{{moneySwiper[3].zuname}}</span>
      </div>
      <div class="money-item" @click="$router.push({path:'jhm',query:{type:2}})">
        <img :src="moneySwiper[4].zuimg" alt />
        <span>{{moneySwiper[4].zuname}}</span>
      </div>
      <!-- <div class="money-item"  @click="$router.push('/help')">
          <img :src="moneySwiper[5].zuimg" alt />
          <span>{{moneySwiper[5].zuname}}</span>
        </div>
        <div class="money-item"  @click="$router.push('/help')">
          <img :src="moneySwiper[6].zuimg" alt />
          <span>{{moneySwiper[6].zuname}}</span>
      </div>-->
    </van-grid>
    <!-- class="moneyswipers moneyswiper" -->
    <van-grid square :column-num="2" class="moneyswipers">
      <div @click="$router.push('/help')">
        <p>{{moneySwiper[5].zuname}}</p>
      </div>

      <div @click="$router.push('/help')">
       <p>{{moneySwiper[6].zuname}}</p> 
      </div>
    </van-grid>
    <!-- </van-swipe> -->

    <!-- 列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div
        class="moneylist"
        v-for="(item, index) of list"
        :key="index+'list'"
        @click="$router.push({path: '/helplock',query:{ items: item.id,type: 0}})"
      >
        <div class="list-left">
          <div class="left-active">
            <div class="red"></div>
            {{item.note}}
          </div>
          <p>{{item.user}}</p>
        </div>
        <div class="list-right">
          <p class="right-time">{{item.date}}</p>
          <div class="purse">￥{{item.price}}</div>
        </div>
      </div>
      <div
        class="moneylist"
        v-for="(item, index) of lists"
        :key="index+'lists'"
        @click="$router.push({path: '/helplock',query:{ items: item.id, type: 1}})"
      >
        <div class="list-left">
          <div class="left-active">
            <div class="red"></div>
            {{item.note}}
          </div>
          <p>{{item.user}}</p>
        </div>
        <div class="list-right">
          <p class="right-time">{{item.date}}</p>
          <div class="purse">￥{{item.jbsum}}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      adSwiper: [
        // { id: 0, pic: "./static/images/swiper@3x.png" },
        // { id: 1, pic: "./static/images/swiper1@3x.png" },
        // { id: 2, pic: "./static/images/swiper@3x.png" },
        // { id: 3, pic: "./static/images/swiper1@3x.png" }
      ],
      moneySwiper: [
        { id: 0, zuimg: "./static/images/zujifen.png", zuname: "弘信积分" },
        { id: 1, zuimg: "./static/images/zuqianbao.png", zuname: "静态钱包" },
        { id: 2, zuimg: "./static/images/zuqianbao.png", zuname: "动态钱包" },
        { id: 3, zuimg: "./static/images/zujihuo.png", zuname: "激活码管理" },
        { id: 4, zuimg: "./static/images/zubangzhu.png", zuname: "排单币管理" },
        {
          id: 5,
          zuimg: "./static/images/zubangzhu.png",
          zuname: "购买旅游套餐"
        },
        {
          id: 6,
          zuimg: "./static/images/zubangzhu.png",
          zuname: "出售旅游套餐"
        }
      ],
      current: 0,
      indicator: "xuanzhong",
      gonggao: "三周年奖励之特大喜讯",
      loading: false,
      finished: false,
      show: false,
      list: [],
      lists: []
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    onLoad(ls, lss) {
      setTimeout(() => {
        // if (this.list.length === ls.length && this.lists.length === lss.length){
        this.loading = false;
        this.finished = true;
        // }

        // 加载状态结束

        // 数据全部加载完成
        // if (this.list.length >= 4) {

        // }
      }, 500);
    }
  },
  created() {
    // axios.post()
    this.$axios
      .fetchPost("http://hxlc.ltlfd.cn/home/index/home", {})
      .then(res => {
        console.log(res);
        this.gonggao = res.data.news[0].if_theme;
        this.adSwiper = res.data.banners;
        this.list = res.data.tgbzlist;
        this.lists = res.data.jsbzlist;
        console.log(this.list);
        this.onLoad(res.data.tgbzlist, res.data.jsbzlist);
      });
  }
};
</script>

<style lang='less' scope>
.pic {
  width: 100%;
}
.index {
  color: #ffddaa;
}
.indexnav {
  background: transparent !important;
}
.van-nav-bar__title {
  color: #ffddaa;
}
.swiper {
  margin: 0 11px;
  img {
    height: 130px;
  }
  .van-swipe__indicators {
    bottom: -20px;
  }
  .custom-indicator {
    // display: flex;
    text-align: center;
    span {
      display: inline-block;
      width: 16px;
      height: 4px;
      border-radius: 6px;
      background: #fff;
      margin-right: 5px;
    }
    .xuanzhong {
      background: #ffddaa;
    }
  }
}
.left-title-use{
  // height: 100%;
  font-size: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  
  span{
    display: inline-block;
    // flex: 1;
    line-height: 23px;
  }
}
.bilv{
  font-size: 14px;
  margin-left: 15px;
}
.gonggao {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #26263c;
  // margin: 0 11px 10px 13px;
  padding: 0 10px;
  box-sizing: border-box;
  .ggtitle {
    display: flex;
    align-items: center;
    img {
      width: 34px;
      height: 28px;
      margin-right: 15px;
    }
    span {
      font-size: 14px;
      color: #fff;
    }
  }
  p {
    font-size: 14px;
  }
}

.moneytitle {
  margin-left: 11px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  .g {
    width: 2px;
    height: 12px;
    background: #ffddaa;
    margin-right: 10px;
  }
  p {
    font-size: 14px;
  }
}

.moneyswiper {
  margin-left: 11px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  .van-swipe-item {
    display: flex;
  }
  .money-item {
    margin-right: 5px;
    width: 63px;
    //  overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    img {
      width: 53px;
      margin-bottom: 5px;
    }
    span {
      font-size: 12px;
      text-align: center;
    }
  }
}
.moneyswipers {
  display: flex;
  justify-content: space-around;
  width: 100%;
  > div{
    width: 40%;
    height: 40px;
    background: url('../../../static/images/14@3x.png') no-repeat;
    background-size: 100%;
    text-align: center;
    p{
      color: rgb(105, 99, 99);
      line-height: 40px;
      margin: 0;
      padding: 0;
    }
    // img{
    //   height: 50px;;
    // }
  }
}

.moneylist {
  background: #ffddaa;
  color: #26263c;
  height: 80px;
  margin-bottom: 5px;
  padding: 0 11px;
  margin: 10px 11px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  p {
    margin: 0;
    padding: 0;
  }
  .list-left {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .left-active {
      display: flex;
      align-items: center;
      .red {
        background: #f00;
        width: 7px;
        height: 7px;
        border-radius: 50%;
        margin-right: 5px;
      }
      color: #0b0b1f;
      font-size: 12px;
    }
    p {
      font-size: 16px;
      color: #000;
    }
  }
  .list-right {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    p {
      margin: 0;
      padding: 0;
    }
    .right-time {
      color: #956621;
      font-size: 12px;
    }
    .purse {
      color: #000;
      font-weight: bold;
    }
  }
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
.show {
  width: 250px;
  height: 309px;
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
  }
  .shownum {
    width: 224px;
    text-align: center;
    background: url("../../../static/images/9@3x.png") no-repeat no-repeat;
    // background-size: 100%;
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
  .suoyao {
    color: #000;
  }
}
.van-cell {
  padding: 0;
}
</style>
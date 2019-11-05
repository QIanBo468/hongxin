<template>
  <div class="helplock">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="帮助记录">帮助记录</slot>
    </van-nav-bar>

    <van-tabs
      class="helptab"
      type="card"
      background="none"
      title-active-color="#000"
      color="#F2C684"
      v-model="actives"
    >
      <van-tab title="提供帮助" name="t">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="help-content" v-for="item of usestate" :key="item.id">
            <div class="cont-top">
              <div
                class="arrow"
              >
              <p>￥{{item.jb}}</p>
                <van-icon name="exchange" /></div>
              <div class="cont-left">
                <img width="58px" height="58px" :src="item.pavatar" alt />
                <div class="seter">
                  <div>
                    <div class="g"></div>
                    <span>{{item.pname}}</span>
                  </div>
                  <div class="clear">
                    <div class="g"></div>
                    <span>{{item.p_user}}</span>
                  </div>
                </div>
              </div>
              <div class="cont-right">
                <img width="58px" height="58px" :src="item.gavatar" alt />
                <div class="seter">
                  <div>
                    <span>{{item.gname}}</span>
                    <div class="g"></div>
                  </div>
                  <div class="clear">
                    <span>{{item.g_user}}</span>
                    <div class="g"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cont-bottom">
              <div class="useid">
                <p>打款时间: {{item.dakuan}}</p>
                <div class="danhaotime">
                  <div>单号：{{item.id}}</div>
                  <div>{{item.date}}</div>
                </div>
              </div>
              <div class="state">
                <div @click="showPopups(item)" :class="[item.zt === '2'? 'blue' : 'red']">{{item.zt == '1'? '待确认' :( item.zt == 2 ? '已完成': '去支付')}}</div>

                <van-cell @click="showPopup(item)">
                  <div>详细资料</div>
                </van-cell>
                <img  v-preview="item.pic" v-if="item.zt" width="40px" height="40px" :src="item.pic" alt="">
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="接受帮助" name="j">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="help-content" v-for="item of pstate" :key="item.id">
            <div class="cont-top">
              <div class="arrow">
                <p>￥{{item.jb}}</p>
                <van-icon name="exchange" />
              </div>
              <div class="cont-left">
                <img width="58px" height="58px" :src="item.pavatar" alt />
                <div class="seter">
                  <div>
                    <div class="g"></div>
                    <span>{{item.pname}}</span>
                  </div>
                  <div class="clear">
                    <div class="g"></div>
                    <span>{{item.p_user}}</span>
                  </div>
                </div>
              </div>
              <div class="cont-right">
                <img width="58px" height="58px" :src="item.pavatar" alt />
                <div class="seter">
                  <div>
                    <span>{{item.gname}}</span>
                    <div class="g"></div>
                  </div>
                  <div class="clear">
                    <span>{{item.g_user}}</span>
                    <div class="g"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cont-bottom">
              <div class="useid">
                <p>打款时间: {{item.dakuan}}</p>
                <div class="danhaotime">
                  <div>单号：{{item.id}}</div>
                  <div>{{item.date}}</div>
                </div>
              </div>
              <div class="state">
                <div @click="queren(item)" :class="[item.zt === '2'? 'blue' : 'red']">{{item.zt == '1'? '未确认' :( item.zt == 2 ? '已完成': '待支付')}}</div>
                <!-- <van-cell> -->
                <div  @click="showPopup(item)">详细资料</div>
                <!-- </van-cell> -->
                <van-image  v-preview="item.pic" v-if="item.zt" width="40px" height="40px" :src="item.pic" />
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" close-icon="close" closeable close-icon-position="top-right">
      <div class="shows">
        <div class="use">
          <p>提供帮助者</p>
          <span>{{showdata.pname}}</span>
          <p>账号</p>
          <span>{{showdata.p_user}}</span>
        </div>
        <div class="use">
          <p>接受帮助者</p>
          <span>{{showdata.gname}}</span>
          <p>账号</p>
          <span>{{showdata.g_user}}</span>
        </div>
        <div class="dingdan">
          <p>打款时间</p>
          <span>{{showdata.date}}</span>
          <p>单号</p>
          <span>{{showdata.id}}</span>
        </div>
        <div class="use">
          <p>UDST地址</p>
          <span>{{showdata.usdt}}</span>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="shows" close-icon="close" closeable close-icon-position="top-right">
      <div class="pou">
        <p>上传截图凭证</p>
        <van-uploader preview-size=150 :max-count=1 v-model="fileList" multiple />
        <van-button class="btn" @click="paysubmit" type="default" color="#ffddaa">确认提交</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      show: false,
      shows: false,
      showdata: {},
      showsdata:{},
      usestate: [],
      fileList:[],
      shoukuanimg:{},
      loading: false,
      finished: false,
      pstate: [],
      id: null,
      type: null,
      actives: "j",
      state: "已付款"
    };
  },
  created() {
    this.id = this.$route.query.items;
    this.type = this.$route.query.type;
    if (this.type === 0) {
      this.actives = "t";
      this.$axios
        .fetchGet("http://hxlc.ltlfd.cn/home/tgbz/transaction", {
          id: this.id
        })
        .then(res => {
          console.log(res)
          res.data.data.forEach(item => {
            this.usestate.push(item);
          });
        });
    } else {
      console.log(this.type);
      this.$axios
        .fetchGet("http://hxlc.ltlfd.cn/home/jsbz/transaction", {
          id: this.id
        })
        .then(res => {
          res.data.data.forEach(item => {
            this.pstate.push(item);
            console.log(this.pstate);
          });
        });
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup(item) {
      this.show = true;
      this.showdata = item;
    },
    showPopups(item) {
      this.shows = true;
      this.showsdata = item;
      console.log(this.showsdata)
    },
    onLoad() {
      setTimeout(() => {
        this.loading = false;
        this.finished = true;
      }, 500);
    },
    paysubmit() {
      var that = this
      console.log(this.showsdata.id)
      if(this.fileList){
        this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/index/home_ddxx_pcz_cl',{
          id: this.showsdata.id,
          id_pic_1: this.fileList
        }).then(res=>{
          console.log(res)
          if (res.code ==1){
            that.showsdata.zt = 1
            that.shows = false
            // that.payqueren()
          }
        })
      }
    },

    // 确认收款
    queren(item){
      console.log(item.zt)
      if(item.zt !=2 ){
      this.$axios.fetchPost('http://hxlc.ltlfd.cn/home/index/home_ddxx_gcz_cl',{
        id: item.id,
        comfir: item.zt
      }).then(res=>{
        console.log(res)
      })
       }
    }
  }
};
</script>

<style lang='less' scope>
.helplock {
  padding: 0 11px;
}
// 内容样式
.van-tabs__content {
  width: 100%;
}
.help-content {
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .cont-top {
    width: 100%;
    height: 100px;
    position: relative;

    display: flex;
    .arrow {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      margin: auto;
      z-index: 1;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px 0px #ffffff;
      background: #ffddaa;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p{
        color: #000;
        z-index: 9;
        margin: 0;
        padding: 0;
      }
      .van-icon{
        font-size: 16px;
      }
    }
    .cont-left {
      margin-right: 10px;
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      img {
        position: absolute;
        top: -27px;
        left: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-right: 10.5px;
      }

      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;
        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
    .cont-right {
      width: 50%;
      position: relative;
      background: #1c1c51;
      display: flex;
      flex-direction: column;
      color: #fff;
      justify-content: space-around;
      border-radius: 3px;
      align-items: flex-end;
      img {
        position: absolute;
        top: -27px;
        right: 8px;
      }
      .g {
        width: 2px;
        height: 8px;
        background: #ffddaa;
        margin-left: 10.5px;
      }
      .seter {
        padding-top: 16px;
        display: flex;
        flex-direction: column;

        div {
          font-size: 14px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          //   margin-top: 16px;
        }
        .clear {
          margin-top: 16px;
        }
      }
    }
  }
  .cont-bottom {
    background: #1c1c51;
    width: 100%;
    margin-top: 2px;
    border-radius: 4px;
    display: flex;
    height: 78px;
    padding: 14px 9px;
    box-sizing: border-box;
    .useid {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      p {
        font-size: 12px;
        margin: 0;
        padding: 0;
        color: #fff;
      }
      .danhaotime {
        div:first-child {
          color: #ffddaa;
          font-size: 12px;
          margin-top: 14px;
        }
        div:last-child {
          color: #fff;
          font-size: 12px;
        }
      }
    }
    .state {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      div {
        width: 60px;
        height: 25px;
        border-radius: 12.5px;
        background: #ffddaa;
        font-size: 12px;
        text-align: center;
        line-height: 25px;
        color: #0b0b1f;
      }
      img{
        z-index: 99;
      }
      .red {
        background: #f00;
      }
      .blue {
        background: aqua;
      }
    }
  }
}

// tab 样式
.helptab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.van-tab {
  border: none !important;
}
.van-tabs--card > .van-tabs__wrap {
  width: 200px;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  border-radius: 15px;
}
.van-tabs__nav--card {
  border-radius: 15px !important;
  border: 1px solid #000;
}

.jhnav {
  background: transparent !important;
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

// 详细信息
.van-popup {
    width: 60%;
  height: 60%;
  // background: #fff;
  border-radius: 8px;
  padding: 5px;
}
.shows {

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  p {
    color: #000;
    margin: 5px;
    font-size: 16px;
  }
  span {
    font-size: 13px;
    color: #d4850e;
    display: inline-block;
    margin-left: 10px;
  }
}

// 支付弹窗
.pou{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  p{
    
    margin: 0 0 50px 0;;padding: 0;
  }
  .van-uploader{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .btn{
    position: absolute;
    bottom: 10%;
    left: 50%;
    margin-left: -44px;
  }
}
</style>
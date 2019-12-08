<template>
  <div class="Shoping">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">弘信商城</slot>
    </van-nav-bar>
    <div class="shoping-box">
      <div class="charTu">
        <div id="chartLineBox" style="width: 100%;height: 100%;"></div>
      </div>

      <van-button
        class="shoping-btn"
        @click="$router.push({path:'ShopPayTheBill',query:{type:0}})"
      >买入</van-button>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ul>
          <li
            v-for="item of list"
            :key="item.id"
            @click="$router.push({path:'ShopPayTheBill',query:{type:1, items:item}})"
          >
            <div class="shop-xq">
              <!-- <img :src="item.src" alt /> -->
              <div>
                <p>数量: {{item.amount}}</p>
                <p>单价: {{item.price}}</p>
              </div>
            </div>
            <div class="shop-money">
              <p>总价: {{item.jb}}</p>
              <button>出售给他</button>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      list: [
        {
          id: 0,
          src: require("../../../static/images/17-s.png"),
          num: "100.00CMC",
          price: "11.00.CNY",
          meony: " 1100CNY"
        },
        {
          id: 1,
          src: require("../../../static/images/17-s.png"),
          num: "100.00CMC",
          price: "11.00.CNY",
          meony: " 1100CNY"
        },
        {
          id: 2,
          src: require("../../../static/images/17-s.png"),
          num: "100.00CMC",
          price: "11.00.CNY",
          meony: " 1100CNY"
        },
        {
          id: 3,
          src: require("../../../static/images/17-s.png"),
          num: "100.00CMC",
          price: "11.00.CNY",
          meony: " 1100CNY"
        }
      ]
    };
  },
  created() {
    this.$axios.fetchPost("http://hxly.czxxyk.cn/home/coin/coin").then(res => {
      console.log(res);
      if (res.code == 1) {
        this.list = res.data.coins;
      }
    });
  },

  mounted() {
    this.chartLine = echarts.init(document.getElementById("chartLineBox"));

    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        //设置tip提示
        trigger: "axis"
      },

      legend: {
        //设置区分（哪条线属于什么）
        data: ["单价"]
      },
      color: ["#8AE09F"], //设置区分（每条线是什么颜色，和 legend 一一对应）
      xAxis: {
        width: 4, //设置x轴
        type: "category",
        boundaryGap: false, //坐标轴两边不留白
        data: [
          "2019-1-1",
          "2019-2-1",
          "2019-3-1",
          "2019-4-1",
          "2019-5-1",
          "2019-6-1",
          "至今"
        ],
        name: "DATE", //X轴 name
        nameTextStyle: {
          //坐标轴名称的文字样式
          color: "#FA6F53",
          fontSize: 16,
          padding: [0, 0, 0, 20]
        },
        axisLine: {
          //坐标轴轴线相关设置。
          lineStyle: {
            color: "#FA6F53"
          }
        }
      },
      yAxis: {
        // name: 'SALES VOLUME',
        nameTextStyle: {
          color: "#FA6F53",
          fontSize: 16,
          padding: [0, 0, 10, 0]
        },
        axisLine: {
          lineStyle: {
            color: "#FA6F53"
          }
        },
        type: "value"
      },
      series: [
        {
          // name: '单价',
          data: [1, 1, 1, 1, 1, 1, 1],
          type: "line", // 类型为折线图
          lineStyle: {
            // 线条样式 => 必须使用normal属性
            normal: {
              color: "#ffddaa"
            }
          }
        }
        // {
        //   name: '学生成绩',
        //   data: [120, 200, 150, 80, 70, 110, 130],
        //   type: 'line',
        //   lineStyle: {
        //       normal: {
        //           color: '#FA6F53',
        //       }
        //   },
        // }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    this.chartLine.setOption(option);
  },
  methods: {
    onLoad() {
      (this.loading = false), (this.finished = true);
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang='less' scope>
.Shoping {
  width: 100%;
  height: 100%;
  .shoping-box {
    height: 100%;
    padding: 1rem;
    .charTu {
      height: 20rem;
      // background: #fff;
      margin-bottom: 1rem;
    }
    .shoping-btn {
      background: #ffddaa;
      width: 100%;
      margin-bottom: 1rem;
      color: #000;
      border: none;
      font-size: 16px;
      font-weight: bold;
      border-radius: 12px;
    }
  }
}
li {
  background: #ffddaa;
  padding: 1rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-size: 14px;
    font-weight: bold;
  }
  .shop-xq {
    display: flex;
    align-items: center;
    img {
      width: 55px;
      height: 55px;
      margin-right: 0.5rem;
    }
  }
  button {
    border: none;
    background: #0b0b1f;
    border-radius: 8px;
    color: #fff;
    font-size: 13px;
    padding: 0.5rem;
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
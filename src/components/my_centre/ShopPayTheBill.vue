<template>
  <div class="ShopPayTheBill">
    <van-nav-bar class="jhnav" @click-left="onClickLeft">
      <slot slot="left" name="left">
        <van-image width="20px" height="20px" src="./static/images/left@3x.png" alt />
      </slot>
      <slot slot="title" name="个人资料">{{$route.query.type ==0 ? '发布买单' : '交易详情'}}</slot>
    </van-nav-bar>

    <div class="ShopPayTheBillbox">
      <div class="xiangqing" v-if="$route.query.type">
        <p>
          数量:
          <span class="xiangqingnum">{{$route.query.items.amount}}</span>
        </p>
        <p>
          单价:
          <span class="xiangqingnum">{{$route.query.items.price}}</span>
        </p>
        <p>
          总价:
          <span class="xiangqingnum">{{$route.query.items.jb}}</span>
        </p>
      </div>

      <div class="xiangqings" v-else>
        <van-cell-group>
          <van-field label="单价:" disabled v-model="prices" placeholder="1.00CHY(不可修改)" />
          <van-field label="数量:" v-model="num" placeholder="请输入数量" />
          <van-field label="总价:" v-model="money" placeholder="计算总价" />
        </van-cell-group>
      </div>

      <van-cell-group>
        <van-field
          label="二级密码:"
          type="password"
          maxlength="6"
          v-model="paypasswoed"
          placeholder="请输入二级密码"
        />
      </van-cell-group>

      <van-button
        class="ShopPayTheBill-btn"
        @click="submit()"
      >{{$route.query.type ==0 ? '确认发布' : '出售给他'}}</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paypasswoed: "",
      prices: "1.00CHY",
      num: null,
      money: null,
      id: ""
    };
  },
  watch: {
    num(val) {
      console.log("132564564");
      this.money = this.num * 1;
    }
  },
  created() {
    console.log(this.$route.query.items);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      if (this.$route.query.type == 0) {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/coin/buyCoin", {
            amount: this.num,
            money: this.money,
            secpwd: this.paypasswoed
          })
          .then(res => {
            console.log(res);
            this.$toast(res.msg);
            if (res.code == 1) {
              setTimeout(() => {
                this.$router.go(-1);
              }, 1000);
            } else {
              (this.num = ""), (this.money = ""), (this.paypasswoed = "");
            }
          });
      } else {
        this.$axios
          .fetchPost("http://hxly.czxxyk.cn/home/coin/sellCoin ", {
            buyid: this.$route.query.items.id,
            // money: this.money,
            secpwd: this.paypasswoed
          })
          .then(res => {
            console.log(res);
            this.$toast(res.msg);
            if (res.code == 1) {
              setTimeout(() => {
                this.$router.push({
                  path: "/Cions",
                  query: { items: res.data, type: 1 }
                });
              }, 1000);
            } else {
              (this.num = ""), (this.money = ""), (this.paypasswoed = "");
            }
          });
      }
    }
  }
};
</script>

<style lang='less' scope>
.ShopPayTheBillbox {
  padding: 1rem;
  .xiangqing {
    background: #ffddaa;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    border-radius: 20px;

    .xiangqingnum {
      color: #f00;
    }
  }

  .van-cell-group {
    background: transparent;
    margin-bottom: 3rem;
    span {
      color: #fff;
    }
  }
  .van-cell {
    background: transparent;
    border-bottom: 1px solid #ffddaa;
  }
  .van-field__control {
    color: #fff;
  }
  .ShopPayTheBill-btn {
    width: 100%;
    background: #ffddaa;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 15px;
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
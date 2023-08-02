<template>
  <view>
    <view class="goods-item">
      <view class="goods-item-left">
        <image :src="goods.goods_small_logo || defaultPic" mode="" class="goods-img"></image>
      </view>
      <view class="goods-item-right">
        <view class="goods-name">
          {{goods.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">
            ${{tofixed(goods.goods_price)}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    data() {
      return {
        //默认图片地址
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    methods: {
      tofixed(num) {
        return Number(num).toFixed(2)
      },

    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      .goods-img {
        width: 100px;
        height: 100px;
        display: block;
      }

      margin-right: 5px;
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>
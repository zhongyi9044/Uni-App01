<template>
  <view class="my-search-container" :style="{'background-color':bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      bgcolor: {
        type: String,
        default: '#c00000'
      },
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        console.log('b')
        this.$emit('myclick')
      }
    }
  }
</script>

<style lang="scss">
  .my-search-container {
    height: 50px;
    // background-color: #c00000;
    display: flex;
    align-items: center;
    padding: 0 10px;
    // justify-content: center;

    .my-search-box {
      height: 36px;
      background-color: #ffffff;
      // border-radius: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .placeholder {
        font-size: 15px;
      }
    }
  }
</style>
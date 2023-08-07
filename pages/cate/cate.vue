<template>
  <view>
    <my-search :bgcolor="'#01914560'" :radius="90" @myclick="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y="true" :style="{height:+ wh + 'px'} ">
        <view v-for="(item,i) in cateList" :key="i">
          <view :class="['left-scroll-view-item',i===active?'active':'']" @click="activeChange(i)">
            {{item.cat_name}}
          </view>
        </view>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y="true" :style="{height:+ wh + 'px'} " :scroll-top="scrollTop">
        <view class="cate-list_2" v-for="(item_2,i_2) in cateList_2" :key="i_2">
          <view class="cate-list_2-title">
            /{{item_2.cat_name}}/
          </view>
          <view class="cate-list_2-list">
            <view class="cate-list_2-item" v-for="(item_3,i_3) in item_2.children" :key="i_3"
              @click="gotoGoodsList(item_3)">
              <image :src="item_3.cat_icon" mode=""></image>
              <text>{{item_3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '../../mixins/tabbar-badge.js'
  export default {
    mixins: [badgeMix],
    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateList_2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status != 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateList_2 = res.message[0].children
      },
      activeChange(i) {
        this.active = i
        this.cateList_2 = this.cateList[i].children
        this.scrollTop = this.scrollTop == 0 ? 1 : 0
      },
      gotoGoodsList(item_3) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item_3.cat_id
        })
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;

    .left-scroll-view {
      width: 120px;

      .left-scroll-view-item {
        background-color: #f7f7f7;
        line-height: 60px;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #dddddd;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-view {
      .cate-list_2 {
        .cate-list_2-title {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          padding: 15px 0;
        }

        .cate-list_2-list {
          display: flex;
          flex-wrap: wrap;

          .cate-list_2-item {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;

            image {
              width: 60px;
              height: 60px;
            }

            text {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
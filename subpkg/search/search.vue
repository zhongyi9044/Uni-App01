<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none" :focus="true"
        @confirm="gotoDetail_"></uni-search-bar>
    </view>
    <view class="sugg-list" v-if="searchResults.length!=0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="sugg-name">{{item.goods_name}}</view>
        <uni-icons type="arrow-right" size="16"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-else>
      <view class="history-title">
        <title>搜索历史</title>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <view class="history-list">
        <view class="history-item" v-for="(item,i) in historyList_2" :key="i">
          <uni-tag :inverted="true" :text="item" @click="gotoGoodsList(item)" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        keyWord: '',
        searchResults: [],
        historyList: []
      };
    },
    methods: {
      input(e) {
        clearTimeout(this.timer)
        // e.value 是最新的搜索内容
        this.timer = setTimeout(() => {
          this.keyWord = e.valueOf()
          this.getSearchResults()
        }, 500)
      },
      async getSearchResults() {
        if (this.keyWord.length == 0) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyWord
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        console.log(this.searchResults)
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      saveSearchResults() {
        const set = new Set(this.historyList)
        set.delete(this.keyWord)
        set.add(this.keyWord)
        this.historyList = Array.from(set)
        uni.setStorageSync('searchHistory', JSON.stringify(this.historyList))
      },
      gotoDetail_() {
        this.saveSearchResults()
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?name=' + this.keyWord
        })
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      },
      clean() {
        this.historyList = []
        uni.setStorageSync('searchHistory', '[]')
      }
    },
    computed: {
      historyList_2() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('searchHistory') || [])
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .sugg-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;

    .history-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .history-item {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
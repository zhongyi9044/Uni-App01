"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_store = require("./store/store.js");
require("./store/cart.js");
require("./store/user.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
  "./subpkg/search/search.js";
}
const _sfc_main = {};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/MinApp/uni-app01/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_store.store);
  return {
    app
  };
}
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "数据加载中..."
  });
  if (options.url.indexOf("/my/") !== -1) {
    options.header = {
      //因为获取不到token只能手动输入
      // Authorization: store.state.m_user.token
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    };
  }
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
common_vendor.$http.baseUrl = "https://api-hmugo-web.itheima.net";
common_vendor.index.$showMsg = function(title = "请求数据失败", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
createApp().app.mount("#app");
exports.createApp = createApp;

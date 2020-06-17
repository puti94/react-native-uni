
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/vue/index/index","pages/vue/badge/badge","pages/vue/countdown/countdown","pages/vue/drawer/drawer","pages/vue/icons/icons","pages/vue/load-more/load-more","pages/vue/nav-bar/nav-bar","pages/vue/number-box/number-box","pages/vue/popup/popup","pages/vue/segmented-control/segmented-control","pages/vue/tag/tag","pages/vue/list/list","pages/vue/card/card","pages/vue/collapse/collapse","pages/vue/pagination/pagination","pages/vue/swiper-dot/swiper-dot","pages/vue/grid/grid","pages/vue/rate/rate","pages/vue/steps/steps","pages/vue/notice-bar/notice-bar","pages/vue/swipe-action/swipe-action","pages/vue/search-bar/search-bar","pages/vue/calendar/calendar","pages/vue/indexed-list/indexed-list","pages/vue/fab/fab","pages/vue/fav/fav","pages/vue/goods-nav/goods-nav","pages/vue/section/section","pages/vue/transition/transition","pages/vue/title/title","pages/vue/link/link","pages/vue/combox/combox","pages/nvue/index/index","pages/nvue/badge/badge","pages/nvue/countdown/countdown","pages/nvue/drawer/drawer","pages/nvue/icons/icons","pages/nvue/load-more/load-more","pages/nvue/nav-bar/nav-bar","pages/nvue/number-box/number-box","pages/nvue/popup/popup","pages/nvue/segmented-control/segmented-control","pages/nvue/tag/tag","pages/nvue/list/list","pages/nvue/card/card","pages/nvue/collapse/collapse","pages/nvue/pagination/pagination","pages/nvue/swiper-dot/swiper-dot","pages/nvue/grid/grid","pages/nvue/rate/rate","pages/nvue/steps/steps","pages/nvue/notice-bar/notice-bar","pages/nvue/swipe-action/swipe-action","pages/nvue/search-bar/search-bar","pages/nvue/calendar/calendar","pages/nvue/indexed-list/indexed-list","pages/nvue/fab/fab","pages/nvue/fav/fav","pages/nvue/goods-nav/goods-nav","pages/nvue/section/section","pages/nvue/transition/transition","pages/nvue/title/title","pages/nvue/link/link","pages/nvue/combox/combox"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#007AFF","backgroundColor":"#FFFFFF","background":"#efeff4"},"tabBar":{"color":"#7A7E83","selectedColor":"#007AFF","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/vue/index/index","iconPath":"static/component.png","selectedIconPath":"static/componentHL.png","text":"VUE"},{"pagePath":"pages/nvue/index/index","iconPath":"static/component.png","selectedIconPath":"static/componentHL.png","text":"NUVE"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uni-ui示例","compilerVersion":"2.7.11","entryPagePath":"pages/vue/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/vue/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-ui Vue 页面示例"}},{"path":"/pages/vue/badge/badge","meta":{},"window":{"navigationBarTitleText":"Badge 数字角标"}},{"path":"/pages/vue/countdown/countdown","meta":{},"window":{"navigationBarTitleText":"Countdown 倒计时"}},{"path":"/pages/vue/drawer/drawer","meta":{},"window":{"navigationBarTitleText":"Drawer 抽屉","titleNView":{"buttons":[{"text":"","fontSrc":"/static/uni.ttf","fontSize":"22px"}]},"bounce":"none"}},{"path":"/pages/vue/icons/icons","meta":{},"window":{"navigationBarTitleText":"Icons 图标"}},{"path":"/pages/vue/load-more/load-more","meta":{},"window":{"navigationBarTitleText":"LoadMore 加载更多"}},{"path":"/pages/vue/nav-bar/nav-bar","meta":{},"window":{"navigationBarTitleText":"NavBar 导航栏","navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false,"bounce":"none","pullToRefresh":{"style":"circle","offset":"70px"}}},{"path":"/pages/vue/number-box/number-box","meta":{},"window":{"navigationBarTitleText":"NumberBox 数字输入框"}},{"path":"/pages/vue/popup/popup","meta":{},"window":{"navigationBarTitleText":"Popup 弹出层","softinputMode":"adjustResize"}},{"path":"/pages/vue/segmented-control/segmented-control","meta":{},"window":{"navigationBarTitleText":"SegmentedControl 分段器"}},{"path":"/pages/vue/tag/tag","meta":{},"window":{"navigationBarTitleText":"Tag 标签"}},{"path":"/pages/vue/list/list","meta":{},"window":{"navigationBarTitleText":"List 列表"}},{"path":"/pages/vue/card/card","meta":{},"window":{"navigationBarTitleText":"Card 卡片"}},{"path":"/pages/vue/collapse/collapse","meta":{},"window":{"navigationBarTitleText":"Collapse 折叠面板"}},{"path":"/pages/vue/pagination/pagination","meta":{},"window":{"navigationBarTitleText":"Pagination 分页器"}},{"path":"/pages/vue/swiper-dot/swiper-dot","meta":{},"window":{"navigationBarTitleText":"SwiperDot 轮播图指示点"}},{"path":"/pages/vue/grid/grid","meta":{},"window":{"navigationBarTitleText":"Grid 宫格"}},{"path":"/pages/vue/rate/rate","meta":{},"window":{"navigationBarTitleText":"Rate 评分"}},{"path":"/pages/vue/steps/steps","meta":{},"window":{"navigationBarTitleText":"Steps 步骤条"}},{"path":"/pages/vue/notice-bar/notice-bar","meta":{},"window":{"navigationBarTitleText":"NoticeBar 通告栏"}},{"path":"/pages/vue/swipe-action/swipe-action","meta":{},"window":{"navigationBarTitleText":"SwipeAction 滑动操作","bounce":"none"}},{"path":"/pages/vue/search-bar/search-bar","meta":{},"window":{"navigationBarTitleText":"SearchBar 搜索栏"}},{"path":"/pages/vue/calendar/calendar","meta":{},"window":{"navigationBarTitleText":"Calendar 日历"}},{"path":"/pages/vue/indexed-list/indexed-list","meta":{},"window":{"navigationBarTitleText":"IndexedList 索引列表","bounce":"none"}},{"path":"/pages/vue/fab/fab","meta":{},"window":{"navigationBarTitleText":"Fab 悬浮按钮"}},{"path":"/pages/vue/fav/fav","meta":{},"window":{"navigationBarTitleText":"Fav 收藏按钮"}},{"path":"/pages/vue/goods-nav/goods-nav","meta":{},"window":{"navigationBarTitleText":"GoodsNav 商品导航"}},{"path":"/pages/vue/section/section","meta":{},"window":{"navigationBarTitleText":"Section 章节标题"}},{"path":"/pages/vue/transition/transition","meta":{},"window":{"navigationBarTitleText":"Transition 过渡动画"}},{"path":"/pages/vue/title/title","meta":{},"window":{"navigationBarTitleText":"Title 章节标题"}},{"path":"/pages/vue/link/link","meta":{},"window":{"navigationBarTitleText":"Link 链接"}},{"path":"/pages/vue/combox/combox","meta":{},"window":{"navigationBarTitleText":"Combox 组合框"}},{"path":"/pages/nvue/index/index","meta":{"isQuit":true,"isNVue":true,"isTabBar":true},"window":{"navigationBarTitleText":"uni-ui Nvue 页面示例"}},{"path":"/pages/nvue/badge/badge","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Badge 数字角标"}},{"path":"/pages/nvue/countdown/countdown","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Countdown 倒计时"}},{"path":"/pages/nvue/drawer/drawer","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Drawer 抽屉","titleNView":{"buttons":[{"text":"","fontSrc":"/static/uni.ttf","fontSize":"22px"}]},"bounce":"none"}},{"path":"/pages/nvue/icons/icons","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Icons 图标"}},{"path":"/pages/nvue/load-more/load-more","meta":{"isNVue":true},"window":{"navigationBarTitleText":"LoadMore 加载更多"}},{"path":"/pages/nvue/nav-bar/nav-bar","meta":{"isNVue":true},"window":{"navigationBarTitleText":"NavBar 导航栏","navigationStyle":"custom","enablePullDownRefresh":true,"titleNView":false,"bounce":"none","pullToRefresh":{"style":"circle","offset":"70px"}}},{"path":"/pages/nvue/number-box/number-box","meta":{"isNVue":true},"window":{"navigationBarTitleText":"NumberBox 数字输入框"}},{"path":"/pages/nvue/popup/popup","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Popup 弹出层","softinputMode":"adjustResize"}},{"path":"/pages/nvue/segmented-control/segmented-control","meta":{"isNVue":true},"window":{"navigationBarTitleText":"SegmentedControl 分段器"}},{"path":"/pages/nvue/tag/tag","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Tag 标签"}},{"path":"/pages/nvue/list/list","meta":{"isNVue":true},"window":{"navigationBarTitleText":"List 列表"}},{"path":"/pages/nvue/card/card","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Card 卡片"}},{"path":"/pages/nvue/collapse/collapse","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Collapse 折叠面板"}},{"path":"/pages/nvue/pagination/pagination","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Pagination 分页器"}},{"path":"/pages/nvue/swiper-dot/swiper-dot","meta":{"isNVue":true},"window":{"navigationBarTitleText":"SwiperDot 轮播图指示点"}},{"path":"/pages/nvue/grid/grid","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Grid 宫格"}},{"path":"/pages/nvue/rate/rate","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Rate 评分"}},{"path":"/pages/nvue/steps/steps","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Steps 步骤条"}},{"path":"/pages/nvue/notice-bar/notice-bar","meta":{"isNVue":true},"window":{"navigationBarTitleText":"NoticeBar 通告栏"}},{"path":"/pages/nvue/swipe-action/swipe-action","meta":{"isNVue":true},"window":{"navigationBarTitleText":"SwipeAction 滑动操作","bounce":"none"}},{"path":"/pages/nvue/search-bar/search-bar","meta":{"isNVue":true},"window":{"navigationBarTitleText":"SearchBar 搜索栏"}},{"path":"/pages/nvue/calendar/calendar","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Calendar 日历"}},{"path":"/pages/nvue/indexed-list/indexed-list","meta":{"isNVue":true},"window":{"navigationBarTitleText":"IndexedList 索引列表","bounce":"none"}},{"path":"/pages/nvue/fab/fab","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Fab 悬浮按钮"}},{"path":"/pages/nvue/fav/fav","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Fav 收藏按钮"}},{"path":"/pages/nvue/goods-nav/goods-nav","meta":{"isNVue":true},"window":{"navigationBarTitleText":"GoodsNav 商品导航"}},{"path":"/pages/nvue/section/section","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Section 章节标题"}},{"path":"/pages/nvue/transition/transition","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Transition 过渡动画"}},{"path":"/pages/nvue/title/title","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Title 章节标题"}},{"path":"/pages/nvue/link/link","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Link 链接"}},{"path":"/pages/nvue/combox/combox","meta":{"isNVue":true},"window":{"navigationBarTitleText":"Combox 组合框"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});

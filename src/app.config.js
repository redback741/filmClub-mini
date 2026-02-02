export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/home/index',
    'pages/list/index',
    'pages/mine/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#7A7E83',
    selectedColor: '#FF9E4D',
    borderStyle: 'white',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '电影',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home_full.png'
      },
      {
        pagePath: 'pages/list/index',
        text: '活动',
        iconPath: 'assets/icons/list.png',
        selectedIconPath: 'assets/icons/list_full.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user_full.png'
      }
    ]
  }
})

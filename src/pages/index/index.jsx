import Taro, { useLoad } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  const handleNavigate = (url) => {
    if (url) {
      Taro.navigateTo({ url })
    } else {
      Taro.showToast({ title: '功能开发中', icon: 'none' })
    }
  }

  // 这里的 TabBar 切换通常使用 Taro.switchTab
  const handleSwitchTab = (url) => {
    Taro.switchTab({ url })
  }

  return (
    <View className='page-container'>
      {/* 头部标题 */}
      <View className='header'>
        <View className='header-title'>观影团</View>
        <View className='header-subtitle'>发现精彩电影活动</View>
      </View>

      {/* 卡片区域 */}
      <View className='card-list'>
        
        {/* 卡片 1: 浏览电影 */}
        <View 
          className='card card-large'
          onClick={() => handleSwitchTab('/pages/list/index')}
        >
          <Text className='card-icon'>🎬</Text>
          <Text className='card-title'>浏览电影</Text>
          <Text className='card-desc'>查看近期新片</Text>
        </View>

        <View 
          className='card card-large'
          onClick={() => handleSwitchTab('/pages/mine/index')}
        >
          <Text className='card-icon'>🎨</Text>
          <Text className='card-title'>我的报名</Text>
          <Text className='card-desc'>查看我的报名活动</Text>
        </View>

        <View className='card-row'>
          {/* 卡片 2: 活动列表 */}
          <View 
            className='card card-small'
            onClick={() => handleNavigate('')}
          >
            <Text className='card-icon-small'>📋</Text>
            <Text className='card-title-small'>活动列表</Text>
            <Text className='card-desc-small'>首映礼? 海报场?<br/>按需查找</Text>
          </View>

          {/* 卡片 3: 活动日历 */}
          <View 
            className='card card-small'
            onClick={() => handleNavigate('')}
          >
            <Text className='card-icon-small'>🗓️</Text>
            <Text className='card-title-small'>活动日历</Text>
            <Text className='card-desc'>可以看什么?</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

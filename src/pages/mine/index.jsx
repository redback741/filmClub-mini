import { View, Text } from '@tarojs/components'
import './index.scss'
import { useEffect } from 'react'

export default function Mine () {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const userInfo = Taro.getStorageSync('userInfo')
    if (userInfo) {
      setUserInfo(userInfo)
    }
  }, [])

  return (
    <View className='mine'>
      {/* 个人信息卡片 */}
      <View className='user-card'>
        <View className='user-avatar'>
          <Text>用户头像</Text>
        </View>
        <View className='user-info'>
          <Text className='user-name'>用户姓名</Text>
          <Text className='user-phone'>13800000000</Text>
        </View>
      </View>

      {/* 我的报名 */}
      <View className='order-card'>
        <Text className='order-title'>我的报名</Text>
        <Text className='order-count'>100</Text>
      </View>

      {/* 退出登录 */}
      <View className='logout-card'>
        <Text className='logout-title'>退出登录</Text>
      </View>
    </View>
  )
}
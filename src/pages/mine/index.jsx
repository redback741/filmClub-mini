import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'
import { wxLogin } from '@/api/user'
import { clearUserInfo, setUserInfo, useStore, useUserInfo } from '@/store'

export default function Mine () {
  const userInfo = useUserInfo()
  const { dispatch } = useStore()

  const handleLogin = async () => {
    const res = await Taro.login()
    if (res.code) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res.code)
      
      const loginRes = await wxLogin({ code: res.code })
      if (loginRes.code === 200 || loginRes.code === 201) {
        // 更新 Redux 状态 (Slice 内部会自动更新 Storage)
        dispatch(setUserInfo(loginRes.data))
      } else {
        console.log('登录失败！' + loginRes.msg)
      }

    } else {
      console.log('登录失败！' + res.errMsg)
    }
  }

  const handleLoginOut = () => {
    // 清除 Redux 状态 (Slice 内部会自动清除 Storage)
    dispatch(clearUserInfo())
  }

  return (
    <View className='mine'>
      {/* 个人信息卡片 */}
      <View className='user-card' onClick={handleLogin}>
        <View className='user-avatar'>
          <Text>用户头像</Text>
        </View>
        {
          userInfo ? (
            <View className='user-info'>
              <Text className='user-name'>{userInfo.nickName}</Text>
              <Text className='user-phone'>{userInfo.phoneNumber}</Text>
            </View>
          ) : (
            <View className='user-info'>
              <Text className='user-name'>请先登录</Text>
            </View>
          )
        }
      </View>

      {/* 我的报名 */}
      <View className='order-card'>
        <Text className='order-title'>我的报名</Text>
        <Text className='order-count'>100</Text>
      </View>

      {/* 退出登录 */}
      <View className='logout-card' onClick={handleLoginOut}>
        <Text className='logout-title'>退出登录</Text>
      </View>
    </View>
  )
}

import { View, Text, Image, Button } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { useUser } from '../../context/UserContext'
import { withLoginModal } from '../../components/withLoginModal'
import './index.scss'
import avatar from '../../assets/icons/user_full.png'

function Mine() {
  const { userInfo, logout, showLoginModal, login, updateAvatar } = useUser()

  useLoad(() => {
    console.log('Mine page loaded')
  })

  const handleLogin = () => {
    if (!userInfo) {
      showLoginModal()
    }
  }

  const onChooseAvatar = (e) => {
    const url = e.detail && e.detail.avatarUrl
    if (!url) return
    if (userInfo) {
      updateAvatar(url)
    } else {
      login({ avatarUrl: url, nickName: '微信用户' })
    }
  }

  return (
    <View className='mine-page'>
      <View className='user-card' onClick={handleLogin}>
        <View className='avatar-box'>
          <Image 
            className='avatar' 
            src={userInfo ? userInfo.avatarUrl : avatar} 
            mode='aspectFill' 
          />
          {userInfo && (
            <Button 
              className='avatar-btn-overlay' 
              openType='chooseAvatar' 
              onChooseAvatar={onChooseAvatar}
              onClick={(e) => { e.stopPropagation() }}
            />
          )}
        </View>
        <View className='info'>
          <Text className='nickname'>
            {userInfo ? userInfo.nickName : '点击登录'}
          </Text>
          {/* {userInfo && (
            <Text className='uid'>ID: {userInfo._id || '未同步'}</Text>
          )} */}
        </View>
      </View>
      
      {/* 其他菜单项 */}
      <View className='menu-list'>
        <View className='menu-item'>
          <Text>我的订单</Text>
        </View>
        <View className='menu-item'>
          <Text>联系客服</Text>
        </View>
        <View className='menu-item'>
          <Text>关于我们</Text>
        </View>
        {userInfo && (
          <View className='menu-item' onClick={logout}>
            <Text style={{color: 'red'}}>退出登录</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default withLoginModal(Mine)

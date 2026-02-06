import React, { useState } from 'react'
import { View, Text, Button, Image, Input } from '@tarojs/components'
import { useUser } from '../../context/UserContext'
import './index.scss'

const defaultAvatarUrl = ''

export default function LoginModal() {
  const { isLoginModalVisible, login, hideLoginModal } = useUser()
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl)
  const [nickName, setNickName] = useState('')

  console.log('LoginModal render, visible:', isLoginModalVisible)

  if (!isLoginModalVisible) return null

  const onChooseAvatar = (e) => {
    const { avatarUrl } = e.detail
    setAvatarUrl(avatarUrl)
  }

  const handleLogin = () => {
    if (!nickName) {
      // 如果没有昵称，可以使用默认的
      // 或者提示用户输入
      // 这里简单处理，允许空昵称或者设置为"微信用户"
    }
    
    login({
      avatarUrl,
      nickName: nickName || '微信用户'
    })
  }

  return (
    <View className='login-modal-mask'>
      <View className='login-modal-content'>
        <View className='modal-header'>
          <Text className='modal-title'>欢迎来到观影团</Text>
          <Text className='modal-subtitle'>请授权登录以体验完整功能</Text>
        </View>

        <View className='avatar-wrapper'>
          <Button 
            className='avatar-btn' 
            openType='chooseAvatar' 
            onChooseAvatar={onChooseAvatar}
          >
            <Image className='avatar-img' src={avatarUrl} mode='aspectFill' />
          </Button>
          <Text className='avatar-tip'>点击设置头像</Text>
        </View>

        <View className='input-wrapper'>
          <Text className='input-label'>昵称</Text>
          <Input 
            type='nickname' 
            className='nickname-input' 
            placeholder='请输入昵称' 
            value={nickName}
            onInput={(e) => setNickName(e.detail.value)}
          />
        </View>

        <View className='modal-footer'>
          <Button className='btn-cancel' onClick={hideLoginModal}>暂不登录</Button>
          <Button className='btn-confirm' onClick={handleLogin}>立即登录</Button>
        </View>
      </View>
    </View>
  )
}

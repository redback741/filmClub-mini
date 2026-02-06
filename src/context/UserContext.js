import React, { createContext, useState, useEffect, useContext } from 'react'
import Taro from '@tarojs/taro'
import { callFunction } from '../utils/cloud'

export const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoginModalVisible, setLoginModalVisible] = useState(false)

  // 初始化检查登录状态
  useEffect(() => {
    const storedUserInfo = Taro.getStorageSync('userInfo')
    if (storedUserInfo) {
      setUserInfo(storedUserInfo)
    } else {
      // 未登录，显示登录弹窗
      // 延迟一点显示，避免与启动动画冲突
      setTimeout(() => {
        setLoginModalVisible(true)
      }, 1000)
    }
  }, [])

  const login = async (userProfile) => {
    try {
      Taro.showLoading({ title: '登录中...' })

      // 1. 获取 openid (无需 code，云函数自动获取上下文)
      const { success, data } = await callFunction('login')
      
      if (!success) {
        throw new Error('获取用户标识失败')
      }

      const { openid } = data
      
      const newUserInfo = {
        ...userProfile,
        openid,
        isLoggedIn: true,
        lastLoginTime: new Date().toISOString()
      }
      
      // 2. 将用户信息存储到云数据库
      const saveRes = await callFunction('saveUser', newUserInfo)
      if (!saveRes.success) {
        console.warn('用户数据同步云端失败，但不影响本地登录', saveRes.error)
        // 如果是集合不存在的错误，提示开发者
        if (saveRes.errMsg && saveRes.errMsg.includes('数据库集合')) {
             Taro.showModal({
                title: '开发环境配置缺失',
                content: '云数据库中缺少 [users] 集合。\n请在微信开发者工具 -> 云开发 -> 数据库中创建名为 users 的集合。',
                showCancel: false,
                confirmText: '我知道了'
             })
        }
      }

      setUserInfo(newUserInfo)
      Taro.setStorageSync('userInfo', newUserInfo)
      setLoginModalVisible(false)
      
      Taro.hideLoading()
      Taro.showToast({
        title: '登录成功',
        icon: 'success'
      })
    } catch (error) {
      Taro.hideLoading()
      console.error('登录失败', error)
      Taro.showToast({
        title: '登录失败',
        icon: 'none'
      })
    }
  }

  const logout = () => {
    setUserInfo(null)
    Taro.removeStorageSync('userInfo')
    setLoginModalVisible(false)
  }

  const updateAvatar = async (avatarUrl) => {
    if (!userInfo) {
      setLoginModalVisible(true)
      return
    }
    try {
      const newInfo = {
        ...userInfo,
        avatarUrl,
        lastLoginTime: new Date().toISOString()
      }
      const saveRes = await callFunction('saveUser', newInfo)
      if (!saveRes.success) {
        console.warn('用户头像云端更新失败', saveRes.error)
      }
      setUserInfo(newInfo)
      Taro.setStorageSync('userInfo', newInfo)
      Taro.showToast({ title: '头像已更新', icon: 'success' })
    } catch (e) {
      console.error('更新头像失败', e)
      Taro.showToast({ title: '头像更新失败', icon: 'none' })
    }
  }

  const showLoginModal = () => {
    console.log('showLoginModal called')
    setLoginModalVisible(true)
  }

  const hideLoginModal = () => {
    // 只有已登录才能关闭，或者允许强制关闭？
    // 这里允许关闭，但下次还会提示
    setLoginModalVisible(false)
  }

  return (
    <UserContext.Provider value={{ 
      userInfo, 
      login, 
      logout, 
      isLoginModalVisible, 
      showLoginModal, 
      hideLoginModal,
      updateAvatar 
    }}>
      {children}
    </UserContext.Provider>
  )
}

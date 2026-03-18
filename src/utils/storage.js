import Taro from '@tarojs/taro'

/**
 * Storage key 常量定义
 */
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER_INFO: 'userInfo'
}

/**
 * 基础存储封装
 */
const storage = {
  get: (key) => {
    try {
      return Taro.getStorageSync(key)
    } catch (e) {
      console.error(`Get storage [${key}] failed:`, e)
      return null
    }
  },
  
  set: (key, value) => {
    try {
      Taro.setStorageSync(key, value)
    } catch (e) {
      console.error(`Set storage [${key}] failed:`, e)
    }
  },
  
  remove: (key) => {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      console.error(`Remove storage [${key}] failed:`, e)
    }
  },
  
  clear: () => {
    try {
      Taro.clearStorageSync()
    } catch (e) {
      console.error('Clear storage failed:', e)
    }
  }
}

/**
 * 业务数据持久化封装
 */
export const userStorage = {
  // Token 相关
  getToken: () => storage.get(STORAGE_KEYS.TOKEN),
  setToken: (token) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),
  
  // 用户信息相关
  getUserInfo: () => storage.get(STORAGE_KEYS.USER_INFO),
  setUserInfo: (info) => storage.set(STORAGE_KEYS.USER_INFO, info),
  removeUserInfo: () => storage.remove(STORAGE_KEYS.USER_INFO),
  
  // 清除所有用户相关数据（退出登录时使用）
  clearUserSession: () => {
    storage.remove(STORAGE_KEYS.TOKEN)
    storage.remove(STORAGE_KEYS.USER_INFO)
  }
}

export default storage

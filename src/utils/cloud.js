import Taro from '@tarojs/taro'

// 云开发环境配置
const CLOUD_ENV = "cloud1-3gwaup7maf955cb5"

// 云托管服务配置
const CONTAINER_CONFIG = {
  env: "prod-6ge3peo2b9c18196",
  service: "express-r4la"
}

/**
 * 初始化云开发环境
 */
export const initCloud = () => {
  if (process.env.TARO_ENV === 'weapp') {
    if (!Taro.cloud) {
      console.error('当前环境不支持云开发')
      return
    }
    Taro.cloud.init({
      env: CLOUD_ENV,
      traceUser: true,
    })
    console.log('云开发环境初始化成功:', CLOUD_ENV)
  }
}

/**
 * 调用云托管服务
 */
export const callContainer = async (path, method = 'GET', data = {}) => {
  if (process.env.TARO_ENV !== 'weapp') {
    console.warn('云托管调用仅支持微信小程序环境')
    return {
      success: false,
      message: '当前环境不支持云托管调用'
    }
  }

  try {
    const res = await Taro.cloud.callContainer({
      config: {
        env: CONTAINER_CONFIG.env
      },
      path,
      header: {
        "X-WX-SERVICE": CONTAINER_CONFIG.service,
        "content-type": "application/json"
      },
      method: method.toUpperCase(),
      data
    })

    if (res.statusCode >= 200 && res.statusCode < 300) {
      return {
        success: true,
        data: res.data,
        statusCode: res.statusCode,
        header: res.header
      }
    } else {
      return {
        success: false,
        message: `请求失败: ${res.statusCode}`,
        statusCode: res.statusCode,
        data: res.data
      }
    }
  } catch (err) {
    console.error('云托管调用异常:', err)
    return {
      success: false,
      message: err.errMsg || '网络请求异常',
      error: err
    }
  }
}

/**
 * 调用云函数
 */
export const callFunction = async (name, data = {}) => {
  if (process.env.TARO_ENV !== 'weapp') {
    console.warn('云函数调用仅支持微信小程序环境')
    return {
      success: false,
      message: '当前环境不支持云函数调用'
    }
  }

  try {
    const res = await Taro.cloud.callFunction({
      name,
      data
    })
    
    return {
      success: true,
      data: res.result,
      requestId: res.requestID
    }
  } catch (err) {
    console.error(`云函数[${name}]调用异常:`, err)
    
    // 针对“未找到云函数”的特定错误处理
    if (err.message && (err.message.includes('FUNCTION_NOT_FOUND') || err.message.includes('-501000'))) {
      const tips = `云函数 ${name} 未找到。请在微信开发者工具中：\n1. 找到 cloudfunctions/${name} 目录\n2. 右键选择"上传并部署：云端安装依赖"`
      console.warn('%c 注意 ', 'background: #ff0; color: #000', tips)
      Taro.showModal({
        title: '云函数未部署',
        content: `请在开发者工具中上传云函数 "${name}"`,
        showCancel: false
      })
    }

    return {
      success: false,
      message: err.errMsg || '云函数调用失败',
      error: err
    }
  }
}

export default {
  init: initCloud,
  callContainer,
  callFunction
}

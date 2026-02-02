import Taro from '@tarojs/taro'

// 响应数据拦截器
const responseInterceptor = (response) => {
  const { statusCode, data } = response
  
  // HTTP状态码检查
  if (statusCode >= 200 && statusCode < 300) {
    // 业务状态码检查
    if (data && typeof data === 'object') {
      // 标准响应格式: { code, message, data }
      if (data.code !== undefined) {
        if (data.code === 200 || data.code === 0 || data.code === 201) {
          // 成功响应，返回实际数据
          return {
            success: true,
            data: data.data || data,
            message: data.message || '请求成功',
            code: data.code
          }
        } else {
          // 业务错误
          return {
            success: false,
            data: null,
            message: data.message || '请求失败',
            code: data.code
          }
        }
      }
      // 直接返回数据（兼容非标准格式）
      return {
        success: true,
        data: data,
        message: '请求成功'
      }
    }
    // 非对象响应
    return {
      success: true,
      data: data,
      message: '请求成功'
    }
  } else {
    // HTTP错误
    return {
      success: false,
      data: null,
      message: `网络错误 (${statusCode})`,
      code: statusCode
    }
  }
}

// 错误处理拦截器
const errorInterceptor = (error) => {
  console.error('API请求错误:', error)
  
  // 网络错误处理
  if (error.errMsg) {
    if (error.errMsg.includes('timeout')) {
      return {
        success: false,
        data: null,
        message: '请求超时，请检查网络连接',
        code: 'TIMEOUT'
      }
    }
    if (error.errMsg.includes('fail')) {
      return {
        success: false,
        data: null,
        message: '网络连接失败，请检查网络设置',
        code: 'NETWORK_ERROR'
      }
    }
  }
  
  return {
    success: false,
    data: null,
    message: '请求异常，请稍后重试',
    code: 'UNKNOWN_ERROR'
  }
}

// 请求拦截器
const request = async (url, method = 'GET', params) => {
  const token = Taro.getStorageSync('token')
  
  const defaultOptions = {
    url: process.env.TARO_APP_BASE_URL + url,
    method: method.toUpperCase(), // 确保请求方法为大写
    header: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    timeout: 10000, // 10秒超时
  }

  // 根据请求方法处理参数
  if (params) {
    const upperMethod = method.toUpperCase()
    
    if (upperMethod === 'GET' || upperMethod === 'DELETE') {
      // GET 和 DELETE 请求：参数拼接到 URL 上
      if (typeof params === 'object' && params !== null) {
        const queryString = Object.keys(params)
          .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
          .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
          .join('&')
        
        if (queryString) {
          defaultOptions.url += (defaultOptions.url.includes('?') ? '&' : '?') + queryString
        }
      }
    } else if (upperMethod === 'POST' || upperMethod === 'PUT' || upperMethod === 'PATCH') {
      // POST、PUT、PATCH 请求：参数放在请求体中
      defaultOptions.data = params
    }
  }

  try {
    const response = await Taro.request(defaultOptions)
    return responseInterceptor(response)
  } catch (error) {
    return errorInterceptor(error)
  }
}

export default request
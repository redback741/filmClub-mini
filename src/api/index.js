import request from '@/utils/request'

export function wxLogin(code) {
  return request({
    url: '/user/wx-login',
    method: 'POST',
    params: {
      code: code
    }
  })
}
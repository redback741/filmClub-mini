import request from '@/utils/request'

export function wxLogin(params) {
  return request({
    url: '/user/wx-login',
    method: 'POST',
    params
  })
}

export function updateUserInfo(params) {
  return request({
    url: '/user/update',
    method: 'POST',
    params
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'GET',
    params: {}
  })
}

export function deleteUser() {
  return request({
    url: '/user/delete',
    method: 'DELETE',
    params: {}
  })
}
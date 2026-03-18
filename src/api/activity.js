import request from '@/utils/request'

export function getUserInfo(params) {
  return request({
    url: '/activity/list',
    method: 'GET',
    params
  })
}
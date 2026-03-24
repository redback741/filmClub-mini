import request from '@/utils/request'

// 电影列表
export function listMovies(params = {}) {
  return request({
    url: '/movie/list',
    method: 'GET',
    params
  })
}
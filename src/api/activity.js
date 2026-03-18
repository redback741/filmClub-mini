import request from '@/utils/request'

// 创建活动
export function createActivity(params) {
  return request({
    url: '/activity/create',
    method: 'POST',
    params
  })
}

// 活动列表
export function listActivities(params = {}) {
  return request({
    url: '/activity/list',
    method: 'GET',
    params
  })
}

// 删除活动（query: id）
export function deleteActivity(id) {
  return request({
    url: '/activity/delete',
    method: 'DELETE',
    params: { id }
  })
}

// 更新活动（query: id，body: CreateActivityDto）
export function updateActivity(id, params) {
  const url = `/activity/update?id=${encodeURIComponent(id)}`
  return request({
    url,
    method: 'POST',
    params
  })
}

// 更新活动状态（query: id, status）
export function updateActivityStatus(id, status) {
  const url = `/activity/update-status?id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`
  return request({
    url,
    method: 'POST',
    params: {}
  })
}

// 获取活动详情（优先尝试 /activity/detail?id，若失败则回退到列表过滤）
export async function getActivityDetail(id) {
  // 首先尝试调用后端详情接口（若存在）
  const tryDetail = await request({
    url: '/activity/detail',
    method: 'GET',
    params: { id }
  })
  if (tryDetail && (tryDetail.success || tryDetail.code === 200)) {
    return tryDetail
  }
  // 回退方案：拉取列表并本地筛选
  const listRes = await listActivities()
  if (listRes && listRes.success && Array.isArray(listRes.data)) {
    const item = listRes.data.find(a => String(a.id) === String(id))
    return {
      success: !!item,
      data: item || null,
      message: item ? '获取成功' : '未找到对应活动',
      code: item ? 200 : 404
    }
  }
  return listRes
}

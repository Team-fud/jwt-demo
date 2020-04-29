import request from '@/utils/request'

/**
 * 获取所有终端req信息
 */
export function getAllReq(page) {
  page = page.toString()
  return request({
    url: '/vue/req/getAllReq/' + page,
    method: 'get'
  })
}

/**
 * 删除req信息
 * @param id
 */
export function deleteReq(id) {
  return request({
    url: '/vue/req/delete/' + id,
    method: 'delete'
  })
}

/**
 * 查找req信息
 */
export function findById(id) {
  return request({
    url: '/vue/req/' + id,
    method: 'get'
  })
}

/**
 * 查询req
 * @param content
 */
export function search(content) {
  return request({
    url: '/vue/req/search/' + content,
    method: 'get'
  })
}

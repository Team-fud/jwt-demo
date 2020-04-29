import request from '@/utils/request'

const baseURL = '/vue/terminal'

/**
 * 日志查询
 * @param {*} searchForm
 */
export function list(page) {
  page = page.toString()
  return request({
    url: '/vue/sys/getAllLog/' + page,
    method: 'get'
  })
}

/**
 * 根据Id查询
 * @param {*} userId
 */
export function findById(id) {
  return request({
    url: '/vue/sys/' + id,
    method: 'get'
  })
}

/**
 * 新增日志*
 * @param {*} data
 */
export function add(data) {
  return request({
    url: baseURL + '/add',
    method: 'post',
    data
  })
}

/**
 * 更新日志
 * @param {*} data
 */
export function update(data) {
  return request({
    url: '/vue/sys/updateLog',
    method: 'put',
    data
  })
}

/**
 * 删除日志
 * @param {*} id
 */
export function delById(id) {
  return request({
    url: '/vue/sys/delete/' + id,
    method: 'delete'
  })
}

/**
 * 查询日志
 * @param content
 */
export function search(content) {
  return request({
    url: '/vue/sys/search/' + content,
    method: 'get'
  })
}

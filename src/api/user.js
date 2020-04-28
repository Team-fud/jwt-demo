import request from '@/utils/request'

const baseURL = '/vue/terminal'

/**
 * 终端查询
 * @param {*} searchForm
 */
export function list(page) {
  page = page.toString()
  return request({
    url: baseURL + '/getAll/' + page,
    method: 'get'
  })
}

/**
 * 查询在线终端
 */
export function online() {
  return request({
    url: baseURL + '/online',
    method: 'get'
  })
}

/**
 * 根据Id查询
 * @param {*} userId
 */
export function findById(id) {
  return request({
    url: baseURL + '/' + id,
    method: 'get'
  })
}

/**
 * 新增终端
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
 * 更新终端
 * @param {*} data
 */
export function update(data) {
  return request({
    url: baseURL + '/updateName',
    method: 'put',
    data
  })
}

/**
 * 删除终端
 * @param {*} id
 */
export function delById(id) {
  return request({
    url: baseURL + '/delete/' + id,
    method: 'delete'
  })
}

/**
 * 踢出终端
 * @param {*} id
 */
export function onlineById(id) {
  return request({
    url: baseURL + '/online/' + id,
    method: 'delete'
  })
}

export function search(content) {
  return request({
    url: baseURL + '/search/' + content,
    method: 'get'
  })
}


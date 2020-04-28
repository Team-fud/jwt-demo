import request from '@/utils/request'

const baseURL = '/vue'

/**
 * 登录
 * @param {*} data
 */
export function login(data) {
  return request({
    url: baseURL + '/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {*} token
 */
export function getInfo(token) {
  return request({
    url: baseURL + '/user/info',
    method: 'get'
  })
}

/**
 * 退出
 */
export function logout() {
  return request({
    url: baseURL + '/user/logout',
    method: 'get'
  })
}

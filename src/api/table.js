import request from '@/utils/request'

export function getList() {
  return request({
    url: '/terminal/getAll',
    method: 'get'
  })
}

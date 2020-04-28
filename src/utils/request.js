import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { setToken, getToken, removeToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  /* baseURL: process.env.BASE_API, */ // api 的 base_url
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    // 刷新Token
    var accessToken = response.headers['authorization']
    if (accessToken) {
      console.log('RefreshToken:' + accessToken)
      removeToken()
      setToken(accessToken)
    }
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.status !== 'success') {
      Message({
        message: res.msg,
        type: 'error',
        duration: 1 * 1000
      })
      alert('2')
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // eslint-disable-next-line eqeqeq
      if (res.status === 'error') {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    console.log(error.response.data)

    // eslint-disable-next-line no-unused-vars
    let msg = error.response.data.msg
    if (error.response.data.code === 500) {
      msg = '服务器异常'
    }
    MessageBox.confirm(
      msg,
      '确定登出',
      {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
    return Promise.reject(error)
  }
)

export default service

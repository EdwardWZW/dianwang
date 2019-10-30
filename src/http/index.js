import axios from 'axios'

const http = axios.create()

// 请求拦截器
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export {
  http
}

export default {
  install (Vue) {
    Vue.prototype.$http = http
    Vue.$http = http
  }
}

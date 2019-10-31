import axios from 'axios'
import qs from 'qs'
import { Toast } from 'vant'
import router from '../router'
import VueCookies from 'vue-cookies'

axios.defaults.timeout = 5000
axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.baseURL = '/api'
axios.interceptors.request.use((config) => {
  // this.$cookies.set('status', res.data.status)
  let token = VueCookies.get('accessToken')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, (error) => {
  console.log('错误的传参')/*  */
  return Promise.reject(error)
})
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
// 对响应数据做些事
console.log(res)
  // if ((res.code == 0 && res.msg == '登录超时！') || (res.data.code == 4700 && (res.data.message == '登录异常，请重新登录' || res.data.message == '您的账号已被冻结，请联系管理员')) ) {
  if (res.data.code == '0' && res.data.msg == '登录超时') {
    Toast('登录异常，请重新登录')
    router.push({name: 'Login'})
  }
  // if (VueCookies.get('status') != 1) {
  //   Toast('认证状态')
  //   router.push({name: 'Login'})
  // }
  // console.log()
  if (!res.data.success) {
    return Promise.resolve(res)
  } else {
    return res
  }
}, (error) => {
  Toast('网络异常')
  return Promise.reject(error)
})

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param})
      .then(response => {
        resolve(response)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  fetchPost,
  fetchGet
}

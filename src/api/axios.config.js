import axios from 'axios'
import NProgress from 'nprogress'
import { Message } from 'element-ui'

console.log(process.env)
const isDev = process.env.NODE_ENV === 'development'

axios.defaults.baseURL = process.env.VUE_APP_API_URL

axios.interceptors.request.use(config => {
  NProgress.start()
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})
axios.interceptors.response.use(data => {
  NProgress.done()
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({ message: data.data.msg })
    return
  }
  return data
}, error => {
  NProgress.done()
  let errorText = error.toString()
  const errNo = Number(/\b\d+/.exec(errorText))
  let data = {
    status: '-666',
    message: '',
    data: null
  }
  if (errNo === 400) {
    data.message = `参数错误，错误码:${errNo}`
  } else if (errNo === 401 || errNo === 403) {
    Message.error('登录过期，请重新登录！')
    // F.Cookie.set('user-token', '')
    let path = `/manage-vipbclass/login?fromUri=${encodeURIComponent(location.href)}`
    let basePath = 'http://test2-mgt.vipfengxiao.com'
    setTimeout(() => {
      location.href = isDev ? basePath + path : path
    }, 1000)
    data.message = `登录过期，错误码:${errNo}`
  } else if (errNo >= 500) {
    data.message = `服务端错误，错误码:${errNo}`
  }
  // 对响应错误做点什么
  return Promise.resolve(data)
})

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const uploadRequest = (url, params) => {
  return axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-sop-setting'
    }
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: url,
    params: params
  })
}

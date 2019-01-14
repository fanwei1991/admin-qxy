import Axios from 'axios'
import { Message } from 'element-ui'

console.log(process.env)

Axios.defaults.baseURL = process.env.VUE_APP_API_URL

Axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({ message: '请求超时!' })
  return Promise.resolve(err)
})
Axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({ message: data.data.msg })
    return
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' })
  } else if (err.response.status === 403) {
    Message.error({ message: '权限不足,请联系管理员!' })
  } else {
    Message.error({ message: '未知错误!' })
  }
  return Promise.resolve(err)
})

export const postRequest = (url, params) => {
  return Axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
export const uploadRequest = (url, params) => {
  return Axios({
    method: 'post',
    url: url,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const getRequest = (url, params) => {
  return Axios({
    method: 'get',
    url: url,
    params: params
  })
}

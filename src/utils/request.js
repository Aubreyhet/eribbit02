import axios from 'axios'
import store from '@/store'
import router from '@/router'
import Message from '@/components/library/Message'

export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

instance.interceptors.request.use(config => {
  // 处理拦截业务
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(res => res.data, err => {
  if (err.response && err.response.status === 401) {
    // 权限异常处理本地用户数据 处理路由地址
    store.commit('user/setUser', {})
    // 路由处理
    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  } else {
    Message({ type: 'error', text: err.response.data.message })
  }
  return Promise.reject(err)
})

export default (url, method, submitData) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}

// service统一出口

// 导入封装好的类
import CXRequest from './request'
import { BASE_URL, TIME_OUT } from '@/service/request/config'

export const cxRequest = new CXRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 实例携带的拦截器信息
  interceptors: {
    requestInterceptor: (config) => {
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

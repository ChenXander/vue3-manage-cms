import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// interceptors 的类型
export interface CXRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (res: any) => any
  responseInterceptorCatch?: (error: any) => any
}

// 定义自己的类型约束接口CXRequestConfig扩展axios原有的
// 实例化对象或传递请求参数时按需传入拦截器
export interface CXRequestConfig extends AxiosRequestConfig {
  interceptors?: CXRequestInterceptors
  showLoading?: boolean
}

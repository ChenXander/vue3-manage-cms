import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { CXRequestInterceptors, CXRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

// 封装网络请求类
class CXRequest {
  instance: AxiosInstance
  interceptors?: CXRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: CXRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器，允许多个实例，每个实例可以传入自己的拦截器配置
    this.instance.interceptors.request.use(
      // 请求
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      // 响应
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例公共的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器：请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应成功拦截')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.retrunCode === '-1001') {
          console.log('请求失败~，错误信息')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有实例都有的拦截器：响应失败拦截')
        // 将loading移除
        this.loading?.close()
        return err
      }
    )
  }

  // 请求拦截
  request(config: CXRequestConfig) {
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }

    if (config.showLoading === false) {
      this.showLoading = config.showLoading
    }

    this.instance
      .request(config)
      .then((res) => {
        if (config.interceptors?.responseInterceptor) {
          res = config.interceptors?.responseInterceptor(res)
        }
        console.log(res)

        // 请求结束重置loading
        this.showLoading = DEFAULT_LOADING
      })
      .catch((err) => {
        // 重置loading
        this.showLoading = DEFAULT_LOADING
        return err
      })
  }
}

export default CXRequest

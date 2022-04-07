/**
 * 1.方式一: 手动的切换不同的环境(不推荐)
    const BASE_URL = 'https://www.baidu.com/dev'
    const BASE_NAME = '张三'

    const BASE_URL = 'https://www.baidu.com/prod'
    const BASE_NAME = '李四'

    const BASE_URL = 'https://www.baidu.com/test'
    const BASE_NAME = '王五'
 */

/**
 * 2.根据process.env.NODE_ENV区分
    开发环境: development
    生成环境: production
    测试环境: test
 */

// 配置全局变量
let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://123.207.32.32:8000/'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'https://www.baidu.com'
} else {
  BASE_URL = 'https://www.baidu.com'
}

export { BASE_URL, TIME_OUT }

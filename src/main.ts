import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

import { cxRequest } from './service'

/**
 *
 *
 *
 *
 *
 *
 */
interface DataType {
  data: any
  retrunCode: string
  success: boolean
}

cxRequest
  .get<DataType>({
    url: '/home/multidata',
    showLoading: false
  })
  .then((res) => {
    console.log(res.data)
  })

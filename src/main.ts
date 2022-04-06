import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')

import { cxRequest } from './service'

cxRequest.request({
  url: '/home/multidata',
  method: 'GET',
  showLoading: false
})

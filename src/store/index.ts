import { createStore } from 'vuex'

const store = createStore({
  state: () => {
    return {
      name: 'test'
    }
  }
})

export default store

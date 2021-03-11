import App from './App.vue'
import { routes } from './router'
import { createRenderer } from '../packages/render'

export default createRenderer({
  App,
  routes,
  el: '#app'
})

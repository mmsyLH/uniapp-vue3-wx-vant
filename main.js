import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './utils/pinia.js'
import request from './http/request.js'
import './router/index.js'


export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.config.globalProperties.$request=request
  return {
    app,
  	pinia
  }
}

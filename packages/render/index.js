import { createSSRApp } from 'vue'
import {
  createMemoryHistory,
  createRouter,
  createWebHistory
} from 'vue-router'

/**
* SSR requires a fresh app instance per request, therefore we export a function
* that creates a fresh app instance. If using Vuex, we'd also be creating a
* fresh store here.
*/
export function createApp(App, routes) {
  const app = createSSRApp(App)
  const router = createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

  app.use(router)
  return { app, router }
}

function clientRender({ App, el, routes }) {
  const { app, router } = createApp(App, routes)
    
    router.isReady().then(() => {
      app.mount(el, true)
    })
}

function createServerApp({ App, routes }) {
  return async function startUpServerApp(url) {
    try {
      const { app, router } = createApp(App, routes)

      router.push(url);
      await router.isReady()

      return { app }
    } catch (e) {
      throw e
    }
  }
}

export function createRenderer(options) {
  clientRender(options);

  return createServerApp(options)
}

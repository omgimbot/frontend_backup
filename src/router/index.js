import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import { LocalStorage } from 'quasar'
import routes from './routes'
// console.log(app)
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach((to, from, next) => {
    const dataUser = LocalStorage.getItem('data')
    console.log(dataUser)
    const noSession = dataUser === null || dataUser === 'undefined'
    const loginPage = 'loginPage'
    if (to.matched.some(record => record.meta.requiredLogin)) {
      if (noSession) {
        next({
          name: loginPage
        })
      } else {
        if (dataUser.data.user.ROLE === 'admin_sekolah') {
          next()
        } else {
          next({
            name: loginPage
          })
        }
      }
    } else if (to.matched.some(record => record.meta.guestPage)) {
      if (noSession) {
        next()
      } else {
        const role = dataUser.data.user.ROLE
        if (role === 'admin_sekolah') {
          next({
            name: 'dashboard'
          })
        }
      }
    } else {
      next()
    }
  })

  return Router
})

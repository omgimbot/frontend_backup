import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$getProfile = () => {
    return LocalStorage.getItem('data')
  }
})

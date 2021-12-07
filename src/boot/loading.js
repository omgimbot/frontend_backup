import { boot } from 'quasar/wrappers'
import { QSpinnerTail } from 'quasar'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$ol = {
    spinner: QSpinnerTail
  }
})

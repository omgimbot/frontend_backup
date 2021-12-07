import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const baseURL = 'http://192.168.43.58:5050'
// const baseURL = 'http://192.168.43.151:5050'
// const baseURL = 'http://172.20.10.6:5050'
const baseURL = 'http://localhost:5050'
const api = axios.create({ baseURL: baseURL })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = api

  app.config.globalProperties.$wilayah = {
    getProv () {
      return api.get('/wilayah/provinsi')
    },
    getKab (prov) {
      return api.get(`/wilayah/kabupaten/${prov}`)
    },
    getKec (kab) {
      return api.get(`/wilayah/kecamatan/${kab}`)
    },
    getKel (kec) {
      return api.get(`/wilayah/kelurahan/${kec}`)
    }
  }
})

export { api }

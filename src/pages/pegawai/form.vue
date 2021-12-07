<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Pegawai" icon="manage_accounts" />
          <q-breadcrumbs-el label="Pegawai" icon="supervisor_account" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Pegawai" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Pegawai" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Pegawai Sekolah</div>
                  <p class="text-caption">Form {{this.title}} data pegawai sekolah.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NO_DAFTAR"
                        label="NO. PENDAFTARAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NAMA_LENGKAP"
                        label="NAMA LENGKAP"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NAMA_PANGGILAN"
                        label="NAMA PANGGILAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select
                        outlined
                        v-model="form.JK"
                        dense lazy-rules filled
                        :options="options.jenis_kelamin"
                        label="JENIS KELAMIN"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.TEMPAT_LAHIR"
                        label="TEMPAT LAHIR"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input filled v-model="form.TGL_LAHIR" dense label="TANGGAL LAHIR">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="form.TGL_LAHIR" mask="YYYY-MM-DD">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select
                        outlined
                        v-model="form.GOLONGAN_DARAH"
                        dense lazy-rules filled
                        :options="options.golongan_darah"
                        label="GOLONGAN DARAH"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.GELAR_DEPAN"
                        label="GELAR DEPAN"
                        lazy-rules
                        dense
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.GELAR_BELAKANG"
                        label="GELAR BELAKANG"
                        lazy-rules
                        dense
                      />
                    </div>
                  </div>

                  <div class="q-mt-lg">
                    <q-stepper
                      v-model="step"
                      vertical
                      color="primary"
                      animated
                    >
                      <q-step
                        :name="1"
                        title="Data Pokok"
                        icon="settings"
                        :done="step > 1"
                      >
                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA PRIBADI</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NIK"
                              label="NO. INDUK KEPENDUDUKAN"
                              lazy-rules
                              mask="################"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.AGAMA"
                              dense lazy-rules filled
                              :options="options.agama"
                              label="AGAMA"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.KEBUTUHAN_KHUSUS"
                              dense lazy-rules filled :options="options.kebutuhan_khusus"
                              label="KEBUTUHAN KHUSUS"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.NO_HP"
                              label="NO. HANDPHONE"
                              lazy-rules
                              dense
                              mask="#############"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.email"
                              label="EMAIL PRIBADI"
                              lazy-rules
                              dense
                              type="email"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.AREA.ALAMAT"
                              label="ALAMAT TEMPAT TINGGAL"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.AREA.PROVINSI"
                              @update:model-value="getKab"
                              dense
                              lazy-rules
                              use-input
                              filled
                              option-label="name"
                              :options="options.areas.provinsi"
                              @filter="filterProv"
                              label="PROVINSI"
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    Hasil tidak ditemukan
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              :disable="form.AREA.PROVINSI === null"
                              v-model="form.AREA.KABUPATEN"
                              @update:model-value="getKec"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.areas.kabupaten"
                              @filter="filterKab"
                              label="KABUPATEN"
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    Hasil tidak ditemukan
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              :disable="form.AREA.KABUPATEN === null"
                              v-model="form.AREA.KECAMATAN"
                              @update:model-value="getKel"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.areas.kecamatan"
                              @filter="filterKec"
                              label="KECAMATAN"
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    Hasil tidak ditemukan
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>
                          </div>
                        </div>

                        <div class="row q-gutter-sm q-mt-md">
                          <div class="col-3">
                            <q-select
                              outlined
                              :disable="form.AREA.KECAMATAN === null"
                              v-model="form.AREA.KELURAHAN"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.areas.kelurahan"
                              @filter="filterKel"
                              label="KELURAHAN"
                            >
                              <template v-slot:no-option>
                                <q-item>
                                  <q-item-section class="text-grey">
                                    Hasil tidak ditemukan
                                  </q-item-section>
                                </q-item>
                              </template>
                            </q-select>
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.AREA.RT"
                              label="RT"
                              lazy-rules
                              mask="####"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.AREA.RW"
                              label="RW"
                              lazy-rules
                              mask="####"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.AREA.KODE_POS"
                              label="KODE POS"
                              lazy-rules
                              dense
                              mask="######"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.AREA.LOCATION"
                              label="TITIK KORDINAT"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            TITIK KOORDINAT
                            <div class="row" style="height: 350px;">
                                <l-map :zoom="map.zoom" :center="map.center">
                                    <l-tile-layer :url="map.url" :attribution="map.attribution"/>
                                </l-map>
                            </div>
                          </div>
                        </div>

                        <div class="row q-gutter-sm q-mt-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NPWP.NO"
                              label="NO. NPWP"
                              lazy-rules
                              mask="#############"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NPWP.NAMA"
                              label="NAMA WAJIB PAJAK"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.KEWARGANEGARAAN"
                              dense lazy-rules filled
                              :options="options.kewarganegaraan"
                              label="WARGA NEGARA" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.STATUS.STATUS_KAWIN"
                              dense lazy-rules filled
                              :options="options.status_kawin"
                              label="STATUS KAWIN"
                            />
                          </div>
                          <div class="col" v-if="form.STATUS.STATUS_KAWIN === 'Sudah Menikah'">
                            <q-input
                              filled
                              v-model="form.STATUS.NAMA_PASANGAN"
                              label="NAMA PASANGAN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col" v-if="form.STATUS.STATUS_KAWIN === 'Sudah Menikah'">
                            <q-select
                              outlined
                              v-model="form.STATUS.PEKERJAAN_PASANGAN"
                              dense lazy-rules filled
                              :options="options.pekerjaan"
                              label="PEKERJAAN PASANGAN"
                            />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA ANAK</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="ANAK KE" />
                          </div>
                          <div v-for="(anak, i) in form.DATA_ANAK" :key="i">
                            <div class="col-3">
                              <q-select
                                outlined
                                v-model="anak.ANAK_KE"
                                dense lazy-rules filled
                                :options="options.anak_ke"
                                label="ANAK KE - "
                              />
                            </div>
                            <div class="col-7">
                              <q-input
                                filled
                                v-model="anak.NAMA"
                                label="NAMA ANAK"
                                lazy-rules
                                dense
                                :rules="[ val => val && val.length > 0 || 'Please type something']"
                              />
                            </div>
                            <div class="col">
                              <q-btn size="sm" outline icon="delete_outline" type="submit" color="red" @click="removeAnak(i)" v-show="i || ( !i && form.DATA_ANAK.length > 1)" />
                              <q-btn size="sm" outline class="q-mr-md" icon="add" type="submit" color="green" @click="addAnak(i)" v-show="i == form.DATA_ANAK.length-1" />
                            </div>
                          </div>
                        </div>

                        <q-stepper-navigation>
                          <q-btn color="green" outline type="submit" label="SELESAI" />
                        </q-stepper-navigation>
                      </q-step>

                    </q-stepper>
                  </div>

                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

let provinsi = []
let kabupaten = []
let kecamatan = []
let kelurahan = []

export default {
  components: {
    LMap,
    LTileLayer
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    return {
      step: 1,
      map: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 7,
        center: L.latLng([-5.4170269, 105.2689625])
      },
      form: {
        NO_DAFTAR: null,
        NAMA_LENGAKAP: null,
        NAMA_PANGGILAN: null,
        JK: null,
        TEMPAT_LAHIR: null,
        TGL_LAHIR: null,
        GOLONGAN_DARAH: null,
        GELAR_DEPAN: null,
        GELAR_BELAKANG: null,
        NIK: null,
        AGAMA: null,
        KEBUTUHAN_KHUSUS: null,
        NO_HP: null,
        EMAIL: null,
        KEWARGANEGARAAN: null,
        AREA: {
          ALAMAT: null,
          PROVINSI: null,
          KABUPATEN: null,
          KECAMATAN: null,
          KELURAHAN: null,
          RT: null,
          RW: null,
          KODE_POS: null,
          LOCATION: []
        },
        NPWP: {
          NO: null,
          NAMA: null
        },
        STATUS: {
          STATUS_KAWIN: null,
          NAMA_PASANGAN: null,
          PEKERJAAN_PASANGAN: null
        },
        DATA_ANAK: [
          {
            ANAK_KE: null,
            NAMA: null
          }
        ]
      },
      options: {
        jenis_kelamin: this.$option.jenisKelamin,
        agama: this.$option.agama,
        golongan_darah: this.$option.golonganDarah,
        kebutuhan_khusus: this.$option.kebutuhanKhusus,
        kewarganegaraan: this.$option.kewarganegaraan,
        status_kawin: this.$option.statusKawin,
        pekerjaan: this.$option.pekerjaan,
        anak_ke: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
        areas: {
          provinsi: [],
          kabupaten: [],
          kecamatan: [],
          kelurahan: []
        }
      }
    }
  },
  computed: {
  },
  created () {
    this.getProv()
  },
  methods: {
    getProv: async function () {
      try {
        const response = await this.$wilayah.getProv()
        response.status === 200 ? provinsi = response.data.data : provinsi = []
      } catch (err) {
      }
    },
    filterProv (val, update) {
      if (val === '') {
        update(() => {
          this.options.areas.provinsi = provinsi
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.areas.provinsi = provinsi.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    getKab: async function (val) {
      try {
        const response = await this.$wilayah.getKab(val.id)
        response.status === 200 ? kabupaten = response.data.data : kabupaten = []
      } catch (err) { }
    },
    filterKab (val, update) {
      if (val === '') {
        update(() => {
          this.options.areas.kabupaten = kabupaten
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.areas.kabupaten = kabupaten.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    getKec: async function (val) {
      try {
        const response = await this.$wilayah.getKec(val.id)
        response.status === 200 ? kecamatan = response.data.data : kecamatan = []
      } catch (err) { }
    },
    filterKec (val, update) {
      if (val === '') {
        update(() => {
          this.options.areas.kecamatan = kecamatan
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.areas.kecamatan = kecamatan.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    getKel: async function (val) {
      try {
        const response = await this.$wilayah.getKel(val.id)
        response.status === 200 ? kelurahan = response.data.data : kelurahan = []
      } catch (err) { }
    },
    filterKel (val, update) {
      if (val === '') {
        update(() => {
          this.options.areas.kelurahan = kelurahan
        })
        return
      }
      update(() => {
        const needle = val.toLowerCase()
        this.options.areas.kelurahan = kelurahan.filter(v => v.name.toLowerCase().indexOf(needle) > -1)
      })
    },
    addAnak (index) {
      this.form.DATA_ANAK.push({
        ANAK_KE: null,
        NAMA: null
      })
    },
    removeAnak (index) {
      this.form.DATA_ANAK.splice(index, 1)
    },
    onSubmit () {
    },
    onReset () {
    }
  }
}
</script>

<style scoped>

</style>

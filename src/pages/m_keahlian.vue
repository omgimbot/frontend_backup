<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Master Data" icon="verified_user" />
          <q-breadcrumbs-el label="Keahlian" icon="tips_and_updates" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title"> Data Keahlian</div>
                  <p class="text-caption">Form data keahlian.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="form.JURUSAN_CODE"
                        filled
                        label="KODE KEAHLIAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                       v-model="form.SINGKATAN"
                        filled
                        label="SINGKATAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="form.JURUSAN"
                        filled
                        label="PROGRAM KEAHLIAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                       v-model="form.KETERANGAN"
                        filled
                        label="KETERANGAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="form.KEPALA_JURUSAN"  dense lazy-rules filled :options="options.status" label="KEPALA JURUSAN" />
                    </div>
                  </div>
                  <div class="q-mt-md">
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Reset" type="reset" color="red" outline class="q-ml-sm" style="width:150px" />
                  </div>

                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    title="Master Data Keahlian"
                    aria-label="Text"
                    class="text-h5"
                    :rows="rows"
                    flat
                    :columns="columns"
                    row-key="name"
                    :filter="filter"
                  >

                  <template v-slot:top>
                    <div class="col">
                      <div class="col-2 q-table__title">Master Data Keahlian</div>
                      <p class="text-caption">Data keahlian di sekolah.</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="JURUSAN" :props="props">{{props.row.JURUSAN_CODE}} - {{props.row.JURUSAN}}
                        <q-badge color="blue">
                          {{props.row.SINGKATAN}}
                        </q-badge>
                      </q-td>
                      <q-td key="KEPALA_JURUSAN" :props="props">{{props.row.KEPALA_JURUSAN}}</q-td>
                      <q-td key="KETERANGAN" :props="props">{{props.row.KETERANGAN}}</q-td>
                      <!-- <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" @click="this.delete(props.row.GUID)" size="sm" icon="delete" no-caps class="q-ml-sm" />
                      </q-td> -->
                      <q-td key="aksi" :props="props">
                          <q-btn
                            round
                            outline
                            flat
                            color="red"
                            @click="this.delete(props.row.GUID)"
                            size="sm"
                            icon="delete"
                            class="q-ml-sm"
                          />
                        </q-td>
                    </q-tr>
                  </template>

                </q-table>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

      </div>
    </div>
  </q-page>

</template>

<script>
// import api from '../middleware/routes_api/routes'
export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'JURUSAN', required: true, label: 'NAMA', align: 'left', field: 'JURUSAN', sortable: true },
        { name: 'KEPALA_JURUSAN', required: true, label: 'KAJUR', align: 'left', field: 'KEPALA_JURUSAN', sortable: true },
        { name: 'KETERANGAN', required: true, label: 'KET', align: 'left', field: 'KETERANGAN', sortable: true },
        { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: [],
      detail: {
        visible: false,
        grandTotal: null,
        supplier: null,
        columns: [
          { name: 'idPembelian', required: true, label: 'ID Pembelians', align: 'left', field: 'idPembelian', sortable: true },
          { name: 'namaBarang', required: true, label: 'Nama Barang', align: 'left', field: 'namaBarang', sortable: true },
          { name: 'hargaSatuan', required: true, label: 'Harga Satuan', align: 'left', field: 'hargaSatuan', sortable: true },
          { name: 'jumlahPembelian', required: true, label: 'Jumlah Pembelian', align: 'left', field: 'jumlahPembelian', sortable: true },
          { name: 'pajak', required: true, label: 'Pajak', align: 'left', field: 'pajak', sortable: true },
          { name: 'total', required: true, label: 'Subtotal', align: 'left', field: 'total', sortable: true },
          { name: 'stok', required: true, label: 'Stok', align: 'left', field: 'stok', sortable: true },
          { name: 'deskripsi', required: true, label: 'Deskripsi', align: 'left', field: 'deskripsi', sortable: true }
        ],
        rows: []
      },
      options: {
        status: [
          'Lunas', 'Hutang'
        ]
      },
      form: {
        JURUSAN: null,
        JURUSAN_CODE: null,
        KEPALA_JURUSAN: null,
        KETERANGAN: null,
        SINGKATAN: null
      }
    }
  },
  created () {
    this.getJurusan()
  },
  methods: {
    onSubmit () {
      const data = this.form
      const AuthStr = this.$getProfile().data
      this.$q.loading.show()
      try {
        this.$axios.post('jurusan/create', data, {
          headers: {
            Authorization: 'Bearer ' + AuthStr.token
          }
        })
          .finally(() => this.$q.loading.hide())
          .then((response) => {
            // console.log(response.data)
            this.$parseResponse(response.data)
            if (!this.$parseResponse(response.data)) {
              this.$successNotif('Berhasil Memuat Permintaan')
            // this.$router.push({ name: 'ppdb_add' })
            }
          })
      } catch (e) {
        console.log('wew')
        this.$comonErrorNotif('Terjadi kesalahan !', 'negative')
      }
    },
    getJurusan () {
      const token = this.$getProfile().data.token
      this.$q.loading.show()
      try {
        this.$axios.get('jurusan/', {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
          .finally(() => this.$q.loading.hide())
          .then((res) => {
            if (!this.$parseResponse(res.data)) {
              const data = res.data.data
              // console.log(data)
              this.rows = data
              // this.$router.push({ name: 'ppdb_add' })
            }
          })
      } catch (e) {
        this.$comonErrorNotif('Terjadi kesalahan !', 'negative')
      }
    },
    delete (id) {
      const token = this.$getProfile().data.token
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$axios.delete('jurusan/' + id, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.$successNotif(res.data.message)
                this.getJurusan()
              // this.$router.push({ name: 'ppdb_add' })
              }
            })
        } catch (e) {
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Master Data" icon="verified_user" />
          <q-breadcrumbs-el label="Kelas" icon="meeting_room" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title"> Data Kelas</div>
                  <p class="text-caption"> data kelas.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">
                <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        v-model="form.KELAS_CODE"
                        name="KELAS_CODE"
                        filled
                        label="KODE KELAS"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      v-model="form.KELAS"
                        name="KELAS"
                        filled
                        label="NAMA KELAS"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select outlined v-model="form.TINGKAT" dense lazy-rules filled :options="options.status" label="TINGKAT" />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="form.JURUSAN" dense lazy-rules filled :options="options.status" label="PROGRAM KEAHLIAN" />
                    </div>
                  </div>
                  <div class="row q-gutter-sm q-mt-md">
                    <div class="col">
                      <q-select outlined v-model="form.TIPE_RUANG" dense lazy-rules filled :options="options.tipe_ruang" label="TIPE RUANG KELAS" />
                    </div>
                    <div class="col">
                      <q-input
                        v-model="form.DAYA_TAMPUNG"
                        filled
                        label="DAYA TAMPUNG"
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
                  <div>
                    <q-btn label="Submit" outline type="submit" color="green" style="width:150px" />
                    <q-btn label="Reset" outline type="reset" color="red"  class="q-ml-sm" style="width:150px" />
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
                    title="Master Data Kelas"
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
                      <div class="col-2 q-table__title">Master Data Kelas</div>
                      <p class="text-caption">Data kelas di sekolah.</p>
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
                      <q-td key="KELAS" :props="props">{{props.row.KELAS}}
                        <q-badge color="blue">
                          {{props.row.KELAS_CODE}}
                        </q-badge>
                      </q-td>
                      <q-td key="TINGKAT" :props="props">{{props.row.TINGKAT}}
                        <q-badge color="blue">
                          {{props.row.JURUSAN}}
                        </q-badge>
                      </q-td>
                      <q-td key="TIPE_RUANG" :props="props">{{props.row.TIPE_RUANG}}</q-td>
                      <q-td key="DAYA_TAMPUNG" :props="props">{{props.row.DAYA_TAMPUNG}}</q-td>
                      <q-td key="KETERANGAN" :props="props">{{props.row.KETERANGAN}}</q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" @click="this.delete(props.row.GUID)" size="sm" icon="delete" no-caps class="q-ml-sm" />
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

export default {
  name: 'PageIndex',
  components: {
  },
  data () {
    return {
      form: {
        KELAS_CODE: null,
        KELAS: null,
        TINGKAT: null,
        JURUSAN: null,
        TIPE_RUANG: null,
        DAYA_TAMPUNG: null,
        KETERANGAN: null
      },
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'KELAS', required: true, label: 'NAMA KELAS', align: 'left', field: 'KELAS', sortable: true },
        { name: 'TINGKAT', required: true, label: 'TINGKAT', align: 'left', field: 'TINGKAT', sortable: true },
        { name: 'TIPE_RUANG', required: true, label: 'TIPE', align: 'left', field: 'TIPE_RUANG', sortable: true },
        { name: 'DAYA_TAMPUNG', required: true, label: 'DAYA TAMPUNG', align: 'left', field: 'DAYA_TAMPUNG', sortable: true },
        { name: 'KETERANGAN', required: true, label: 'KET', align: 'left', field: 'KETERANGAN', sortable: true },
        { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
      ],
      rows: [],
      options: {
        status: [
          'Lunas', 'Hutang'
        ],
        tipe_ruang: [
          'Ruang Kelas', 'Laboratorium', 'Ruang Praktikum'
        ]
      }
    }
  },
  created () {
    this.getKelas()
  },
  methods: {
    onSubmit () {
      const AuthStr = this.$getProfile().data
      const data = this.form
      this.$q.loading.show()
      this.$axios.post('kelas/create', data, {
        headers: {
          Authorization: 'Bearer ' + AuthStr.token
        }
      })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            // console.log(res.data)
            this.$successNotif(res.data.message)
            this.getKelas()
            // this.$router.push({ name: 'ppdb_add' })
          }
        })
    },
    getKelas () {
      const AuthStr = this.$getProfile().data
      try {
        this.$axios.get('kelas/', {
          headers: {
            Authorization: 'Bearer ' + AuthStr.token
          }
        })
          .finally(() => this.$q.loading.hide())
          .then((res) => {
            if (!this.$parseResponse(res.data)) {
              console.log(res.data)
              this.rows = res.data.data
              // location.reload()
              // this.$router.push({ name: 'ppdb_add' })
            }
          })
      } catch (e) {
        console.log(e)
        this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    delete (GUID) {
      console.log(GUID)
      const AuthStr = this.$getProfile().data
      this.$q.dialog({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        try {
          this.$axios.delete('kelas/' + GUID, {
            headers: {
              Authorization: 'Bearer ' + AuthStr.token
            }
          })
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.getKelas()
                // this.$router.push({ name: 'ppdb_add' })
              }
            })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    },
    onReset () {
      this.form.KELAS_CODE = null
      this.form.KELAS = null
      this.form.TINGKAT = null
      this.form.JURUSAN = null
      this.form.TIPE_RUANG = null
      this.form.DAYA_TAMPUNG = null
      this.form.KETERANGAN = null
    }
  }
}
</script>

<style scoped>

</style>

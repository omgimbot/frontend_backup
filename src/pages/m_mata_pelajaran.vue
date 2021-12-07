<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Master Data" icon="verified_user" />
          <q-breadcrumbs-el label="Mata Pelajaran" icon="vertical_split" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Mata Pelajaran</div>
                  <p class="text-caption">Form {{this.title}} data mata pelajaran.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      v-model="form.NAMA"
                        filled
                        label="NAMA MATA PELAJARAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="form.TIPE" dense lazy-rules filled :options="options.status" label="TIPE" />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      v-model="form.MAPEL_CODE"
                        filled
                        label="KODE MATA PELAJARAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                   <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                      v-model="form.SKS"
                        filled
                        label="SKS"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div>
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
                    title="Master Data Mata Pelajaran"
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
                      <div class="col-2 q-table__title">Master Data Mata Pelajaran</div>
                      <p class="text-caption">Data mata pelajaran sekolah.</p>
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
                      <q-td key="MAPEL_CODE" :props="props">{{props.row.MAPEL_CODE}}</q-td>
                      <q-td key="NAMA" :props="props">{{props.row.NAMA}}</q-td>
                      <q-td key="TIPE" :props="props">{{props.row.TIPE}}</q-td>
                      <q-td key="SKS" :props="props">{{props.row.TIPE}}</q-td>
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
        NAMA: null,
        TIPE: null,
        MAPEL_CODE: null,
        SKS: null
      },
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'MAPEL_CODE', required: true, label: 'Kode Mapel', align: 'left', field: 'MAPEL_CODE', sortable: true },
        { name: 'NAMA', required: true, label: 'Nama', align: 'left', field: 'NAMA', sortable: true },
        { name: 'TIPE', required: true, label: 'Tipe', align: 'left', field: 'TIPE', sortable: true },
        { name: 'SKS', required: true, label: 'SKS', align: 'left', field: 'SKS', sortable: true },
        { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: [],
      options: {
        status: [
          'Biasa', 'Gabung'
        ]
      }
    }
  },
  created () {
    this.getMapel()
  },
  methods: {
    onSubmit () {
      const AuthStr = this.$getProfile().data
      const data = this.form
      this.$q.loading.show()
      this.$axios.post('mapel/create', data, {
        headers: {
          Authorization: 'Bearer ' + AuthStr.token
        }
      })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            // console.log(res.data)
            this.$successNotif(res.data.message)
            this.getMapel()
            // this.$router.push({ name: 'ppdb_add' })
          }
        })
    },
    getMapel () {
      const AuthStr = this.$getProfile().data
      try {
        this.$axios.get('mapel/', {
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
          this.$axios.delete('mapel/' + GUID, {
            headers: {
              Authorization: 'Bearer ' + AuthStr.token
            }
          })
            .finally(() => this.$q.loading.hide())
            .then((res) => {
              if (!this.$parseResponse(res.data)) {
                this.getMapel()
                // this.$router.push({ name: 'ppdb_add' })
              }
            })
        } catch (e) {
          console.log(e)
          this.$showNotif('Terjadi kesalahan !', 'negative')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

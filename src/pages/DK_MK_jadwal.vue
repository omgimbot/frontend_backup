<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Data Kurikulum" icon="analytics" />
          <q-breadcrumbs-el label="Manajemen Kelas" icon="view_quilt" />
          <q-breadcrumbs-el label="Jadwal" icon="bookmark_added" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Jadwal Pelajaran</div>
                  <p class="text-caption">Form {{this.title}} data jadwal pelajaran.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        label="NAMA KELAS"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select outlined v-model="AS" dense lazy-rules filled :options="options.status" label="NAMA MATA PELAJARAN" />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-select
                        filled
                        v-model="model"
                        use-input
                        dense
                        input-debounce="0"
                        label="GURU MATA PELAJARAN"
                        :options="options.pegawai"
                        @filter="filterFn"
                        behavior="dialog"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="row q-gutter-sm q-mt-md">
                    <div class="col">
                      <q-select outlined v-model="AS" dense lazy-rules filled :options="options.status" label="HARI" />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        label="JAM MULAI"
                        type="time"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        label="JAM SELESAI"
                        lazy-rules
                        type="time"
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
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
                    title="Master Data Beasiswa"
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
                      <div class="col-2 q-table__title">Master Data Jadwal Pelajaran</div>
                      <p class="text-caption">Data jadwal pelajaran.</p>
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
                      <q-td key="id_pembelian" :props="props">{{props.row.id_pembelian}}</q-td>
                      <q-td key="supplier" :props="props">{{props.row.supplier}}</q-td>
                      <q-td key="nomorTelepon" :props="props">{{props.row.nomorTelepon}}</q-td>
                      <q-td key="hari" :props="props">{{props.row.nomorTelepon}}</q-td>
                      <q-td key="aksi" :props="props">
                        <q-btn round outline color="red" @click="this.delete(props.row._id)" size="sm" icon="delete" no-caps class="q-ml-sm" />
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
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'id_pembelian', required: true, label: 'KELAS', align: 'left', field: 'id_pembelian', sortable: true },
        { name: 'supplier', required: true, label: 'MATA PELAJARAN', align: 'left', field: 'supplier', sortable: true },
        { name: 'nomorTelepon', required: true, label: 'GURU', align: 'left', field: 'nomorTelepon', sortable: true },
        { name: 'hari', required: true, label: 'HARI', align: 'left', field: 'hari', sortable: true },
        { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
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
    this.getPembelian()
  },
  methods: {
    getPembelian () {
      // try {
      //   this.$api.get('pembelian/get')
      //     .then(res => {
      //       if (res.data.status !== true) {
      //         this.$showNotif(res.data.message, 'negative')
      //       } else {
      //         const data = res.data.result
      //         this.rows = data
      //         for (let i = 0; i < data.length; i++) {
      //           if (data[i].statusPembelian === 'Lunas') {
      //             this.totalLunas += data[i].grandTotal
      //           }
      //           if (data[i].statusPembelian === 'Hutang') {
      //             this.totalHutang += data[i].grandTotal
      //           }
      //         }
      //       }
      //     })
      // } catch (e) {
      //   this.$showNotif('Terjadi kesalahan !', 'negative')
      // }
    },
    showDetail (id, supplier, grandTotal) {
      // try {
      //   this.$api.get('pembelian/detail/' + id)
      //     .then(res => {
      //       if (res.data.status !== true) {
      //         this.$showNotif(res.data.message, 'negative')
      //       } else {
      //         this.detail.rows = res.data.result.map(r => {
      //           return {
      //             _id: r._id,
      //             objectIdPembelian: r.objectIdPembelian,
      //             idPembelian: r.idPembelian,
      //             namaBarang: r.namaBarang,
      //             hargaSatuan: this.$formatPrice(r.hargaSatuan),
      //             jumlahPembelian: r.jumlahPembelian,
      //             pajak: r.pajak + '%',
      //             stok: r.stok,
      //             deskripsi: r.deskripsi,
      //             total: this.$formatPrice(r.total)
      //           }
      //         })
      //         this.detail.supplier = supplier
      //         this.detail.grandTotal = grandTotal
      //         this.detail.visible = true
      //       }
      //     })
      //   this.detail.visible = true
      // } catch (e) {
      //   console.log(e)
      //   this.$showNotif('Terjadi kesalahan !', 'negative')
      // }
    },
    delete (id) {
      this.$dialog.create({
        title: 'Peringatan',
        message: 'Apakah Anda Yakin ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // try {
        //   this.$api.delete('/pembelian/delete/' + id).then(res => {
        //     if (res.data.status !== true) {
        //       this.$showNotif(res.data.message, 'negative')
        //     } else {
        //       this.totalLunas = 0
        //       this.totalHutang = 0
        //       this.getPembelian()
        //       this.$showNotif(res.data.message, 'positive')
        //     }
        //   })
        // } catch (e) {
        //   console.log(e)
        //   this.$showNotif('Terjadi kesalahan !', 'negative')
        // }
      })
    }
  }
}
</script>

<style scoped>

</style>

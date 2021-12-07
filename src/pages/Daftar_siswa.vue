<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Siswa" icon="extension" />
          <q-breadcrumbs-el label="Daftar Siswa" icon="person_search" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <div class="row q-gutter-md col-12">
          <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6 q-mt-sm" style="font-size: 14px">Data siswa sekolah</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    semua data siswa sekolah.
                  </div>
                  <div class="row">
                    <div class="row items-center">
                      <q-icon name="male" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        pria
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='Number(totalHutang)' :duration='3' :autoinit='true' /></div>
                    </div>
                    <div class="row items-center q-ml-lg">
                      <q-icon name="female" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        wanita
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter ref='counter' :startAmount='0' :endAmount='Number(totalHutang)' :duration='3' :autoinit='true' /></div>
                    </div>
                  </div>
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>

        <div class="row col-12 q-mt-md">
          <q-card class="my-card col" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="col-12 q-pa-sm">
                  <q-table
                    title="Master Data PPDP"
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
                      <div class="col-2 q-table__title">Master Data Siswa Sekolah</div>
                      <p class="text-caption">Data siswa sekolah.</p>
                    </div>

                    <q-space />

                    <q-btn flat round color="primary" icon="search" @click="visibles = !visibles" size="md" class="q-mr-sm" />
                    <q-slide-transition>
                      <div v-show="visibles">
                        <q-input outlined debounce="300" placeholder="Placeholder" style="width:300px" color="primary" v-model="filter" dense />
                      </div>
                    </q-slide-transition>
                    <q-btn
                      dense
                      icon="add"
                      class="q-ml-md q-pr-md"
                      color="blue-13"
                      label="Tambah Siswa"
                      :to="{ name: 'siswa_add' }"
                      size="md"
                      outline
                    />
                  </template>

                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="id_pembelian" :props="props">{{props.row.id_pembelian}}</q-td>
                      <q-td key="supplier" :props="props">{{props.row.supplier}}</q-td>
                      <q-td key="nomorTelepon" :props="props">{{props.row.nomorTelepon}}</q-td>
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
import Vue3autocounter from 'vue3-autocounter'

export default {
  name: 'PageIndex',
  components: {
    'vue3-autocounter': Vue3autocounter
  },
  data () {
    return {
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      columns: [
        { name: 'id_pembelian', required: true, label: 'NISN', align: 'left', field: 'id_pembelian', sortable: true },
        { name: 'supplier', required: true, label: 'NAMA SISWA', align: 'left', field: 'supplier', sortable: true },
        { name: 'nomorTelepon', required: true, label: 'JURUSAN', align: 'left', field: 'nomorTelepon', sortable: true },
        { name: 'aksi', label: 'Aksi', field: 'aksi', align: 'center' }
      ],
      rows: []
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

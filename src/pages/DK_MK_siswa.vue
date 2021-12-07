<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Extras" icon="widgets" />
          <q-breadcrumbs-el label="Data Kurikulum" icon="analytics" />
          <q-breadcrumbs-el label="Manajemen Kelas" icon="view_quilt" />
          <q-breadcrumbs-el label="Penjadwalan Siswa" icon="settings_accessibility" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg q-gutter-md">

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Penjadwalan Siswa</div>
                  <p class="text-caption">Form {{this.title}} data penjadwalan siswa.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col-5">
                      <q-select outlined v-model="AS" dense lazy-rules filled :options="options.status" label="KODE KELAS" />
                    </div>
                  </div>

                  <div class="col q-mt-lg">
                    <q-table
                      title="Data Siswa"
                      :rows="rows"
                      :columns="columns"
                      row-key="name"
                      selection="multiple"
                      v-model:selected="selected"
                    >
                      <template v-slot:header-selection="scope">
                        <q-toggle
                          v-model="scope.selected"
                          checked-icon="settings_accessibility"
                          color="green"
                          unchecked-icon="clear"
                        />
                      </template>

                      <template v-slot:body-selection="scope">
                        <q-toggle
                          v-model="scope.selected"
                          checked-icon="settings_accessibility"
                          color="green"
                          unchecked-icon="clear"
                        />
                      </template>
                    </q-table>
                  </div>

                  <div class="row q-mt-md">
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col-2">
                      <q-btn color="primary" icon="save" class="fit" label="SIMPAN" />
                    </div>
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
      selected: ([]),
      columns: [
        { name: 'id_pembelian', required: true, label: 'ID Pembelian', align: 'left', field: 'id_pembelian', sortable: true },
        { name: 'supplier', required: true, label: 'Nama Supplier', align: 'left', field: 'supplier', sortable: true },
        { name: 'nomorTelepon', required: true, label: 'Nomor Telepon', align: 'left', field: 'nomorTelepon', sortable: true },
        { name: 'aksi', label: 'Actions', field: 'aksi', align: 'center' }
      ],
      rows: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        }
      ],
      detail: {
        visible: false,
        grandTotal: null,
        supplier: null,
        columns: [
          { name: 'idPembelian', required: true, label: 'ID Pembelian', align: 'left', field: 'idPembelian', sortable: true },
          { name: 'namaBarang', required: true, label: 'Nama Barang', align: 'left', field: 'namaBarang', sortable: true },
          { name: 'hargaSatuan', required: true, label: 'Harga Satuan', align: 'left', field: 'hargaSatuan', sortable: true },
          { name: 'jumlahPembelian', required: true, label: 'Jumlah Pembelian', align: 'left', field: 'jumlahPembelian', sortable: true },
          { name: 'pajak', required: true, label: 'Pajak', align: 'left', field: 'pajak', sortable: true },
          { name: 'total', required: true, label: 'Subtotal', align: 'left', field: 'total', sortable: true },
          { name: 'stok', required: true, label: 'Stok', align: 'left', field: 'stok', sortable: true },
          { name: 'deskripsi', required: true, label: 'Deskripsi', align: 'left', field: 'deskripsi', sortable: true }
        ],
        rows: [
        ]
      },
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

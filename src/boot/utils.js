import { boot } from 'quasar/wrappers'

export default boot(async ({ app }) => {
  // something to do
  app.config.globalProperties.$option = {
    agama: [
      'Budha',
      'Hindu',
      'Islam',
      'Katolik',
      'kristen'
    ],
    jenisKelamin: [
      'Laki-Laki',
      'Perempuan'
    ],
    golonganDarah: [
      'A',
      'B',
      'AB',
      'O'
    ],
    kewarganegaraan: [
      'WNA',
      'WNI'
    ],
    kebutuhanKhusus: [
      'Tidak',
      'Tuna Netra',
      'Tuna Rungu',
      'Tuna Wicara',
      'Tuna Ganda',
      'Grahita Ringan',
      'Grahita Sedang',
      'Daksa Ringan',
      'Daksa Sedang',
      'Laras',
      'Hiperaktif',
      'Cerdas Istimewa',
      'Bakat Istimewa',
      'Kesulitan Belajar',
      'Indigo',
      'Down Sindrome',
      'Autis',
      'Kesulitan Belajar',
      'Lainnya'
    ],
    statusKawin: [
      'Belum Menikah',
      'Sudah Menikah',
      'Duda/Janda'
    ],
    pekerjaan: [
      'Tidak Bekerja',
      'Petani',
      'Peternak',
      'Karyawan Swasta',
      'Nelayan',
      'PNS / TNI / POLRI',
      'Pedagang Kecil',
      'Pedagang Besar',
      'Wiraswasta',
      'Wirausaha',
      'Buruh',
      'Pensiunan',
      'Tenaga Kerja Indonesia',
      'Tidak Dapat Diterapkan',
      'Sudah Meninggal',
      'Lainnya'
    ]
  }
})

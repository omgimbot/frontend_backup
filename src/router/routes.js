const routes = [
  {
    path: '/login',
    component: () => import('layouts/Signin.vue'),
    meta: {
      guestPage: true
    },
    children: [
      {
        path: '',
        name: 'loginPage',
        component: () => import('src/pages/Access/Signin.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      requiredLogin: true
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('pages/Product.vue')
      },
      {
        path: '/product/input',
        name: 'product_add',
        component: () => import('pages/product/input.vue')
      },
      {
        path: '/product/edit/:id',
        name: 'product_edit',
        component: () => import('pages/product/edit.vue')
      },
      {
        path: '/kategoriproduk/input',
        name: 'product_kategori_add',
        component: () => import('pages/kategori_product/input.vue')
      },
      {
        path: '/kategoriproduk/edit/:id',
        name: 'product_kategori_edit',
        component: () => import('pages/kategori_product/edit.vue')
      },
      {
        path: '/jenisproduk/input',
        name: 'product_jenis_add',
        component: () => import('pages/jenis_product/input.vue')
      },
      {
        path: '/jenisproduk/edit/:id',
        name: 'product_jenis_edit',
        component: () => import('pages/jenis_product/edit.vue')
      },
      {
        path: '/penjualan',
        name: 'penjualan',
        component: () => import('pages/Penjualan.vue')
      },
      {
        path: '/penjualan/input',
        name: 'penjualan_add',
        component: () => import('pages/penjualan/input.vue')
      },
      {
        path: '/ppdb',
        name: 'ppdb',
        component: () => import('src/pages/Ppdb.vue')
      },
      {
        path: '/ppdb/input',
        name: 'ppdb_add',
        component: () => import('pages/ppdb/input.vue')
      },
      {
        path: '/ppdp',
        name: 'ppdp',
        component: () => import('src/pages/Ppdp.vue')
      },
      {
        path: '/ppdp/input',
        name: 'ppdp_add',
        component: () => import('pages/ppdp/input.vue')
      },
      {
        path: '/siswa_baru',
        name: 'siswa_baru',
        component: () => import('pages/Daftar_siswa_baru.vue')
      },
      {
        path: '/siswa_terima',
        name: 'siswa_terima',
        component: () => import('pages/Daftar_siswa_terima.vue')
      },
      {
        path: '/daftar_siswa',
        name: 'daftar_siswa',
        component: () => import('pages/Daftar_siswa.vue')
      },
      {
        path: '/siswa/input',
        name: 'siswa_add',
        component: () => import('pages/siswa/input.vue')
      },
      {
        path: '/pegawai',
        name: 'pegawai',
        component: () => import('src/pages/DP_pegawai.vue')
      },
      {
        path: '/pegawai/input',
        name: 'pegawai_add',
        component: () => import('pages/pegawai/input.vue')
      },
      {
        path: '/pegawai_jabatan',
        name: 'pegawai_jabatan',
        component: () => import('src/pages/DP_jabatan.vue')
      },
      {
        path: '/pegawai_kelengkapan',
        name: 'pegawai_kelengkapan',
        component: () => import('src/pages/DP_kelengkapan.vue')
      },
      {
        path: '/pegawai_berkas',
        name: 'pegawai_berkas',
        component: () => import('src/pages/DP_berkas.vue')
      },
      {
        path: '/pegawai_mutasi',
        name: 'pegawai_mutasi',
        component: () => import('src/pages/DP_mutasi.vue')
      },
      {
        path: '/ruangan',
        name: 'ruangan',
        component: () => import('src/pages/M_ruangan.vue')
      },
      {
        path: '/tingkat',
        name: 'tingkat',
        component: () => import('src/pages/M_tingkat.vue')
      },
      {
        path: '/keahlian',
        name: 'keahlian',
        component: () => import('src/pages/M_keahlian.vue')
      },
      {
        path: '/kelas',
        name: 'kelas',
        component: () => import('src/pages/M_kelas.vue')
      },
      {
        path: '/rekja',
        name: 'rekja',
        component: () => import('src/pages/M_rencana_kerja.vue')
      },
      {
        path: '/berkas',
        name: 'berkas',
        component: () => import('src/pages/M_berkas.vue')
      },
      {
        path: '/jabatan',
        name: 'jabatan',
        component: () => import('src/pages/M_jabatan.vue')
      },
      {
        path: '/ekskul',
        name: 'ekskul',
        component: () => import('src/pages/M_ekskul.vue')
      },
      {
        path: '/prestasi',
        name: 'prestasi',
        component: () => import('src/pages/M_prestasi.vue')
      },
      {
        path: '/beasiswa',
        name: 'beasiswa',
        component: () => import('src/pages/M_beasiswa.vue')
      },
      {
        path: '/sebab_keluar',
        name: 'sebab_keluar',
        component: () => import('src/pages/M_sebab_keluar.vue')
      },
      {
        path: '/mapel',
        name: 'mapel',
        component: () => import('src/pages/M_mata_pelajaran.vue')
      },
      {
        path: '/tahun_ajaran',
        name: 'tahun_ajaran',
        component: () => import('src/pages/M_tahun_ajaran.vue')
      },
      {
        path: '/biaya_sekolah',
        name: 'biaya_sekolah',
        component: () => import('src/pages/M_biaya_sekolah.vue')
      },
      {
        path: '/hak_akses',
        name: 'hak_akses',
        component: () => import('src/pages/MP_hak_akses.vue')
      },
      {
        path: '/layanan',
        name: 'layanan',
        component: () => import('src/pages/MP_layanan.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('src/pages/MP_role.vue')
      },
      {
        path: '/sejarah_sekolah',
        name: 'sejarah_sekolah',
        component: () => import('src/pages/MDS_sejarah_sekolah.vue')
      },
      {
        path: '/visi_misi',
        name: 'visi_misi',
        component: () => import('src/pages/MDS_visi_misi.vue')
      },
      {
        path: '/rombel',
        name: 'rombel',
        component: () => import('src/pages/DK_rombel.vue')
      },
      {
        path: '/kelas_berjalan',
        name: 'kelas_berjalan',
        component: () => import('src/pages/DK_MK_kelas_berjalan.vue')
      },
      {
        path: '/jadwal',
        name: 'jadwal',
        component: () => import('src/pages/DK_MK_jadwal.vue')
      },
      {
        path: '/siswa',
        name: 'siswa',
        component: () => import('src/pages/DK_MK_siswa.vue')
      },
      {
        path: '/pindah_kelas',
        name: 'pindah_kelas',
        component: () => import('src/pages/DK_MK_pindah_kelas.vue')
      },
      {
        path: '/pengeluaran',
        name: 'pengeluaran',
        component: () => import('pages/Pengeluaran.vue')
      },
      {
        path: '/pengeluaran/input',
        name: 'pengeluaran_add',
        component: () => import('pages/pengeluaran/input.vue')
      },
      {
        path: '/retur',
        name: 'retur',
        component: () => import('pages/Retur.vue')
      },
      {
        path: '/retur/input',
        name: 'retur_add',
        component: () => import('pages/retur/input.vue')
      },
      {
        path: '/modal',
        name: 'modal',
        component: () => import('pages/Modal.vue')
      },
      {
        path: '/modal/input',
        name: 'modal_add',
        component: () => import('pages/modal/input.vue')
      },
      {
        path: '/laporan',
        name: 'laporan',
        component: () => import('pages/Laporan.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/Profile.vue')
      },
      {
        path: '/invoice',
        name: 'invoice',
        component: () => import('pages/Invoice.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

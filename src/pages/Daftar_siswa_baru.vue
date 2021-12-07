<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary" >
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Siswa" icon="extension" />
          <q-breadcrumbs-el label="Daftar Siswa Baru" icon="new_releases" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">
        <transition appear enter-active-class="animated bounceInLeft" leave-active-class="animated bounceOutRight">
          <div class="row q-gutter-md col-12">
            <q-card class="my-card col-lg-3 col-md-4 col-sm-7" flat bordered>
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs col">
                  <div class="text-h6 q-mt-sm" style="font-size: 14px">
                    Data penerimaan peserta didik baru
                  </div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    semua data peserta didik baru.
                  </div>
                  <div class="col">
                    <div class="row">
                      <div class="row items-center">
                        <q-icon name="male" />
                        <div  class="text-caption text-grey q-ml-xs" style="font-size: 11px">
                          pria
                        </div>
                        <div class="text-h6 q-ml-sm text-blue-13" style="font-size: 12px">
                          <vue3-autocounter
                            ref="counter"
                            :startAmount="0"
                            :endAmount="Number(totalHutang)"
                            :duration="3"
                            :autoinit="true"
                          />
                        </div>
                      </div>
                      <div class="row items-center q-ml-md">
                        <q-icon name="female" />
                        <div class="text-caption text-grey q-ml-xs" style="font-size: 11px">
                          wanita
                        </div>
                        <div class="text-h6 q-ml-sm text-blue-13" style="font-size: 12px">
                          <vue3-autocounter
                            ref="counter"
                            :startAmount="0"
                            :endAmount="Number(totalHutang)"
                            :duration="3"
                            :autoinit="true"
                          />
                        </div>
                      </div>
                      <div class="row items-center q-ml-md">
                        <q-badge color="blue" text-color="black" />
                        <div class="text-caption text-grey q-ml-xs" style="font-size: 11px">
                          PPDB
                        </div>
                        <div class="text-h6 q-ml-sm text-blue-13" style="font-size: 12px">
                          <vue3-autocounter
                            ref="counter"
                            :startAmount="0"
                            :endAmount="Number(totalHutang)"
                            :duration="3"
                            :autoinit="true"
                          />
                        </div>
                      </div>
                      <div class="row items-center q-ml-md">
                        <q-badge color="orange" text-color="black" />
                        <div class="text-caption text-grey q-ml-xs" style="font-size: 11px">
                          PPDP
                        </div>
                        <div class="text-h6 q-ml-sm text-blue-13" style="font-size: 12px">
                          <vue3-autocounter
                            ref="counter"
                            :startAmount="0"
                            :endAmount="Number(totalHutang)"
                            :duration="3"
                            :autoinit="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card-section>
            </q-card>
          </div>
        </transition>

        <transition appear enter-active-class="animated bounceInRight" leave-active-class="animated bounceOutLeft">
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
                    selection="multiple"
                    v-model:selected="selected"
                  >
                    <template v-slot:top>
                      <div class="col">
                        <div class="col-2 q-table__title">
                          Master Data Daftar Siswa Baru
                        </div>
                        <p class="text-caption">
                          Data peserta didik baru.
                        </p>
                      </div>

                      <q-space />

                      <q-btn
                        flat
                        round
                        color="primary"
                        icon="search"
                        @click="visibles = !visibles"
                        size="md"
                        class="q-mr-sm"
                      />
                      <q-slide-transition>
                        <div v-show="visibles">
                          <q-input
                            outlined
                            debounce="300"
                            placeholder="Placeholder"
                            style="width: 300px"
                            color="primary"
                            v-model="filter"
                            dense
                          />
                        </div>
                      </q-slide-transition>
                    </template>

                    <template v-slot:header="props">
                      <q-tr :props="props">
                        <q-th key="CHECK" :props="props">
                        <q-toggle
                          v-model="props.selected"
                          checked-icon="settings_accessibility"
                          color="green"
                          unchecked-icon="clear"
                        />
                        </q-th>
                        <q-th key="TYPE" :props="props">TIPE</q-th>
                        <q-th key="NO_DAFTAR" :props="props">NO. REG</q-th>
                        <q-th key="NISN" :props="props">NISN</q-th>
                        <q-th key="NAMA" :props="props">CALON SISWA</q-th>
                        <q-th key="NO_UJIAN_NASIONAL" :props="props">NO. UJIAN SMP</q-th>
                        <q-th key="SEKOLAH_ASAL" :props="props">SEKOLAH ASAL</q-th>
                        <q-th key="JURUSAN" :props="props">JURUSAN</q-th>
                        <q-th key="ACTION" :props="props">Aksi</q-th>
                      </q-tr>
                    </template>

                    <template v-slot:body="props">
                      <q-tr :props="props">
                        <q-td key="CHECK" :props="props">
                          <q-toggle
                            v-model="props.selected"
                            checked-icon="done_all"
                            color="green"
                            unchecked-icon="clear"
                          />
                        </q-td>
                        <q-td key="TYPE" :props="props">
                          <q-badge v-if="props.row.DAFTAR_TYPE === 'PPDB'" color="blue" text-color="black" />
                          <q-badge v-else color="orange" text-color="black" />
                        </q-td>
                        <q-td key="NO_DAFTAR" :props="props">{{props.row.NO_DAFTAR}}</q-td>
                        <q-td key="NISN" :props="props">{{props.row.NISN}}</q-td>
                        <q-td key="NAMA" :props="props">{{props.row.NAMA}}</q-td>
                        <q-td key="NO_UJIAN_NASIONAL" :props="props">{{props.row.NO_UJIAN_NASIONAL}}</q-td>
                        <q-td key="SEKOLAH_ASAL" :props="props">{{props.row.SEKOLAH_ASAL}}</q-td>
                        <q-td key="JURUSAN" :props="props">{{props.row.JURUSAN}}</q-td>
                        <q-td key="ACTION" :props="props">
                          <q-btn
                            round
                            outline
                            flat
                            color="primary"
                            size="sm"
                            icon="visibility"
                            class="q-ml-sm"
                            @click="this.showDetail(props.row)"
                          />
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
              <div class="row q-ma-md">
                <div class="col">
                </div>
                <div class="col">
                </div>
                <div class="col-2">
                  <q-btn color="primary" icon="save" class="fit" label="terapkan" />
                </div>
              </div>
            </q-card>
          </div>
        </transition>
      </div>
    </div>
    <q-dialog
      v-model="detail.visible"
      full-width
    >
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="row items-center">
            <div class="col-1">
              <q-avatar size="72px">
                <img src="statics/img/logos-smk.png" />
              </q-avatar>
            </div>
            <div class="col">
              <div class="text-h6 text-primary">{{this.detail.NAMA}}</div>
              <div class="row q-gutter-md">
                <div class="col-4">
                  <div class="row">
                    <div class="col">
                      <div class="text-caption">NISN</div>
                      <div class="text-caption">NO. PENDAFTARAN</div>
                      <div class="text-caption">NO. UN SMP/MTS</div>
                      <div class="text-caption">SEKOLAH ASAL</div>
                    </div>
                    <div class="col">
                      <div class="text-caption">: {{this.detail.NISN}}</div>
                      <div class="text-caption">: {{this.detail.NO_DAFTAR}}</div>
                      <div class="text-caption">: {{this.detail.NO_UJIAN_NASIONAL}}</div>
                      <div class="text-caption">: {{this.detail.SEKOLAH_ASAL}}</div>
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="row">
                    <div class="col">
                      <div class="text-caption">TAHUN LULUS</div>
                      <div class="text-caption">NO. SERI SKHUN</div>
                      <div class="text-caption">NO. SERI IJAZAH RESMI</div>
                      <div class="text-caption">PROGRAM KEAHLIAN PILIHAN</div>
                    </div>
                    <div class="col">
                      <div class="text-caption">: {{this.detail.SEKOLAH_ASAL}}</div>
                      <div class="text-caption">: {{this.detail.NO_SERI_SKHUN}}</div>
                      <div class="text-caption">: {{this.detail.NO_SERI_IJASAH}}</div>
                      <div class="text-caption">: {{this.detail.JURUSAN}}</div>
                    </div>
                  </div>
                </div>
                <div class="col" align="center">
                  <div class="text-h2 text-weight-bolder text-blue-2">{{this.detail.DAFTAR_TYPE}}</div>
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-mt-md" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-card flat>
            <q-tabs
              v-model="tab"
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="left"
              narrow-indicator
            >
              <q-tab name="pokok" label="Data Pokok" />
              <q-tab name="orang_tua" label="Data Orang Tua" />
              <q-tab name="periodik" label="Data Periodik" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="pokok">
                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA POKOK</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NOMOR INDUK KEPENDUDUKAN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.NIK}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JENIS KELAMIN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.JK}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      AGAMA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AGAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      GOLONGAN DARAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.JURUSAN}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TEMPAT LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.TEMPAT_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TANGGAL LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.TGL_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KEBUTUHAN KHUSUS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.KEBUTUHAN_KHUSUS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. HANDPHONE
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.NO_HP}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      EMAIL PRIBADI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.EMAIL}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      WARGA NEGARA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.JURUSAN}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      ALAMAT TEMPAT TINGGAL
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.ALAMAT}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PROVINSI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.PROVINSI.name}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KABUPATEN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.KABUPATEN.name}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KECAMATAN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.KECAMATAN.name}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KELURAHAN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.KELURAHAN.name}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col-1">
                    <div class="col text-caption">
                      RT
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.KELURAHAN.name}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col-1">
                    <div class="col text-caption">
                      RW
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.KELURAHAN.name}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KODE POS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.AREA.POS_CODE}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TITIK KOORDINAT
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.JURUSAN}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      ALAT TRANSPORTASI KE SEKOLAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.ALAT_TRANSPORTASI}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JENIS RUMAH TINGGAL
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.JENIS_RUMAH_TINGGAL}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. TELP. RUMAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.NO_TLP}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. KKS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.KKS}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. KPS / PKH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.KPS.NO_KPS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NAMA KIP
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.KIP.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. KIP
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.KIP.NO_KIP}}
                    </div>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="orang_tua">
                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA AYAH</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NAMA AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TEMPAT LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.TEMPAT_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TANGGAL LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.TGL_LAHIR}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. INDUK KEPENDUDUKAN AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.NIK}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KEBUTUHAN KHUSUS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.KEBUTUHAN_KHUSUS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PEKERJAAN AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.PEKERJAAN}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENDIDIKAN AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.PENDIDIKAN_TERAKHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENGHASILAN AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.PENGHASILAN}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. HANDPHONE AYAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_AYAH.NO_HP}}
                    </div>
                  </q-card>
                </div>

                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg q-mt-md" color="blue">DATA IBU</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NAMA IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TEMPAT LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.TEMPAT_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TANGGAL LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.TGL_LAHIR}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. INDUK KEPENDUDUKAN IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.NIK}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KEBUTUHAN KHUSUS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.KEBUTUHAN_KHUSUS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PEKERJAAN IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.PEKERJAAN}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENDIDIKAN IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.PENDIDIKAN_TERAKHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENGHASILAN IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.PENGHASILAN}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. HANDPHONE IBU
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_IBU.NO_HP}}
                    </div>
                  </q-card>
                </div>

                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg q-mt-md" color="blue">DATA WALI</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NAMA WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TEMPAT LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.TEMPAT_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TANGGAL LAHIR
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.TGL_LAHIR}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. INDUK KEPENDUDUKAN WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.NIK}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      KEBUTUHAN KHUSUS
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.KEBUTUHAN_KHUSUS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PEKERJAAN WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.PEKERJAAN}}
                    </div>
                  </q-card>
                </div>

                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENDIDIKAN WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.PENDIDIKAN_TERAKHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENGHASILAN WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.PENGHASILAN}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NO. HANDPHONE WALI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_WALI.NO_HP}}
                    </div>
                  </q-card>
                </div>
              </q-tab-panel>

              <q-tab-panel name="periodik">
                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA PERIODIK</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TINGGI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.TINGGI}} Cm
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      BERAT
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.BERAT}} Kg
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JUMLAH SAUDARA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.JML_SAUDARA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      ANAK KE
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.ANAK_KE}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      STATUS DALAM KELUARGA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.JARAK_SEKOLAH}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JARAK RUMAH KE SEKOLAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.JARAK_SEKOLAH}} Km
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      WAKTU TEMPUH KE SEKOLAH
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PERIODIK.WAKTU_TEMPUH_SEKOLAH}} Menit
                    </div>
                  </q-card>
                </div>

                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg q-mt-md" color="blue">CATATAN PRESTASI</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JENIS PRESTASI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.JENIS}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TINGKAT
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.TINGKAT}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TAHUN
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.TAHUN}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PERINGKAT
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.PERINGKAT}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      NAMA PRESTASI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENYELENGGARA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.DATA_PRESTASI.PENYELENGGARA}}
                    </div>
                  </q-card>
                </div>

                <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg q-mt-md" color="blue">BEASISWA</q-badge>
                <div class="row q-gutter-sm fit">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      JENIS BEASISWA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.BEASISWA.NAMA}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TAHUN MULAI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.BEASISWA.TEMPAT_LAHIR}}
                    </div>
                  </q-card>
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      TAHUN SELESAI
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.BEASISWA.TGL_LAHIR}}
                    </div>
                  </q-card>
                </div>
                <div class="row q-gutter-sm fit q-mt-sm">
                  <q-card class="my-card q-pa-sm col">
                    <div class="col text-caption">
                      PENYELENGGARA
                    </div>
                    <div class="col text-weight-medium">
                      {{this.detail.BEASISWA.NIK}}
                    </div>
                  </q-card>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Keluar" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      fullWidth: (false),
      visibles: false,
      filter: null,
      totalHutang: 0,
      totalLunas: 0,
      selected: ([]),
      tab: ('pokok'),
      columns: [
        { name: 'CHECK', label: '', field: 'CHECK', align: 'center' },
        { name: 'TYPE', required: true, label: 'TYPE', align: 'left', field: 'TYPE', sortable: true },
        { name: 'NO_DAFTAR', required: true, label: 'NO. REG', align: 'left', field: 'NO_DAFTAR', sortable: true },
        { name: 'NISN', required: true, label: 'NISN', align: 'left', field: 'NISN', sortable: true },
        { name: 'NAMA', required: true, label: 'CALON SISWA ', align: 'left', field: 'NAMA', sortable: true },
        { name: 'NO_UJIAN_NASIONAL', required: true, label: 'NO UJIAN SMP', align: 'left', field: 'NO_UJIAN_NASIONAL', sortable: true },
        { name: 'SEKOLAH_ASAL', required: true, label: 'Asal Sekolah', align: 'left', field: 'SEKOLAH_ASAL', sortable: true },
        { name: 'JURUSAN', required: true, label: 'JURUSAN', align: 'left', field: 'JURUSAN', sortable: true },
        { name: 'ACTION', label: 'Actions', field: 'ACTION', align: 'center' }
      ],
      rows: [],
      detail: {
        visible: false,
        columns: [
          { name: 'CHECK', label: '', field: 'CHECK', align: 'center' },
          { name: 'TYPE', required: true, label: 'TYPE', align: 'left', field: 'TYPE', sortable: true },
          { name: 'NO_DAFTAR', required: true, label: 'NO. REG', align: 'left', field: 'NO_DAFTAR', sortable: true },
          { name: 'NISN', required: true, label: 'NISN', align: 'left', field: 'NISN', sortable: true },
          { name: 'NAMA', required: true, label: 'CALON SISWA ', align: 'left', field: 'NAMA', sortable: true },
          { name: 'NO_UJIAN_NASIONAL', required: true, label: 'NO UJIAN SMP', align: 'left', field: 'NO_UJIAN_NASIONAL', sortable: true },
          { name: 'SEKOLAH_ASAL', required: true, label: 'Asal Sekolah', align: 'left', field: 'SEKOLAH_ASAL', sortable: true },
          { name: 'JURUSAN', required: true, label: 'JURUSAN', align: 'left', field: 'JURUSAN', sortable: true },
          { name: 'ACTION', label: 'Actions', field: 'ACTION', align: 'center' }
        ],
        rows: []
      }
    }
  },
  created () {
    this.getSiswaBaru()
  },
  methods: {
    getSiswaBaru () {
      const token = this.$getProfile().data.token
      this.$q.loading.show()
      try {
        this.$axios.get('siswa/', {
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
        // this.$showNotif('Terjadi kesalahan !', 'negative')
      }
    },
    showDetail (data) {
      this.detail = data
      this.detail.visible = true
    },
    delete (id) {
      this.$q
        .dialog({
          title: 'Peringatan',
          message: 'Apakah Anda Yakin ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          const token = this.$getProfile().data.token
          this.$q.loading.show()
          try {
            this.$axios.delete('siswa/' + id, {
              headers: {
                Authorization: 'Bearer ' + token
              }
            })
              .finally(() => this.$q.loading.hide())
              .then((res) => {
                if (!this.$parseResponse(res.data)) {
                  this.$successNotif(res.data.message)
                  this.getSiswaBaru()
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

<style scoped></style>

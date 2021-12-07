<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Siswa" icon="extension" />
          <q-breadcrumbs-el label="PPDB" icon="accessibility_new" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Peserta Didik" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Peserta Didik" icon="add" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-sm q-gutter-md">

        <transition
          appear
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
        >

        <div class="row col fit">
          <q-card class="my-card col" flat bordered>
            <q-card-section horizontal>
              <q-card-section class="col q-pa-lg">
                <div class="col">
                  <div class="col-2 q-table__title">{{this.title}} Data Peserta Didik Baru</div>
                  <p class="text-caption">Form {{this.title}} data peserta didik baru.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NO_UJIAN_NASIONAL"
                        label="NO. UJIAN NASIONAL SMP/MTS *"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NISN"
                        label="NO. INDUK SISWA NASIONAL *"
                        lazy-rules
                        dense
                        mask="############"
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NO_SERI_IJASAH"
                        label="NO. SERI IJAZAH RESMI *"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.NO_SERI_SKHUN"
                        label="NO. SERI SKHUN *"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                  </div>
                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.SEKOLAH_ASAL"
                        label="SEKOLAH ASAL *"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.TAHUN_LULUS"
                        label="TAHUN LULUS *"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        v-model="form.JURUSAN"
                        label="PROGRAM KEAHLIAN PILIHAN *"
                        filled
                        dense
                        input-debounce="0"
                        :options="options.jurusan"
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.NO_DAFTAR"
                              label="NO. PEDAFTARAN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NAMA"
                              label="NAMA LENGKAP *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NIK"
                              label="NO. INDUK KEPENDUDUKAN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.JK"
                              dense
                              lazy-rules
                              filled
                              :options="options.jenis_kelamin"
                              label="JENIS KELAMIN *"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.AGAMA"
                              dense
                              lazy-rules
                              filled
                              :options="options.agama"
                              label="AGAMA *"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.TEMPAT_LAHIR"
                              label="TEMPAT LAHIR *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form.TGL_LAHIR" dense label="TANGGAL LAHIR *">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.TGL_LAHIR" mask="YYYY-MM-DD" minimal>
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                      </div>
                                    </q-date>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.KEBUTUHAN_KHUSUS"
                              label="KEBUTUHAN KHUSUS"
                              filled
                              dense
                              input-debounce="0"
                              :options="options.kebutuhan_khusus"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
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

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NO_HP"
                              label="NO. HANDPHONE *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.GOLONGAN_DARAH"
                              @update:model-value="getGolDar"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.golongan_darah"
                              label="GOLONGAN DARAH"
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
                              v-model="form.EMAIL"
                              type="email"
                              label="EMAIL PRIBADI *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-select
                              outlined
                              v-model="form.WARGA_NEGARA"
                              @update:model-value="getWN"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.warga_negara"
                              @filter="filterWN"
                              label="WARGA NEGARA"
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
                              v-model="form.AREA.ALAMAT"
                              label="ALAMAT TEMPAT TINGGAL *"
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
                              label="PROVINSI *"
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
                              label="KABUPATEN *"
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
                              label="KECAMATAN *"
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
                              :disable="form.AREA.KECAMATAN === null"
                              v-model="form.AREA.KELURAHAN"
                              dense
                              use-input
                              lazy-rules
                              filled
                              option-label="name"
                              :options="options.areas.kelurahan"
                              @filter="filterKel"
                              label="KELURAHAN *"
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
                          <div class="col-1">
                            <q-input
                              filled
                              v-model="form.AREA.RT"
                              label="RT *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col-1">
                            <q-input
                              filled
                              v-model="form.AREA.RW"
                              label="RW *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.AREA.POS_CODE"
                              label="KODE POS *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.AREA.KORDINAT"
                              label="TITIK KORDINAT"
                              lazy-rules
                              dense
                              :rules="[ 'Please type something']"
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

                        <div class="row q-gutter-sm q-mt-md">
                          <div class="col">
                            <q-select outlined v-model="form.ALAT_TRANSPORTASI" dense lazy-rules filled :options="options.alat_transportasi" label="ALAT TRANSPORTASI KE SEKOLAH" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.JENIS_RUMAH_TINGGAL" dense lazy-rules filled :options="options.jenis_tinggal" label="JENIS RUMAH TINGGAL" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.NO_TLP"
                              label="NO. TELP. RUMAH"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.KKS"
                              label="NO. KKS"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3 q-pl-sm">
                            <q-checkbox
                            v-model="form.KPS.STATUS"
                            label="PENERIMA KPS / PKH"
                            lazy-rules
                            dense
                            :rules="['Please type something']"/>
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.KPS.NO_KPS"
                              label="NO. KPS / PKH"
                              lazy-rules
                              dense
                              :rules="['Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3 q-pl-sm">
                            <q-checkbox
                              filled
                              v-model="form.KIP.STATUS"
                              label="PENERIMA KIP"
                              lazy-rules
                              dense
                              :rules="['Please type something']" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.KIP.NAMA"
                              label="NAMA KIP"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.KIP.NO_KIP"
                              label="NO. KIP"
                              lazy-rules
                              dense
                              :rules="['Please type something']"
                            />
                          </div>
                        </div>

                        <q-stepper-navigation>
                          <q-btn @click="step = 2" color="primary" label="SELANJUTNYA" />
                        </q-stepper-navigation>
                      </q-step>

                      <q-step
                        :name="2"
                        title="Data Orang Tua"
                        icon="family_restroom"
                        :done="step > 2"
                      >

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA AYAH</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_AYAH.NAMA"
                              label="NAMA AYAH *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_AYAH.TEMPAT_LAHIR"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form.DATA_AYAH.TGL_LAHIR" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.DATA_AYAH.TGL_LAHIR" mask="YYYY-MM-DD" minimal>
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
                            <q-input
                              filled
                              v-model="form.DATA_AYAH.NIK"
                              label="NO. INDUK KEPENDUDUKAN AYAH *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_AYAH.KEBUTUHAN_KHUSUS" dense lazy-rules filled :options="options.kebutuhan_khusus" label="KEBUTUHAN KHUSUS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_AYAH.PEKERJAAN" dense lazy-rules filled :options="options.pekerjaan_orang_tua" label="PEKERJAAN" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.DATA_AYAH.PENDIDIKAN_TERAKHIR" dense lazy-rules filled :options="options.pendidikan_orang_tua" label="PENDIDIKAN" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_AYAH.PENGHASILAN" dense lazy-rules filled :options="options.penghasilan_orang_tua" label="PENGHASILAN *" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_AYAH.NO_HP"
                              label="NO. HANDPHONE"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA IBU</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_IBU.NAMA"
                              label="NAMA IBU *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_IBU.TEMPAT_LAHIR"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form.DATA_IBU.TGL_LAHIR" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.DATA_IBU.TGL_LAHIR" mask="YYYY-MM-DD" minimal>
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
                            <q-input
                              filled
                              v-model="form.DATA_IBU.NIK"
                              label="NO. INDUK KEPENDUDUKAN IBU *"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_IBU.KEBUTUHAN_KHUSUS" dense lazy-rules filled :options="options.kebutuhan_khusus" label="KEBUTUHAN KHUSUS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_IBU.PEKERJAAN" dense lazy-rules filled :options="options.pekerjaan_orang_tua" label="PEKERJAAN" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.DATA_IBU.PENDIDIKAN_TERAKHIR" dense lazy-rules filled :options="options.pendidikan_orang_tua" label="PENDIDIKAN" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_IBU.PENGHASILAN" dense lazy-rules filled :options="options.penghasilan_orang_tua" label="PENGHASILAN *" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_IBU.NO_HP"
                              label="NO. HANDPHONE"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA WALI</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_WALI.NAMA"
                              label="NAMA WALI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_WALI.TEMPAT_LAHIR"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form.DATA_WALI.TGL_LAHIR" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form.DATA_WALI.TGL_LAHIR" mask="YYYY-MM-DD" minimal>
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
                            <q-input
                              filled
                              v-model="form.DATA_WALI.NIK"
                              label="NO. INDUK KEPENDUDUKAN WALI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_WALI.KEBUTUHAN_KHUSUS" dense lazy-rules filled :options="options.kebutuhan_khusus" label="KEBUTUHAN KHUSUS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_WALI.PEKERJAAN" dense lazy-rules filled :options="options.pekerjaan_orang_tua" label="PEKERJAAN" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.DATA_WALI.PENDIDIKAN_TERAKHIR" dense lazy-rules filled :options="options.pendidikan_orang_tua" label="PENDIDIKAN" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_WALI.PENGHASILAN" dense lazy-rules filled :options="options.penghasilan_orang_tua" label="PENGHASILAN" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_WALI.NO_HP"
                              label="NO. HANDPHONE"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <q-stepper-navigation>
                          <q-btn @click="step = 3" color="primary" label="SELANJUTNYA" />
                          <q-btn flat @click="step = 1" color="primary" label="KEMBALI" class="q-ml-sm" />
                        </q-stepper-navigation>
                      </q-step>

                      <q-step
                        :name="3"
                        title="Data Periodik"
                        icon="assignment"
                      >

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">DATA PERIODIK</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.TINGGI"
                              label="TINGGI (Cm) *1"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.BERAT"
                              label="BERAT (Kg)"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.JML_SAUDARA"
                              label="JUMLAH SAUDARA"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.ANAK_KE"
                              label="ANAK KE"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.DATA_PERIODIK.STATUS_DALAM_KELUARGA" dense lazy-rules filled :options="options.prestasi" label="STATUS DALAM KELUARGA" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.JARAK_SEKOLAH"
                              label="JARAK RUMAH KE SEKOLAH (Km)"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PERIODIK.WAKTU_TEMPUH_SEKOLAH"
                              label="WAKTU TEMPUH KE SEKOLAH (Menit)"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">CATATAN PRESTASI</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-select outlined v-model="form.DATA_PRESTASI.JENIS" dense lazy-rules filled :options="options.prestasi" label="JENIS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.DATA_PRESTASI.TINGKAT" dense lazy-rules filled :options="options.tingkat" label="TINGKAT" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PRESTASI.TAHUN"
                              label="TAHUN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.DATA_PRESTASI.PERINGKAT"
                              label="PERINGKAT"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.DATA_PRESTASI.NAMA"
                              label="PRESTASI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col-7">
                            <q-input
                              filled
                              v-model="form.DATA_PRESTASI.PENYELENGGARA"
                              label="PENYELENGGARA"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-btn label="TAMBAH" outline type="" color="green" style="width:122px" />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">BEASISWA</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="JENIS" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.BEASISWA.TAHUN_MULAI"
                              label="TAHUN MULAI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.BEASISWA.TAHUN_SELESAI"
                              label="TAHUN SELESAI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-10">
                            <q-input
                              filled
                              v-model="form.BEASISWA.PENYELENGGARA"
                              label="PENYELENGGARA"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-btn label="TAMBAH" outline type="" color="green" style="width:130px" />
                          </div>
                        </div>

                        <q-stepper-navigation>
                          <q-btn color="green" outline type="submit" label="SELESAI" />
                          <q-btn flat @click="step = 2" color="primary" label="KEMBALI" class="q-ml-sm" />
                        </q-stepper-navigation>

                      </q-step>

                    </q-stepper>
                  </div>

                </q-form>
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>

        </transition>

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
      map: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        zoom: 7,
        center: L.latLng([-5.4170269, 105.2689625])
      },

      step: 1,
      form: {
        INSTITUSI_CODE: null,
        NO_UJIAN_NASIONAL: null,
        NISN: null,
        NO_SERI_IJASAH: null,
        NO_SERI_SKHUN: null,
        SEKOLAH_ASAL: null,
        JURUSAN: null,
        TAHUN_LULUS: null,
        NO_DAFTAR: null,
        NAMA: null,
        NIK: null,
        JK: null,
        AGAMA: null,
        TEMPAT_LAHIR: null,
        TGL_LAHIR: null,
        KEBUTUHAN_KHUSUS: null,
        NO_HP: null,
        NO_TLP: null,
        EMAIL: null,
        GOLONGAN_DARAH: null,
        WARGA_NEGARA: null,
        AREA: {
          PROVINSI: null,
          KABUPATEN: null,
          KECAMATAN: null,
          KELURAHAN: null,
          ALAMAT: null,
          POS_CODE: null,
          RT: null,
          RW: null,
          LOCATION: []
        },
        ALAT_TRANSPORTASI: null,
        JENIS_RUMAH_TINGGAL: null,
        KKS: null,
        KPS: {
          STATUS: null,
          NO_KPS: null
        },
        KIP: {
          NAMA: null,
          STATUS: null,
          NO_KIP: null
        },

        // layout 2
        DATA_AYAH: {
          NIK: null,
          NAMA: null,
          TEMPAT_LAHIR: null,
          TGL_LAHIR: null,
          KEBUTUHAN_KHUSUS: null,
          PENDIDIKAN_TERAKHIR: null,
          PEKERJAAN: null,
          PENGHASILAN: null,
          NO_HP: null
        },
        DATA_IBU: {
          NIK: null,
          NAMA: null,
          TEMPAT_LAHIR: null,
          TGL_LAHIR: null,
          KEBUTUHAN_KHUSUS: null,
          PENDIDIKAN_TERAKHIR: null,
          PEKERJAAN: null,
          PENGHASILAN: null,
          NO_HP: null
        },
        DATA_WALI: {
          NIK: null,
          NAMA: null,
          TEMPAT_LAHIR: null,
          TGL_LAHIR: null,
          KEBUTUHAN_KHUSUS: null,
          PENDIDIKAN_TERAKHIR: null,
          PEKERJAAN: null,
          PENGHASILAN: null,
          NO_HP: null
        },

        // layout 3
        DATA_PERIODIK: {
          TINGGI: null,
          BERAT: null,
          JARAK_SEKOLAH: null,
          WAKTU_TEMPUH_SEKOLAH: null,
          ANAK_KE: null,
          JML_SAUDARA: null,
          STATUS_DALAM_KELUARGA: null
        },
        DATA_PRESTASI: {
          NAMA: null,
          JENIS: null,
          TINGKAT: null,
          TAHUN: null,
          PERINGKAT: null,
          PENYELENGGARA: null
        },
        BEASISWA: {
          JENIS: null,
          TAHUN_MULAI: null,
          TAHUN_SELESAI: null,
          PENYELENGGARA: null

        }
      },
      options: {
        jenis_kelamin: [
          'Laki - Laki',
          'Perempuan'
        ],
        agama: [
          'Budha',
          'Hindu',
          'Islam',
          'Katolik',
          'Kristen'
        ],
        golongan_darah: [
          'A',
          'B',
          'AB',
          'O'
        ],
        warga_negara: [
          'WNA',
          'WNI'
        ],
        kebutuhan_khusus: [
          'Tidak Berkebutuhan Khusus',
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
        alat_transportasi: [
          'Jalan Kaki', 'Kendaraan Pribadi', 'Kendaraan Umum / Angkot / Bus', 'Jemputan Sekolah', 'Kereta Api', 'Ojek', 'Lainnya'
        ],
        jenis_tinggal: [
          'Bersama Orang Tua', 'Wali', 'Kos', 'Asrama', 'Panti Asuhan', 'Lainnya'
        ],
        pendidikan_orang_tua: [
          'Tidak Sekolah', 'Putus SD', 'SD Sederajat', 'SMP Sederajat', 'SMA Sederajat', 'D1', 'D2', 'D3', 'D4 / S1', 'S2', 'S3', 'Lainnya'
        ],
        pekerjaan_orang_tua: [
          'Tidak Bekerja', 'Petani', 'Peternak', 'Karyawan Swasta', 'Nelayan', 'PNS / TNI / POLRI', 'Pedagang Kecil', 'Pedagang Besar', 'Wiraswasta', 'Wirausaha', 'Buruh', 'Pensiunan', 'Tenaga Kerja Indonesia', 'Tidak Dapat Diterapkan', 'Sudah Meninggal', 'Lainnya'
        ],
        penghasilan_orang_tua: [
          'Kurang Dari Rp. 1.0000.000', 'Rp. 1.000.000 - Rp. 2.000.000', 'Lebih Dari Rp. 2.000.000', 'Lebih Dari Rp. 5.000.000', 'Tidak Berpenghasilan', 'Lainnya'
        ],
        tingkat: [
          'Internasional',
          'Nasional',
          'Provinsi',
          'Kabupaten / Kot',
          'Sekolah'
        ],
        prestasi: [
          'DATA 1',
          'DATA 2',
          'DATA 3',
          'DATA 4',
          'DATA 5'
        ],
        jurusan: [
          'DATA 1',
          'DATA 2',
          'DATA 3',
          'DATA 4',
          'DATA 5'
        ],
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
    onSubmit () {
      const data = this.form
      data.DAFTAR_TYPE = 'PPDB'
      const AuthStr = this.$getProfile().data

      // console.log(data)
      // const AuthStr = this.$q.cookies.get('token')
      // console.log(AuthStr)
      this.$q.loading.show()
      this.$axios.post('siswa/create', data, {
        headers: {
          Authorization: 'Bearer ' + AuthStr.token
        }
      })
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          if (!this.$parseResponse(res.data)) {
            console.log(res.data)
            this.$router.push({ name: 'ppdb_add' })
          }
        })
    },
    onReset () {
    }
  }
}
</script>
<style scoped>
</style>

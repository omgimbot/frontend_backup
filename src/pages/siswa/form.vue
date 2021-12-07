<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el label="Main Menu" icon="widgets" />
          <q-breadcrumbs-el label="Data Siswa" icon="extension" />
          <q-breadcrumbs-el label="Daftar Siswa" icon="person_search" />
          <q-breadcrumbs-el v-if="this.editMode" label="Edit Siswa" icon="edit" />
          <q-breadcrumbs-el v-else label="Tambah Siswa" icon="add" />
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
                  <div class="col-2 q-table__title">{{this.title}} Data Siswa Sekolah</div>
                  <p class="text-caption">Form {{this.title}} data siswa sekolah.</p>
                </div>
                <q-form @submit="onSubmit" @reset="onReset">

                  <div class="row q-gutter-sm">
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.id_pembelian"
                        label="NO. PENDAFTARAN"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.nisn"
                        label="NAMA LENGKAP"
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
                        v-model="form.seri_ijazah"
                        label="NO. SERI IJAZAH RESMI"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.skhun"
                        label="NO. SERI SKHUN"
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
                        v-model="form.statusPembelian"
                        dense
                        lazy-rules
                        filled
                        :options="options.status"
                        label="SEKOLAH ASAL"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.skhun"
                        label="TAHUN LULUS"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        v-model="form.statusPembelian"
                        dense
                        lazy-rules
                        filled
                        :options="options.status"
                        label="DITERIMA DI KELAS"
                      />
                    </div>
                    <div class="col">
                      <q-input filled v-model="form" dense label="DI TERIMA TANGGAL">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="form" mask="YYYY-MM-DD">
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
                      <q-select
                        outlined
                        v-model="form.KEBUTUHAN_KHUSUS"
                        label="PROGRAM KEAHLIAN"
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
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.skhun"
                        label="TAHUN MASUK"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-input
                        filled
                        v-model="form.skhun"
                        label="TAHUN KELUAR"
                        lazy-rules
                        dense
                        :rules="[ val => val && val.length > 0 || 'Please type something']"
                      />
                    </div>
                    <div class="col">
                      <q-select
                        outlined
                        v-model="form.statusPembelian"
                        dense
                        lazy-rules
                        filled
                        :options="options.status"
                        label="STATUS SISWA"
                      />
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
                              v-model="form.seri_ijazah"
                              label="NO. INDUK KEPENDUDUKAN"
                              lazy-rules
                              mask="################"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="JENIS KELAMIN"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="AGAMA"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form" mask="YYYY-MM-DD">
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
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="KEBUTUHAN KHUSUS"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="NO. HANDPHONE"
                              lazy-rules
                              dense
                              mask="#############"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="EMAIL PRIBADI"
                              lazy-rules
                              dense
                              type="email"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="ALAMAT TEMPAT TINGGAL"
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
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="PROVINSI"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="KABUPATEN"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="KACAMATAN"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm q-mt-md">
                          <div class="col-3">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="KELURAHAN"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="KECAMATAN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="RT"
                              lazy-rules
                              mask="####"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="RW"
                              lazy-rules
                              mask="####"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="KODE POS"
                              lazy-rules
                              dense
                              mask="######"
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="TITIK KORDINAT"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            TITIK KOORDINAT
                            <l-map
                            style="height:50vh"
                              v-model="zoom"
                              v-model:zoom="zoom"
                              :center="[47.41322, -1.219482]"
                              @move="log('move')"
                            >
                              <l-tile-layer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              ></l-tile-layer>
                              <l-control-layers />
                              <l-marker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
                                <l-tooltip>
                                  Titik koordinat
                                </l-tooltip>
                              </l-marker>

                            </l-map>
                          </div>
                        </div>

                        <div class="row q-gutter-sm q-mt-sm">
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="ALAT TRANSPORTASI KE SEKOLAH"
                            />
                          </div>
                          <div class="col">
                            <q-select
                              outlined
                              v-model="form.statusPembelian"
                              dense
                              lazy-rules
                              filled
                              :options="options.status"
                              label="JENIS RUMAH TINGGAL"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="NO. TELP. RUMAH"
                              lazy-rules
                              mask="#############"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="NO. KKS"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-checkbox
                              indeterminate-value="maybe"
                              v-model="theModel2"
                              label="PENERIMA KPS / PKH"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="NO. KPS / PKH"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-checkbox
                              indeterminate-value="maybe"
                              v-model="theModel2"
                              label="PENERIMA KIP"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="NO. KIP"
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
                              v-model="form.skhun"
                              label="NAMA KIP"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
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
                              v-model="form.seri_ijazah"
                              label="NAMA AYAH"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form" mask="YYYY-MM-DD">
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
                              v-model="form.seri_ijazah"
                              label="NO. INDUK KEPENDUDUKAN AYAH"
                              lazy-rules
                              mask="################"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select
                            outlined
                            v-model="form.statusPembelian"
                            dense
                            lazy-rules
                            filled
                            :options="options.status"
                            label="KEBUTUHAN KHUSUS"
                            />
                          </div>
                          <div class="col">
                            <q-select
                            outlined
                            v-model="form.statusPembelian"
                            dense
                            lazy-rules
                            filled
                            :options="options.status"
                            label="PEKERJAAN"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select
                            outlined
                            v-model="form.statusPembelian"
                            dense
                            lazy-rules
                            filled
                            :options="options.status"
                            label="PENDIDIKAN"
                            />
                          </div>
                          <div class="col">
                            <q-select
                            outlined
                            v-model="form.statusPembelian"
                            dense
                            lazy-rules
                            filled
                            :options="options.status"
                            label="PENGHASILAN"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="NO. HANDPHONE"
                              lazy-rules
                              mask="############"
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
                              v-model="form.seri_ijazah"
                              label="NAMA IBU"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form" mask="YYYY-MM-DD">
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
                              v-model="form.seri_ijazah"
                              label="NO. INDUK KEPENDUDUKAN IBU"
                              lazy-rules
                              mask="################"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="KEBUTUHAN KHUSUS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PEKERJAAN" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PENDIDIKAN" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PENGHASILAN" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="NO. HANDPHONE"
                              lazy-rules
                              mask="#############"
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
                              v-model="form.seri_ijazah"
                              label="NAMA WALI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="TEMPAT LAHIR"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input filled v-model="form" dense label="TANGGAL LAHIR">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-date v-model="form" mask="YYYY-MM-DD">
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
                              v-model="form.seri_ijazah"
                              label="NO. INDUK KEPENDUDUKAN WALI"
                              mask="################"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="KEBUTUHAN KHUSUS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PEKERJAAN" />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PENDIDIKAN" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="PENGHASILAN" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="NO. HANDPHONE"
                              lazy-rules
                              mask="#############"
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
                              v-model="form.seri_ijazah"
                              label="TINGGI (Cm)"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="BERAT (Kg)"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="JUMLAH SAUDARA"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="ANAK KE"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <div class="row q-gutter-sm">
                          <div class="col">
                            <q-select outlined v-model="form" dense lazy-rules filled :options="options.prestasi" label="STATUS DALAM KELUARGA" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="JARAK RUMAH KE SEKOLAH (Km)"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="WAKTU TEMPUH KE SEKOLAH (Menit)"
                              lazy-rules
                              mask="###"
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                        </div>

                        <q-badge class="q-mb-md q-pa-sm q-pl-lg q-pr-lg" color="blue">CATATAN PRESTASI</q-badge>
                        <div class="row q-gutter-sm">
                          <div class="col-3">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="JENIS" />
                          </div>
                          <div class="col">
                            <q-select outlined v-model="form.statusPembelian" dense lazy-rules filled :options="options.status" label="TINGKAT" />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
                              label="TAHUN"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
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
                              v-model="form.seri_ijazah"
                              label="PRESTASI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col-7">
                            <q-input
                              filled
                              v-model="form.seri_ijazah"
                              label="PENYELENGGARA"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-btn label="TAMBAH" outline type="submit" color="green" style="width:122px" />
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
                              v-model="form.skhun"
                              label="TAHUN MULAI"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-input
                              filled
                              v-model="form.skhun"
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
                              v-model="form.seri_ijazah"
                              label="PENYELENGGARA"
                              lazy-rules
                              dense
                              :rules="[ val => val && val.length > 0 || 'Please type something']"
                            />
                          </div>
                          <div class="col">
                            <q-btn label="TAMBAH" outline type="submit" color="green" style="width:130px" />
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
import * as animationData from 'assets/add_penjualan.json'
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

// const listProduk = []

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
  },
  props: {
    editMode: Boolean,
    title: String
  },
  data () {
    const theModel = (null)
    const theModel2 = ('maybe')
    return {
      theModel,
      theModel2,
      zoom: 14,
      iconWidth: 25,
      iconHeight: 40,
      step: (1),
      form: {
        // id_pembelian: this.$generateIdPPDP(),
        barangs: [
          {
            namaBarang: null,
            jumlahPembelian: null,
            hargaSatuan: null,
            pajak: null,
            deskripsi: null
          }
        ],
        statusPembelian: null,
        supplier: null,
        nomorTelepon: null,
        alamatSupplier: null,
        tanggalJatuhTempo: null
      },
      options: {
        status: [
          'Lunas', 'Hutang'
        ]
      },
      defaultOptions: { animationData: animationData.default },
      animationSpeed: 2,
      onResetClick () {
        theModel.value = null
        theModel2.value = 'maybe'
      }
    }
  },
  computed: {
    iconUrl () {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`
    },
    iconSize () {
      return [this.iconWidth, this.iconHeight]
    }
  },
  created () {
    // this.getProduct()
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    },
    log (a) {
      console.log(a)
    },
    changeIcon () {
      this.iconWidth += 2
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2)
      }
    },
    // getProduct () {
    //   this.$api.get('product/get')
    //     .then(res => {
    //       listProduk = res.data.result
    //       // listProduk = list.map(product => {
    //       //   return product.nama_product
    //       // })
    //     })
    // },
    // filterProduct (val, update) {
    //   if (val === '') {
    //     update(() => {
    //       this.options.products = listProduk
    //     })
    //     return
    //   }

    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.options.products = listProduk.filter(v => v.nama_product.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    onSubmit () {
      // try {
      //   let grandTotal = 0
      //   const barangs = this.form.barangs.map(r => {
      //     return {
      //       namaBarang: r.namaBarang,
      //       hargaSatuan: r.hargaSatuan,
      //       pajak: r.pajak,
      //       jumlahPembelian: r.jumlahPembelian,
      //       total: ((r.jumlahPembelian * r.hargaSatuan) + (((r.jumlahPembelian * r.hargaSatuan) * r.pajak) / 100)),
      //       stok: r.jumlahPembelian,
      //       deskripsi: r.deskripsi
      //     }
      //   })

      //   barangs.forEach(product => {
      //     grandTotal += product.total
      //   })

      //   const sendData = {
      //     id_pembelian: this.form.id_pembelian,
      //     barangs: barangs,
      //     grandTotal: grandTotal,
      //     statusPembelian: this.form.statusPembelian,
      //     supplier: this.form.supplier,
      //     nomorTelepon: this.form.nomorTelepon,
      //     alamatSupplier: this.form.alamatSupplier,
      //     tanggalJatuhTempo: this.form.tanggalJatuhTempo
      //   }

      //   this.$api.post('pembelian/add', sendData)
      //     .then(res => {
      //       if (res.data.status !== true) {
      //         this.$showNotif(res.data.message, 'negative')
      //       } else {
      //         this.$router.go(-1)
      //         this.$showNotif('Data penjualan berhasil di input !', 'positive')
      //       }
      //     })
      // } catch (e) {
      //   this.$showNotif('Terjadi kesalahan !', 'negative')
      // }
    },
    onReset () {
      for (const i in this.form.barangs) {
        this.form.barangs[i].namaBarang = null
        this.form.barangs[i].jumlahPembelian = null
        this.form.barangs[i].hargaSatuan = null
        this.form.barangs[i].pajak = null
        this.form.barangs[i].deskripsi = null
        if (i > 0) {
          this.form.barangs.splice(i)
        }
      }
      this.form.tanggal_jatuh_tempo = null
      this.form.alamat_penagihan = null
      this.form.nomor_telepon = null
      this.form.pelanggan = null
      this.form.status_penjualan = null
    },
    add (index) {
      this.form.barangs.push({
        namaBarang: null,
        jumlahPembelian: null,
        hargaSatuan: null,
        pajak: null,
        deskripsi: null
      })
    },
    remove (index) {
      this.form.barangs.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>

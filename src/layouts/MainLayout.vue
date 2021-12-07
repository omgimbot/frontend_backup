<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-14">
      <q-toolbar>
        <q-btn
          flat
          @click="leftDrawerOpen = !leftDrawerOpen"
          round
          dense
          icon="menu"
        />
        <q-toolbar-title style="font-family: customfont" class="text-h5"
          >SIM Sekolah.</q-toolbar-title
        >
        <q-btn-dropdown
          flat
          label="Hello, Fullname"
          icon="manage_accounts"
          left
          stretch
          no-caps
        >
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-btn
                outline
                color="primary"
                label="Profile"
                clickable
                :to="{ name: 'profile' }"
                size="sm"
                icon="manage_accounts"
                left
              />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="statics/img/logos-smk.png" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">Fullname</div>

              <q-btn
                color="warning"
                label="Keluar"
                outline
                size="sm"
                v-close-popup
                @click="confirm = true"
              />
            </div>
          </div>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="sentiment_very_dissatisfied" text-color="primary" />
          <span class="q-ml-sm">Apakah anda yakin untuk keluar ?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat @click="logout()" label="Logout" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="300"
      :breakpoint="400"
    >
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item
            clickable
            :to="{ name: 'dashboard' }"
            v-ripple
            class="text-blue-14"
          >
            <q-item-section avatar>
              <q-icon name="school" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <q-item>
            <q-item-section> MAIN MENU </q-item-section>
          </q-item>

          <q-expansion-item
            expand-icon-toggle
            expand-separator
            icon="extension"
            label="Data Siswa"
            class="text-blue-14"
          >
            <q-card>
              <q-card-section>
                <q-item clickable :to="{ name: 'ppdb_add' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="accessibility_new" class="text-blue-10" />
                  </q-item-section>

                  <q-item-section class="text-blue"> PPDB </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'ppdp_add' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="model_training" class="text-blue-10" />
                  </q-item-section>

                  <q-item-section class="text-blue"> PPDP </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'siswa_baru' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="new_releases" class="text-blue-10" />
                  </q-item-section>

                  <q-item-section class="text-blue">
                    Daftar Siswa Baru
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'siswa_terima' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="history_edu" class="text-blue-10" />
                  </q-item-section>

                  <q-item-section class="text-blue">
                    Daftar Siswa Diterima
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'daftar_siswa' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="person_search" class="text-blue-10" />
                  </q-item-section>

                  <q-item-section class="text-blue">
                    Daftar Siswa
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-icon-toggle
            expand-separator
            icon="manage_accounts"
            label="Data Pegawai"
            class="text-blue-14"
          >
            <q-card>
              <q-card-section>
                <q-item clickable :to="{ name: 'pegawai' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="supervisor_account" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue"> Pegawai </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'pegawai_jabatan' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="how_to_reg" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Pengaturan Jabatan
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'pegawai_kelengkapan' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="auto_awesome_motion" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Kelengkapan Pegawai
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'pegawai_berkas' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="contact_page" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Berkas Pegawai
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'pegawai_mutasi' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="compare_arrows" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Mutasi Pegawai
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-icon-toggle
            expand-separator
            icon="analytics"
            label="Data Kurikulum"
            class="text-blue-14"
          >
            <q-card>
              <q-card-section>
                <q-item clickable :to="{ name: 'rombel' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="supervised_user_circle" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Kelompok Kelas / ROMBEL
                  </q-item-section>
                </q-item>

                <q-expansion-item
                  expand-icon-toggle
                  expand-separator
                  icon="view_quilt"
                  label="Manajemen Kelas"
                  class="text-blue-14"
                >
                  <q-card-section>
                    <q-item clickable :to="{ name: 'kelas_berjalan' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="switch_access_shortcut" class="text-blue-10"/>
                      </q-item-section>
                      <q-item-section class="text-blue">
                        Pengaturan Kelas Berjalan
                      </q-item-section>
                    </q-item>

                    <q-item clickable :to="{ name: 'jadwal' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="bookmark_added" class="text-blue-10" />
                      </q-item-section>
                      <q-item-section class="text-blue">
                        Pengaturan Jadwal
                      </q-item-section>
                    </q-item>

                    <q-item clickable :to="{ name: 'siswa' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="settings_accessibility" class="text-blue-10"/>
                      </q-item-section>
                      <q-item-section class="text-blue">
                        Pengaturan Siswa
                      </q-item-section>
                    </q-item>

                    <q-item clickable :to="{ name: 'pindah_kelas' }" v-ripple>
                      <q-item-section avatar>
                        <q-icon name="assignment_return" class="text-blue-10" />
                      </q-item-section>
                      <q-item-section class="text-blue">
                        Pengaturan Pindah Kelas
                      </q-item-section>
                    </q-item>
                  </q-card-section>
                </q-expansion-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-icon-toggle
            expand-separator
            icon="engineering"
            label="Manajemen Pengguna"
            class="text-blue-14"
          >
            <q-card>
              <q-card-section>
                <q-item clickable :to="{ name: 'hak_akses' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="policy" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Pengaturan Hak Akses
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'layanan' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="view_sidebar" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Pengaturan Menu Layanan
                  </q-item-section>
                </q-item>

                <q-item clickable :to="{ name: 'role' }" v-ripple>
                  <q-item-section avatar>
                    <q-icon name="pivot_table_chart" class="text-blue-10" />
                  </q-item-section>
                  <q-item-section class="text-blue">
                    Pengaturan Role
                  </q-item-section>
                </q-item>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-list class="rounded-borders">
            <q-item>
              <q-item-section> EXTRAS </q-item-section>
            </q-item>

            <q-expansion-item
              expand-icon-toggle
              expand-separator
              icon="verified_user"
              label="Master Data"
              class="text-blue-14"
            >
              <q-card>
                <q-card-section>
                  <q-item clickable :to="{ name: 'ruangan' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="room_preferences" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Ruangan </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'tingkat' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="grading" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Tingkat </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'keahlian' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="tips_and_updates" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Program Keahlian
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'kelas' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="meeting_room" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Kelas </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'rekja' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="next_plan" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Rencana Kerja
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'berkas' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="fact_check" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Berkas </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'jabatan' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="insights" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Jabatan </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'ekskul' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="connect_without_contact" class="text-blue-10"/>
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Ekstra Kulikuler
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'prestasi' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="emoji_events" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Jenis Prestasi
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'beasiswa' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="military_tech" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Jenis Beasiswa
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'sebab_keluar' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="transfer_within_a_station" class="text-blue-10"/>
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Sebab Siswa Keluar
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'mapel' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="vertical_split" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Mata Pelajaran
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'tahun_ajaran' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="today" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Pengaturan Tahun Ajaran
                    </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'biaya_sekolah' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="request_quote" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue">
                      Pengaturan Biaya Sekolah
                    </q-item-section>
                  </q-item>

                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item
              expand-icon-toggle
              expand-separator
              icon="privacy_tip"
              label="Master Data Sekolah"
              class="text-blue-14"
            >
              <q-card>
                <q-card-section>
                  <q-item clickable :to="{ name: 'sejarah_sekolah' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="history_toggle_off" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Sejarah Sekolah </q-item-section>
                  </q-item>

                  <q-item clickable :to="{ name: 'visi_misi' }" v-ripple>
                    <q-item-section avatar>
                      <q-icon name="track_changes" class="text-blue-10" />
                    </q-item-section>
                    <q-item-section class="text-blue"> Visi & Misi </q-item-section>
                  </q-item>

                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <q-item clickable :to="{ name: 'laporan' }" v-ripple class="text-blue-14">
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>
            <q-item-section> Laporan </q-item-section>
          </q-item>

          <q-item @click="confirm = true" clickable v-ripple class="text-blue-14">
            <q-item-section avatar>
              <q-icon name="sentiment_very_dissatisfied" />
            </q-item-section>
            <q-item-section> Sign Out </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top" src="~src/statics/bg.jpg" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="statics/img/logos-smk.png" />
          </q-avatar>
          <div class="text-weight-bold">Fullname</div>
          <div>@email user</div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal class="bg-grey-3">
      <q-toolbar>
        <q-toolbar-title class="text-h6 text-body1 text-blue-14" style="font-size: 13px">Copyright 2021</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
      confirm: false
    }
  },
  methods: {
    logout () {
      LocalStorage.remove('data', { path: '/auth' })
      this.$router.go({ name: 'signin' })
    }
  }
}
</script>

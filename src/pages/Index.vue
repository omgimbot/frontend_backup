<template>
  <q-page class="q-pr-md q-pl-md q-pa-md">
    <div v-if="!visible" class="col col-lg-12 col-md-6 col-sm-8 col-xs-10 q-pt-md">
      <q-card class="my-card q-pa-md">
        <q-breadcrumbs separator="---" class="text-blue-10" active-color="secondary">
          <q-breadcrumbs-el icon="inbox" label="Dashboard" />
        </q-breadcrumbs>
      </q-card>

      <div class="row q-mt-lg">

        <transition
          appear
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutRight"
        >

        <div class="row q-gutter-sm fit">

          <q-card class="my-card col col-sm col-lg-2">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Data siswa</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Akumulasi seluruh siswa sekolah terdaftar.
                  </div>
                  <div class="row">
                    <div class="row items-center">
                      <q-icon name="male" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        pria
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter :startAmount='0' :endAmount='100' :duration='3' :autoinit='true' /></div>
                    </div>
                    <div class="row items-center q-ml-lg">
                      <q-icon name="female" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        wanita
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter :startAmount='0' :endAmount='100' :duration='3' :autoinit='true' /></div>
                    </div>
                  </div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="extension" class="text-blue-14" style="font-size: 4.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col col-sm col-lg-2">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Data pegawai</div>
                  <div class="text-caption text-grey" style="font-size:11px">
                    Akumulasi seluruh pegawai sekolah terdaftar.
                  </div>
                  <div class="row">
                    <div class="row items-center">
                      <q-icon name="male" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        pria
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter :startAmount='0' :endAmount='100' :duration='3' :autoinit='true' /></div>
                    </div>
                    <div class="row items-center q-ml-lg">
                      <q-icon name="female" />
                      <div class="text-caption text-grey q-ml-xs" style="font-size:11px">
                        wanita
                      </div>
                      <div class="text-h6 q-ml-sm text-blue-13" style="font-size:12px"><vue3-autocounter :startAmount='0' :endAmount='100' :duration='3' :autoinit='true' /></div>
                    </div>
                  </div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="groups" class="text-blue-14" style="font-size: 4.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

          <q-card class="my-card col col-sm col-lg-2">
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h6" style="font-size: 14px">Data sarana</div>
                  <div class="text-caption text-grey" style="font-size: 11px">
                    Akumulasi seluruh sarana sekolah terdaftar.
                  </div>
                  <div class="text-h6 text-blue-13"><vue3-autocounter :startAmount='0' :endAmount='945' :duration='3' :autoinit='true' /></div>
              </q-card-section>

              <q-card-section class="col-4 flex flex-center">
                <q-icon name="real_estate_agent" class="text-blue-14" style="font-size: 4.4em;" />
              </q-card-section>
            </q-card-section>
          </q-card>

        </div>

        </transition>

        <transition
          appear
          enter-active-class="animated bounceInRight"
          leave-active-class="animated bounceOutLeft"
        >

        <div class="row q-gutter-sm fit q-mt-sm">

          <q-date
            v-model="date"
            today-btn
          />

          <q-card class="my-card col col-sm col-lg-2">
            <q-carousel
              arrows
              animated
              v-model="slide"
              height="400px"
              :autoplay="autoplay"
              infinite
              transition-prev="slide-right"
              transition-next="slide-left"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg">
                <div class="absolute-bottom custom-caption">
                  <div class="text-h5" align="left">Judul Pengumuman</div>
                  <div class="text-subtitle1" align="left">Pengumuman</div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
                <div class="absolute-bottom custom-caption">
                  <div class="text-h5" align="left">Judul Pengumuman</div>
                  <div class="text-subtitle1" align="left">Pengumuman</div>
                </div>
              </q-carousel-slide>
              <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
                <div class="absolute-bottom left custom-caption">
                  <div class="text-h5" align="left">Judul Pengumuman</div>
                  <div class="text-subtitle1" align="left">Pengumuman</div>
                </div>
              </q-carousel-slide>
            </q-carousel>
          </q-card>

        </div>

        </transition>

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
      autoplay: (true),
      slide: (1),
      date: ('2019/02/01'),
      VueChartkick: null,
      visible: false,
      data: [
        { name: 'Workout', data: { '2021-01-01': 3, '2021-01-02': 4 } },
        { name: 'Call parents', data: { '2021-01-01': 5, '2021-01-02': 3 } }
      ],
      filter: null,
      columns,
      rows,
      tabs: 'produk',
      splitterModel: 5
    }
  }
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]
</script>

<style>
.bounce-enter-active{
  animation: bounce-in 0.5s;
}
.bounce-leave-active{
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in{
  0%{
    transform: scale(0);
  }
  50%{
    transform: scale(1.25);
  }
  100%{
    transform: scale(1);
  }
}
.custom-caption{
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3);
}
</style>

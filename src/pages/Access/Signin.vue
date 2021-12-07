<template>
  <q-page class="bg-images window-width row justify-center items-center fit">
    <div class="column col-lg-3 col-md-5 col-sm-7 col-xs-9 q-pt-md">
      <q-card class="my-card fit q-mr-md">
        <q-parallax :height="200" no-native-menu>
          <template v-slot:media>
            <video width="720" height="440" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
              <source type="video/mp4" src="statics/video/bg.mp4">
            </video>
          </template>
          <q-card-actions vertical>
            <h3 class="text-white" style="font-family:customfont; height:20px">SIM Sekolah.</h3>
            <q-btn rounded outline class="text-white" color="white" label="Masuk Sekarang" @click="visible = !visible" />
          </q-card-actions>
        </q-parallax>
      </q-card>

      <transition name="bounce">
        <div v-if="visible">
          <div class="row justify-center items-center">
            <div class="q-pr-md q-pt-md q-pb-md fit">
              <q-card class="my-card responsive bg-grey-1">

                <q-card-section>
                  <div class="text-h5 text-blue-10 text-weight-bolder">Masuk</div>
                  <div class="text-caption text-weight-regular">Masukan username dan password kamu dibawah ini ya!</div>
                </q-card-section>

                <q-card-section>
                  <div class="justify-center items-center q-pl-lg q-pr-lg q-pb-md">
                    <q-form
                      @submit="onSubmit"
                      @reset="onReset"
                      class="q-gutter-sm"
                    >
                      <q-input
                        v-model="form.username"
                        label="username kamu ..."
                        lazy-rules
                        outlined
                        :rules="[ val => val && val.length > 0 || 'Lengkapin data username nya']"
                      >
                        <template v-slot:prepend>
                          <q-icon name="badge" class="text-blue-10" />
                        </template>
                      </q-input>

                      <q-input v-model="form.password" label="password kamu ..." outlined :type="isPwd ? 'password' : 'text'" :rules="[ val => val && val.length > 0 || 'Lengkapin data password nya']" counter lazy-rules>
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                          />
                        </template>
                        <template v-slot:prepend>
                          <q-icon name="gpp_good" class="text-blue-10" />
                        </template>
                      </q-input>

                      <q-separator />

                      <q-card-actions class="justify-end">
                        <div>
                          <q-btn type="reset" outline label="Reset Data" style="width:155px" class="items-center" unelevated color="primary" />
                          <q-btn type="submit" outline class="q-ml-sm items-center" style="width:155px" color="green" label="Masuk Sekarang" unelevated align="right" />
                        </div>
                      </q-card-actions>

                    </q-form>
                  </div>
                </q-card-section>

              </q-card>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: 'TTJES_www',
        password: '123'
      },
      isPwd: true,
      visible: false
    }
  },
  methods: {
    onSubmit () {
      this.$q.loading.show()
      this.$axios.post('users/login', this.form)
        .finally(() => this.$q.loading.hide())
        .then((res) => {
          console.log(res)
          if (!this.$parseResponse(res.data)) {
            // console.log(res.data)
            this.$q.localStorage.set('data', res.data)
            this.$router.push({ name: 'dashboard' })
          }
        })
    },
    onReset () {
      this.username = null
      this.password = null
    }
  }
}
</script>

<style>
.bg-images{
  background-image: url("src/statics/bg.jpg");
  background-size: cover;
}
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
</style>

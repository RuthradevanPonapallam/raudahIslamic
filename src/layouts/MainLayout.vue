<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #FDECEE;">
    <q-header reveal-offset="0" reveal class="bg-transparent">
      <div class="text-primary q-pa-md" style="text-align: center;">
        <span id="time-and-date" class="text-h6" />
        <br />
        <span id="islam-date" class="text-subtitle2" />
      </div>
      <img class="float-left q-mx-md button" text-color="black" src="~assets/icons/quran.png" @click="openQuranPage" />
      <img class="float-right q-mx-md button" src="~assets/icons/qibla.png" @click="openQiblaPage" />
      <q-btn class="absolute-top-right q-ma-md" color="primary" size="sm" text-color="white" icon="logout"
        @click="logout" />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer bordered elevated>
      <q-tabs ripple="true" active-bg-color="secondary" indicator-color="white" v-model="tab">
        <q-tab @click="$router.push('/GuidedMeditations')" name="GuidedMeditations">
          <img class="q-pa-xs" src="~assets/icons/praying.png" style="max-width: 45px;">
        </q-tab>
        <q-tab @click="$router.push('/Dkhir')" name="Dkhir">
          <img class="q-pa-xs" src="~assets/icons/beads.png" style="max-width: 45px;">
        </q-tab>
        <q-tab @click="$router.push('/')" name="Home">
          <img class="q-pa-xs" src="~assets/icons/kaaba.png" style="max-width: 45px;">
        </q-tab>
        <q-tab @click="$router.push('/Community')" name="Community">
          <img class="q-pa-xs" src="~assets/icons/community.png" style="max-width: 45px;">
        </q-tab>
        <q-tab name="/">
          <img class="q-pa-xs" src="~assets/icons/setting.png" style="max-width: 45px;">
        </q-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getAuth, signOut } from "firebase/auth";
import { PushNotifications } from '@capacitor/push-notifications';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {
      tab: ref('Home')
    }
  },
  mounted() {
    const currentDate = new Date();

    const formatDate = (date) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      const dayOfWeek = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      return `${dayOfWeek}, ${day} ${month} ${year}`;
    };

    const IslamicDate = (date) => {
      const ummAlQuraCalendar = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const islamicDateString = ummAlQuraCalendar.format(date);
      const [day, month, year] = islamicDateString.split(' ');

      return `${day} ${month} ${year} AH`;
    };

    document.getElementById('time-and-date').innerHTML = formatDate(currentDate);
    document.getElementById('islam-date').innerHTML = IslamicDate(currentDate);
  },
  methods: {
    openQuranPage() {
      this.$router.push('/quran');
    },
    openQiblaPage() {
      this.$router.push('/qibla');
    },
    logout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        this.$q.notify({
          message: "Logout successful!",
          color: "positive",
          position: "top",
        });
        this.$router.push('/');
      }).catch((error) => {
        console.log(error);
      });
    },
  },
})
</script>


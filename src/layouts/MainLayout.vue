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
      <q-btn class="q-mr-md" color="primary" size="sm" text-color="white" icon="logout" @click="logout" />
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
      <!-- <q-toolbar class="q-px-md text-primary" style="max-width: 540px; min-height: 70px; margin: auto;">
        <q-toolbar-title class="text-center">
          <q-btn outline class="q-ma-xs" style="color: #FDECEE;" size="lg" @click="$router.push('/GuidedMeditations')">
            <q-avatar square size="30px">
              <img src="~assets/icons/praying.png">
            </q-avatar>
          </q-btn>
          <q-btn outline class="q-ma-xs" style="color: #FDECEE;" size="lg" @click="$router.push('/Dkhir')">
            <q-avatar square size="30px">
              <img src="~assets/icons/beads.png">
            </q-avatar>
          </q-btn>
          <q-btn outline class="q-ma-xs" style="color: #FDECEE;" size="lg" @click="$router.push('/')">
            <q-avatar square size="30px">
              <img src="~assets/icons/kaaba.png">
            </q-avatar>
          </q-btn>
          <q-btn outline class="q-ma-xs" style="color: #FDECEE;" size="lg" @click="$router.push('/Community')">
            <q-avatar square size="30px">
              <img src="~assets/icons/community.png">
            </q-avatar>
          </q-btn>
          <q-btn outline class="q-ma-xs" style="color: #FDECEE;" size="lg" @click="openExplorePage">
            <q-avatar square size="30px">
              <img src="~assets/icons/setting.png">
            </q-avatar>
          </q-btn>
        </q-toolbar-title>
      </q-toolbar> -->
      <!-- <div @click="$router.push('/')" class="text-primary q-pa-md" style="text-align: center;">
        <div class="button">
          Raudah Islamic Center
        </div>
      </div> -->
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { getAuth, signOut } from "firebase/auth";

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {
      tab: ref('Home')
    }
  },

  mounted() {
    const currentDate = new Date(2023, 8, 1);

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
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = [
        'Muharram',
        'Safar',
        'Rabi al-Awwal',
        'Rabi al-Thani',
        'Jumada al-Awwal',
        'Jumada al-Thani',
        'Rajab',
        'Shaban',
        'Ramadan',
        'Shawwal',
        'Dhul Qadah',
        'Dhul Hijjah',
      ];

      const dayOfWeek = days[date.getDay()];
      const day = date.getDate();
      const month = months[date.getMonth() - 8];
      const year = date.getFullYear();
      const islamicYear = date.getFullYear() - 578;

      return ` ${day} ${month} ${islamicYear} AH`;
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

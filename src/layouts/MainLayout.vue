<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #FDECEE;">
    <q-header class="bg-transparent">
      <div class="text-primary q-pa-md" style="text-align: center;">
        <span id="time-and-date" class="text-h6" />
        <br />
        <span id="islam-date" class="text-subtitle2" />
      </div>
      <img class="float-left q-mx-md button" text-color="black" src="~assets/icons/quran.png" @click="openQuranPage" />
      <img class="float-right q-mx-md button" src="~assets/icons/qibla.png" @click="openQiblaPage" />
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer class="bg-transparent">
      <div class="text-primary q-pa-md" style="text-align: center;">
        <div class="button">
          Raudah Islamic Center
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

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
  },
})
</script>

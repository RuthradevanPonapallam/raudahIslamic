<template>
  <q-page class="q-pa-md">
    <div class="q-py-md">
      <q-card class="q-pa-md row" style="background-color: #f9f6f2;">
        <iframe id="iframe" title="prayerWidget" class="widget-m-top q-ma-sm"
          style=" height: 358px; border: 1px solid #ddd;" scrolling="no"
          src="https://www.islamicfinder.org/prayer-widget/1732903/shafi/13/0/18.0/18.0"> </iframe>
        <!-- <div class="col-8">
          <q-btn icon="volume_up" />
          <span> On </span>
        </div>
        <div class="col-4">
          <div>Next prayer time: {{ nextPrayerTime }}</div>
        </div> -->
      </q-card>
    </div>
    <div>
      <q-card class="q-pa-md button" style="background-color: #f9f6f2;">

      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      nextPrayerTime: '',
    };
  },
  async created() {
    // Assuming you have a function called `getPrayerTime`
    // that takes state and district as parameters and returns the next prayer time
    const state = 'Selangor'; // Replace this with the desired state
    const district = 'SGR01'; // Replace this with the desired district
    this.nextPrayerTime = await this.getPrayerTime(state, district);
  },
  methods: {
    async getPrayerTime(state, district) {
      // Replace this URL with the appropriate API endpoint or data source for prayer times
      const apiUrl = `https://waktu-solat4.p.rapidapi.com/solat/list?state=${state}&district=${district}`;
      try {
        const response = await axios.get(apiUrl);
        // Assuming the API response contains the next prayer time in the desired format
        return response.data.nextPrayerTime;
      } catch (error) {
        console.error(error);
        return 'Error fetching prayer time'; // Handle the error gracefully
      }
    },
  },
};
</script>


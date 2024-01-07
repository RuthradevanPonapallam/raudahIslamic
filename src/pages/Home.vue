<template>
  <q-page class="q-pa-md">
    <div class="q-py-md">
      <q-card class="col-8">
        <q-card-section>
          <q-card-title>Welcome, {{ currentUser.name }}!</q-card-title>
          <p v-if="currentUser.location">Location: {{ currentUser.location }}</p>
        </q-card-section>
      </q-card>
      <br />
      <q-card class="col-8" v-for="(prayerTime, index) in prayerTimes" :key="index">
        <q-card-section>
          <q-card-title>
            {{ prayerTime.date }} ({{ prayerTime.day }})
          </q-card-title>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item v-for="(value, key) in prayerTime" :key="key">
              <q-item-section>
                <q-item-label>{{ key }}</q-item-label>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ value }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from "axios";
import { getAuth } from "firebase/auth";

export default {
  name: "Home",
  data() {
    return {
      prayerTimes: [],
      currentUser: {
        name: '', // Replace with actual user data
      },
    };
  },
  async created() {
    try {
      // Check if the user is logged in
      const auth = getAuth();
      if (!auth.currentUser) {
        this.$router.push('/');
      } else {
        // Fetch and set user data
        const user = auth.currentUser.email;
        this.currentUser.name = user; // Replace with the actual property used to store the user's name
        console.log("User:", this.currentUser.name);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      // Handle error (e.g., redirect to an error page)
    }
  },
  mounted() {
    this.fetchPrayerTimes();
  },
  methods: {
    async fetchPrayerTimes() {
      try {
        const response = await axios.get('http://localhost:3000/solat');
        const today = new Date();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const day = String(today.getDate()).padStart(2, '0');
        const month = months[today.getMonth()];
        const year = today.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        console.log("hihi", formattedDate);

        // Filter prayer times for the current date
        const filteredPrayerTimes = response.data[0].prayerTime.filter(prayerTime => prayerTime.date === formattedDate);

        this.prayerTimes = filteredPrayerTimes;
        console.log('Prayer times:', filteredPrayerTimes);
      } catch (error) {
        console.error('Error fetching prayer times:', error);
      }
    },
  },
};
</script>


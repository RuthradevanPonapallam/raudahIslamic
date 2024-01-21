<template>
  <q-page class="q-pa-md">
    <div class="q-py-md">
      <q-card style="background-image:url('images/background3.jpg'); background-size: cover;" bordered class="col-8">
        <q-card-section>
          <q-card-title class="text-bold text-primary">Welcome, {{ currentUser.name }}!</q-card-title>
          <p class="text-bold text-primary" v-if="currentUser.location">Location: {{ currentUser.location }}</p>
        </q-card-section>
      </q-card>
      <br />
      <q-card bordered style="background-image:url('images/background3.jpg'); background-size: cover;"
        class="col-8 text-bold text-primary" v-for="(prayerTime, index) in prayerTimes" :key="index">
        <q-card-section>
          <q-card-title>
            {{ prayerTime.Date }} ({{ prayerTime.Day }})
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
    // this.fetchPrayerTimes();
    this.calculatePrayerTimes();
  },
  // methods: {
  //   // fetchPrayerTimes() {
  //   //   // Dummy data for presentation purposes
  //   //   const dummyData = [
  //   //     {
  //   //       date: "14-Jan-2024",
  //   //       day: "Mon",
  //   //       Fajr: "5:30 AM",
  //   //       Dhuhr: "12:00 PM",
  //   //       Asr: "3:30 PM",
  //   //       Maghrib: "6:00 PM",
  //   //       Isha: "8:30 PM",
  //   //     },
  //   //   ];
  //   //   this.prayerTimes = dummyData;
  //   // },
  //   calculatePrayerTimes() {
  //     const today = new Date();
  //     const coordinates = [37.7749, -122.4194]; // Hardcoded coordinates for San Francisco, CA
  //     const method = 'Basic'; // Use a basic method (you may need to implement the calculation logic)

  //     const prayerTimes = this.calculatePrayerTimesBasic(today, coordinates, method);

  //     // Format the prayer times as needed
  //     const formattedPrayerTimes = Object.entries(prayerTimes).map(([key, value]) => ({
  //       prayerName: key,
  //       time: value,
  //     }));

  //     this.prayerTimes = formattedPrayerTimes;
  //   },
  //   calculatePrayerTimesBasic(date, coordinates, method) {
  //     // Implement your basic calculation logic here
  //     // You may need to use mathematical formulas based on the desired method
  //     // For demonstration purposes, consider providing dummy values

  //     const dummyPrayerTimes = {
  //       Fajr: '5:30 AM',
  //       Dhuhr: '12:00 PM',
  //       Asr: '3:30 PM',
  //       Maghrib: '6:00 PM',
  //       Isha: '8:30 PM',
  //     };

  //     return dummyPrayerTimes;
  //   },
  // },
  methods: {
    calculatePrayerTimes() {
      const today = new Date();
      const coordinates = [37.7749, -122.4194]; // Hardcoded coordinates for San Francisco, CA
      const method = 'Basic'; // Use a basic method (you may need to implement the calculation logic)

      const prayerTimes = this.calculatePrayerTimesBasic(today, coordinates, method);

      // Format the prayer times as needed
      const formattedPrayerTimes = {
        Date: '14-Jan-2024', // Replace with the actual date
        Day: 'Monday', // Replace with the actual day
        ...prayerTimes,
      };

      this.currentUser.location = 'Shah Alam, Selangor'; // Replace with the actual location
      this.prayerTimes.push(formattedPrayerTimes);
    },
    calculatePrayerTimesBasic(date, coordinates, method) {
      // Implement your basic calculation logic here
      // You may need to use mathematical formulas based on the desired method
      // For demonstration purposes, consider providing dummy values

      const dummyPrayerTimes = {
        Fajr: '5:30 AM',
        Dhuhr: '12:00 PM',
        Asr: '3:30 PM',
        Maghrib: '6:00 PM',
        Isha: '8:30 PM',
      };

      return dummyPrayerTimes;
    },
  },
};
</script>


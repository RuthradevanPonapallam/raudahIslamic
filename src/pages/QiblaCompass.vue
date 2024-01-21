<template>
    <q-page class="full-height">
        <div class="q-pa-md text-center">
            <h1 class="text-h4 text-primary text-bold">Qibla Finder</h1>
            <p class="text-subtitle1 text-primary">Find the direction of the Kaaba with ease.</p>
        </div>

        <div class="compass-container q-mx-auto q-mt-lg">
            <div class="compass-circle text-white"
                style="background-image:url('images/background3.jpg'); background-size: cover;">
                <div class="compass-arrow" :style="{ transform: `rotate(${getArrowRotation()}deg)` }">
                    <q-img src="images/qibla-compass.png" style="height: 200px; width: 200px;" />
                </div>
                <div class="cardinal-direction N text-primary">N</div>
                <div class="cardinal-direction E text-primary">E</div>
                <div class="cardinal-direction S text-primary">S</div>
                <div class="cardinal-direction W text-primary">W</div>
                <!-- <div class="qibla-label text-primary" v-if="qiblaDirection">
                    Qibla: {{ qiblaDirection }}°
                </div> -->
            </div>
        </div>
    </q-page>
</template>
  
<script>
import { Geolocation } from "@capacitor/geolocation";

export default {
    name: "LocationDisplay",
    data() {
        return {
            currentLocation: {
                latitude: null,
                longitude: null,
            },
            qiblaDirection: 0, // Default Qibla direction
        };
    },
    mounted() {
        this.getLocation();
        this.calculateQiblaDirection();
    },
    methods: {
        async getLocation() {
            try {
                const coordinates = await Geolocation.getCurrentPosition();
                this.currentLocation = coordinates.coords;
                console.log("Current Location:", this.currentLocation);
            } catch (error) {
                console.log("Error getting location:", error);
            }
        },
        calculateQiblaDirection() {
            // Replace the following coordinates with the coordinates of the Kaaba in Mecca
            const kaabaCoordinates = {
                latitude: 21.3891,
                longitude: 39.8579,
            };

            if (this.currentLocation && kaabaCoordinates) {
                const { latitude, longitude } = this.currentLocation;
                const lat1 = this.deg2rad(latitude);
                const lon1 = this.deg2rad(longitude);
                const lat2 = this.deg2rad(kaabaCoordinates.latitude);
                const lon2 = this.deg2rad(kaabaCoordinates.longitude);

                const dLon = lon2 - lon1;

                const y = Math.sin(dLon) * Math.cos(lat2);
                const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
                const angle = Math.atan2(y, x);

                this.qiblaDirection = (this.rad2deg(angle) + 360) % 360;
                console.log("Qibla Direction:", this.qiblaDirection);
            }
        },
        deg2rad(deg) {
            return deg * (Math.PI / 180);
        },
        rad2deg(rad) {
            return rad * (180 / Math.PI);
        },
        getArrowRotation() {
            // Rotate the arrow based on the calculated Qibla direction
            return this.qiblaDirection;
        },
    },
};
</script>

<style scoped>
.compass-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.compass-circle {
    position: relative;
    border-radius: 50%;
    width: 300px;
    height: 300px;
    background-color: lightgray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.compass-arrow {
    font-size: 2em;
    /* Adjust the size of the arrow */
    transition: transform 0.5s ease;
    /* Add a smooth transition effect */
}

.cardinal-direction {
    font-weight: bold;
    position: absolute;
}

.N {
    top: 0;
}

.E {
    right: 0;
}

.S {
    bottom: 0;
}

.W {
    left: 0;
}
</style>
  
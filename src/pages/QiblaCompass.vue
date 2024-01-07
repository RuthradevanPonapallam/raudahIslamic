<template>
    <q-page>
        <div>
            <q-card>
                <q-card-section>
                    <q-card-title>Qibla Direction</q-card-title>
                    <q-card-subtitle v-if="newQiblaDirection">
                        <q-item>
                            <q-item-label>Latitude:</q-item-label>
                            <q-item-section>{{ newQiblaDirection.latitude }}</q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-label>Longitude:</q-item-label>
                            <q-item-section>{{ newQiblaDirection.longitude }}</q-item-section>
                        </q-item>
                    </q-card-subtitle>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
  
<script>
import { Geolocation } from "@capacitor/geolocation";

export default {
    name: "QiblaCompass",
    data() {
        return {
            newQiblaDirection: {
                latitude: null,
                longitude: null,
            },
        };
    },
    mounted() {
        this.getLocation();
    },
    methods: {
        async getLocation() {
            try {
                const coordinates = await Geolocation.getCurrentPosition();

                const newQiblaDirection = calculateQiblaDirection(
                    coordinates.coords.latitude,
                    coordinates.coords.longitude
                );

                // Update the newQiblaDirection object with the new latitude and longitude.
                this.newQiblaDirection.latitude = newQiblaDirection.latitude;
                this.newQiblaDirection.longitude = newQiblaDirection.longitude;
            } catch (error) {
                console.log("Error getting location:", error);
            }
        },
    },
};

// Calculate the Qibla direction.
function calculateQiblaDirection(latitude, longitude) {
    // The Qibla direction is the direction of Mecca from a given location.

    // To calculate the Qibla direction, we can use the following formula:

    // Qibla direction = atan2(sin(longitude - Mecca longitude), cos(latitude) * tan(Mecca latitude) - sin(latitude) * cos(longitude - Mecca longitude))

    // Mecca latitude and longitude are:

    const meccaLatitude = 21.42251;
    const meccaLongitude = 39.82616;

    // Calculate the Qibla direction in radians (initially).
    let qiblaDirection = Math.atan2(
        Math.sin((longitude - meccaLongitude) * (Math.PI / 180)),
        Math.cos(latitude * (Math.PI / 180)) *
        Math.tan(meccaLatitude * (Math.PI / 180)) -
        Math.sin(latitude * (Math.PI / 180)) *
        Math.cos((longitude - meccaLongitude) * (Math.PI / 180))
    );

    // Convert the Qibla direction to degrees.
    qiblaDirection = (qiblaDirection * 180) / Math.PI;

    // Return the Qibla direction as an object with latitude and longitude.
    return { latitude: latitude, longitude: qiblaDirection };
}
</script>
  
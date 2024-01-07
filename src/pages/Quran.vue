<template>
    <q-page class="flex flex-center">
        <q-card v-for="quran in qurans" :key="quran.number" class="q-ma-sm">
            <q-card-section class="text-primary">
                <div class="text-h6">{{ quran.asma.en.short }}</div>
                <q-expansion-item expand-separator :label="quran.asma.en.long">
                    <q-card>
                        <q-card-section>
                            <div class="text-subtitle2">{{ quran.tafsir.id }}</div>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <audio class="q-my-sm" controls :src="quran.recitation.full"></audio>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            qurans: [],
        };
    },
    created() {
        this.fetchQurans();
    },
    methods: {
        play() {
            this.$refs.audioPlayer.play();
        },
        pause() {
            this.$refs.audioPlayer.pause();
        },
        fetchQurans() {
            fetch('https://quran-endpoint.vercel.app/quran')
                .then(response => response.json())
                .then(data => {
                    this.qurans = data.data;
                })
                .catch(error => {
                    console.error('Error fetching Quran data:', error);
                });
        },
    },
};
</script>

<style>
.my-card {
    width: 100%;
    max-width: 350px;
    max-height: 150px;
}
</style>
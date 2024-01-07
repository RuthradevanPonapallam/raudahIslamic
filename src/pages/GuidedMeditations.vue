<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card v-for="(video, index) in videos" :key="index" class="my-card q-pa-md" flat bordered>
                <q-card-section horizontal>
                    <q-card-section style="min-width: 100px;" class="q-pt-xs">
                        <div class="text-overline">{{ video.category }}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">{{ video.title }}</div>
                        <iframe :ratio="16 / 9" :src="video.url" title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </q-card-section>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            videos: [
                {
                    category: 'Guided Meditations',
                    title: 'Relax',
                    url: "https://www.youtube.com/embed/5wUDvPE26i8?si=Awep8X3oDLAhK1so",
                },
                {
                    category: 'Guided Meditations',
                    title: 'Healing and peace',
                    url: 'https://www.youtube.com/embed/mUXetFq91ew?si=IQPx9qetFMM5TzUS',
                },
                {
                    category: 'Guided Meditations',
                    title: 'Forgiveness',
                    url: 'https://www.youtube.com/embed/ZDvh1KoL2r0?si=okRRsHHggloqAaf-',
                },
            ],
        };
    },
};
</script>
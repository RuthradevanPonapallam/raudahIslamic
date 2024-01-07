<template>
    <q-page class="flex flex-center">
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card bg-transparent" flat>
                <q-card-section vertical>
                    <q-card-section class="q-pt-xs">
                        <div class="text-h4  text-center text-primary">Dkhir Counter</div>
                        <div class="text-h5 q-mt-sm q-mb-xs text-center text-primary">Tasbih</div>
                    </q-card-section>
                    <q-card-section class="col-5 flex flex-center">
                        <div class="text-h1 bg-transparent text-primary">{{ count }}</div>
                        <q-img class="rounded-borders" src="\images\tasbih.png" style="height: 300px; width: 300px;" />
                    </q-card-section>
                    <q-card-actions class="flex flex-center">
                        <q-btn @click="increment" class="button" label="Increment"></q-btn>
                        <q-btn @click="reset" class="button" color="primary" label="Reset"></q-btn>
                    </q-card-actions>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            count: 0,
        };
    },
    methods: {
        increment() {
            this.count++;
        },
        reset() {
            this.count = 0;
        },
    },
};
</script>
<template>
    <q-page class="text-primary flex flex-center">
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card" flat bordered>
                <q-card-section vertical>
                    <q-card-section class="q-pt-xs">
                        <div class="text-overline">Community Forum</div>
                        <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
                        <div class="text-caption text-grey">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
                    </q-card-section>
                </q-card-section>

                <q-separator></q-separator>

                <q-card-actions>
                    <q-btn no-caps flat color="primary">
                        More Info
                    </q-btn>
                </q-card-actions>
            </q-card>
        </div>
        <div class="q-pa-md row items-start q-gutter-md">
            <q-card class="my-card" flat bordered>
                <q-card-section vertical>
                    <q-card-section class="q-pt-xs">
                        <div class="text-overline">Community Forum</div>
                        <div class="text-h5 q-mt-sm q-mb-xs text-bold">Title</div>
                        <div class="text-caption text-primary">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                        </div>
                    </q-card-section>

                    <q-card-section class="col-5 flex flex-center">
                        <q-img class="rounded-borders" src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
                    </q-card-section>
                </q-card-section>

                <q-separator></q-separator>

                <q-card-actions>
                    <q-btn no-caps flat color="primary">
                        More Info
                    </q-btn>
                </q-card-actions>
            </q-card>
        </div>
    </q-page>
</template>

<script>
export default {
    data() {
        return {
            tab: 'one'
        }
    }
}
</script>
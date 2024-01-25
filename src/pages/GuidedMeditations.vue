<template>
    <q-page class="text-primary flex flex-center">
        <div class="q-pa-md row items-start q-gutter-md">
            <!-- Add Button -->
            <q-btn v-if="allowAdd" @click="showAddDialog" color="primary" label="Add Guide" icon="add" />
            <!-- Video Cards -->
            <q-card v-for="(video, index) in videos" :key="index" class="my-card q-pa-md" flat bordered
                style="background-image:url('images/background3.jpg'); background-size: cover;">
                <q-btn v-if="allowEdit" size="sm" class="float-right q-ml-xs" @click="editGuide(index)" color="primary"
                    icon="edit" />
                <q-btn v-if="allowDelete" size="sm" class="float-right" @click="deleteGuide(index)" color="negative"
                    icon="delete" />
                <q-card-section horizontal>
                    <q-card-section style="min-width: 100px;" class="q-pt-xs">
                        <div class="text-overline text-bold">{{ video.category }}</div>
                        <div class="text-h5 q-mt-sm q-mb-xs text-bold">{{ video.title }}</div>
                        <iframe :ratio="16 / 9" :src="video.url" title="YouTube video player" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </q-card-section>
                </q-card-section>
            </q-card>

            <!-- Add Guide Dialog -->
            <q-dialog v-model="addDialog" persistent>
                <q-card>
                    <q-card-section>
                        <q-input v-model="newGuide.category" label="Category" />
                        <q-input v-model="newGuide.title" label="Title" />
                        <q-input v-model="newGuide.url" label="YouTube URL" />
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn label="Cancel" color="negative" @click="cancelAddDialog" />
                        <q-btn label="Add" color="primary" @click="addGuide" />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <!-- Edit Guide Dialog -->
            <q-dialog v-model="editDialog" persistent>
                <q-card>
                    <q-card-section>
                        <q-input v-model="newGuide.category" label="Category" />
                        <q-input v-model="newGuide.title" label="Title" />
                        <q-input v-model="newGuide.url" label="YouTube URL" />
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn label="Cancel" color="negative" @click="cancelEditDialog" />
                        <q-btn label="Save Changes" color="primary" @click="saveChanges" />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from 'src/boot/firebase';

const auth = getAuth();
const userID = auth.currentUser.uid;
console.log(userID);

export default {
    data() {
        return {
            videos: [],
            addDialog: false,
            editDialog: false,
            allowAdd: false,
            allowEdit: false,
            allowDelete: false,
            newGuide: {
                category: '',
                title: '',
                url: '',
            },
        };
    },
    created() {
        const userID = auth.currentUser.uid;
        console.log(userID);
        this.fetchGuides();
    },
    methods: {
        showAddDialog() {
            this.addDialog = true;
        },
        cancelAddDialog() {
            this.addDialog = false;
            this.newGuide = {
                category: '',
                title: '',
                url: '',
            };
        },
        addGuide() {
            const userID = auth.currentUser.uid;
            const embeddedURL = this.convertToEmbeddedLink(this.newGuide.url);

            if (embeddedURL) {
                this.newGuide.url = embeddedURL;

                addDoc(collection(db, 'users', userID, 'guides'), this.newGuide)
                    .then(() => {
                        // Handle success
                        this.$q.notify({
                            message: "Guide added successfully!",
                            color: "positive",
                            position: "top",
                        });
                        this.cancelAddDialog();
                        this.fetchGuides();
                    })
                    .catch((error) => {
                        // Handle error
                        this.$q.notify({
                            message: "Error adding guide!",
                            color: "negative",
                            position: "top",
                        });
                    });
            }
        },
        editGuide(index) {
            // Set data of the selected guide to the newGuide object
            this.newGuide = { ...this.videos[index] };
            // Open the edit dialog
            this.editDialog = true;
        },
        cancelEditDialog() {
            const userID = auth.currentUser.uid;
            // Close the edit dialog and reset the newGuide object
            this.editDialog = false;
            this.newGuide = {
                category: '',
                title: '',
                url: '',
            };
        },
        deleteGuide(index) {
            const userID = auth.currentUser.uid;
            const docRef = doc(db, 'users', userID, 'guides', this.videos[index].id);
            deleteDoc(docRef)
                .then(() => {
                    // Handle success
                    this.$q.notify({
                        message: "Guide deleted successfully!",
                        color: "positive",
                        position: "top",
                    });
                    this.fetchGuides(); // Update the videos array
                })
                .catch((error) => {
                    // Handle error
                    this.$q.notify({
                        message: "Error deleting guide!",
                        color: "negative",
                        position: "top",
                    });
                });
        },
        saveChanges() {
            const userID = auth.currentUser.uid;
            const embeddedURL = this.convertToEmbeddedLink(this.newGuide.url);
            if (embeddedURL) {
                this.newGuide.url = embeddedURL;
                // Get the index of the edited guide in the videos array
                const index = this.videos.findIndex((video) => video.id === this.newGuide.id);

                // Update the guide document in Firestore
                const docRef = doc(db, 'users', userID, 'guides', this.newGuide.id);
                updateDoc(docRef, this.newGuide)
                    .then(() => {
                        // Handle success
                        this.$q.notify({
                            message: "Guide updated successfully!",
                            color: "positive",
                            position: "top",
                        });
                        this.editDialog = false;
                        this.fetchGuides(); // Refresh the list
                    })
                    .catch((error) => {
                        // Handle error
                        this.$q.notify({
                            message: "Error updating guide!",
                            color: "negative",
                            position: "top",
                        });
                    });
            }
        },
        convertToEmbeddedLink(normalLink) {
            const regexNormalLink = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;

            if (regexNormalLink.test(normalLink)) {
                const videoID = normalLink.match(regexNormalLink)[1];
                return `https://www.youtube.com/embed/${videoID}`;
            } else {
                this.$q.notify({
                    message: "Invalid YouTube URL",
                    color: "negative",
                    position: "top",
                });
                return null;
            }
        },
        fetchGuides() {
            const userID = auth.currentUser.uid;
            getDocs(collection(db, 'users', userID, 'guides'))
                .then((querySnapshot) => {
                    const fetchedGuides = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    this.videos = fetchedGuides;
                    console.log("Data", this.videos)  // Update the videos array with fetched data

                    // Fetch User Permissions
                    return getDocs(collection(db, 'users', userID, 'userPermission'));
                })
                .then((querySnapshot) => {
                    const permissionData = querySnapshot.docs[0].data();
                    this.allowAdd = permissionData.allowAdd;
                    this.allowEdit = permissionData.allowEdit;
                    this.allowDelete = permissionData.allowDelete;
                    console.log("Permissions", permissionData)
                })
                .catch((error) => {
                    // Handle error
                    console.error('Error fetching guides:', error);
                });
        }
    },
};
</script>
  
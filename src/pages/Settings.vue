<template>
    <q-page class="q-pa-md">
        <div>
            <h5 class="text-primary text-bold q-mb-md">Customization</h5>

            <q-card style="background-image:url('images/background3.jpg'); background-size: cover;" class="q-mb-md">
                <q-card-section>
                    <q-toggle v-model="allowAdd" label="Allow Adding Guides" />
                </q-card-section>
            </q-card>

            <q-card style="background-image:url('images/background3.jpg'); background-size: cover;" class="q-mb-md">
                <q-card-section>
                    <q-toggle v-model="allowEdit" label="Allow Editing Guides" />
                </q-card-section>
            </q-card>

            <q-card style="background-image:url('images/background3.jpg'); background-size: cover;" class="q-mb-md">
                <q-card-section>
                    <q-toggle v-model="allowDelete" label="Allow Deleting Guides" />
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>
  
<script>
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from 'src/boot/firebase';

const auth = getAuth();
const userID = auth.currentUser.uid;
console.log(userID);

export default {
    data() {
        return {
            allowAdd: true,
            allowEdit: true,
            allowDelete: true,
            permissionsDocId: null, // Keep track of the document ID for update
        };
    },
    created() {
        const userID = auth.currentUser.uid;
        const userPermissionRef = collection(db, 'users', userID, 'userPermission');

        getDocs(userPermissionRef)
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    // Collection doesn't exist, create it and add default permissions
                    this.storePermissions({
                        allowAdd: true,
                        allowEdit: true,
                        allowDelete: true,
                    });
                } else {
                    // Collection exists, fetch permissions and document ID
                    const permissionsDocId = querySnapshot.docs[0].id;
                    this.permissionsDocId = permissionsDocId;
                    this.fetchPermissions();
                }
            })
            .catch((error) => {
                console.error('Error checking for collection:', error);
            });
    },
    watch: {
        allowAdd: 'storePermissions',
        allowEdit: 'storePermissions',
        allowDelete: 'storePermissions',
    },
    methods: {
        storePermissions() {
            const userID = auth.currentUser.uid;
            const userPermissionRef = collection(db, 'users', userID, 'userPermission');

            if (this.permissionsDocId) {
                // Document ID exists, update the existing document
                updateDoc(doc(db, 'users', userID, 'userPermission', this.permissionsDocId), {
                    allowAdd: this.allowAdd,
                    allowEdit: this.allowEdit,
                    allowDelete: this.allowDelete,
                })
                    .then(() => {
                        // this.$q.notify({
                        //     message: "Permissions updated successfully!",
                        //     color: "positive",
                        //     position: "top",
                        // });
                    })
                    .catch((error) => {
                        console.error('Error updating permissions:', error);
                        this.$q.notify({
                            message: "Error updating permissions!",
                            color: "negative",
                            position: "top",
                        });
                    });
            } else {
                // Document ID doesn't exist, create a new document
                addDoc(userPermissionRef, {
                    allowAdd: this.allowAdd,
                    allowEdit: this.allowEdit,
                    allowDelete: this.allowDelete,
                })
                    .then((docRef) => {
                        // Update the document ID after creation
                        this.permissionsDocId = docRef.id;
                        // this.$q.notify({
                        //     message: "Permissions saved successfully!",
                        //     color: "positive",
                        //     position: "top",
                        // });
                    })
                    .catch((error) => {
                        console.error('Error saving permissions:', error);
                        this.$q.notify({
                            message: "Error saving permissions!",
                            color: "negative",
                            position: "top",
                        });
                    });
            }
        },

        fetchPermissions() {
            const userID = auth.currentUser.uid;
            getDocs(collection(db, 'users', userID, 'userPermission'))
                .then((querySnapshot) => {
                    const permissionData = querySnapshot.docs[0].data();
                    this.allowAdd = permissionData.allowAdd;
                    this.allowEdit = permissionData.allowEdit;
                    this.allowDelete = permissionData.allowDelete;
                })
                .catch((error) => {
                    console.error('Error fetching permissions:', error);
                });
        },
    }
};
</script>

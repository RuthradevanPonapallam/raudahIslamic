<template>
    <q-form @submit.prevent="register">
        <q-input type="email" v-model="email" label="Email" />
        <q-input type="password" v-model="password" label="Password" />
        <q-input type="password" v-model="confirmPassword" label="Confirm Password" />
        <q-btn type="submit" label="Register" />
        <q-btn label="Already have an account? Login now" @click="$router.push('/login')" />
    </q-form>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: "",
            password: "",
            confirmPassword: "",
        };
    },
    methods: {
        async register() {
            try {
                const auth = getAuth();
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    this.email,
                    this.password
                );

                // Access the newly created user
                const user = userCredential.user;

                console.log("User registered successfully:", user);
                // Redirect or perform actions after successful registration

            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(`Registration failed: ${errorCode} - ${errorMessage}`);
                // Display error message to the user
            }
        },
    },
};
</script>

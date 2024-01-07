<template>
    <q-form @submit.prevent="login">
        <q-input type="email" v-model="email" label="Email" />
        <q-input type="password" v-model="password" label="Password" />
        <q-btn type="submit" label="Login" />
    </q-form>
    <q-btn label="Don't have an account? Register now" @click="$router.push('/home')" />
</template>
  
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    // created() {
    //     const auth = getAuth();
    //     if (auth.currentUser) {
    //         this.$router.push('/home');
    //     }
    // },
    methods: {
        async login() {
            try {
                const auth = getAuth();
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);

                // Access the signed-in user
                const user = userCredential.user;

                console.log("User signed in:", user);
                // Redirect or perform actions after successful login

                // Save user's authentication state in localStorage
                localStorage.setItem('user', JSON.stringify(user));

                // Display success notification
                this.$q.notify({
                    message: "Login successful!",
                    color: "positive",
                    position: "top",
                });
                this.$router.push('/home');

            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error(`Login failed: ${errorMessage}`);

                // Handle error or display a notification to the user
                // Display error notification
                this.$q.notify({
                    message: "Invalid Login Credentials!",
                    color: "red",
                    position: "top",
                });
            }
        }
    }
};
</script>
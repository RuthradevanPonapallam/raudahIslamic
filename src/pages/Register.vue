<template>
    <div class="register-container">
        <img src="~assets/icons/1.jpg" alt="Logo" class="logo" />
        <q-form @submit.prevent="register" class="register-form">
            <q-input class="q-pa-sm" type="email" v-model="email" label="Email" outlined />
            <q-input class="q-pa-sm" type="password" v-model="password" label="Password" outlined />
            <q-input class="q-pa-sm" type="password" v-model="confirmPassword" label="Confirm Password" outlined />
            <q-btn type="submit" label="Register" class="register-btn" color="primary" dense />
        </q-form>
        <q-btn label="Already have an account? Login now" @click="$router.push('/')" class="login-link" color="primary" flat
            dense />
    </div>
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
                localStorage.setItem('user', JSON.stringify(user));

                // Display success notification
                this.$q.notify({
                    message: "Account created!",
                    color: "positive",
                    position: "top",
                });
                this.$router.push('/');
                // Redirect or perform actions after successful registration

            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle error or display a notification to the user
                // Display error notification
                this.$q.notify({
                    message: "Please add a valid email and password",
                    color: "red",
                    position: "top",
                });
                console.error(`Registration failed: ${errorCode} - ${errorMessage}`);
                // Display error message to the user
            }
        },
    },
};
</script>

<style scoped>
.logo {
    max-width: 250px;
    margin-bottom: 20px;
}

.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.register-form {
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.q-input {
    width: 100%;
}

.register-btn {
    margin-top: 20px;
    width: 100%;
}

.login-link {
    margin-top: 20px;
}
</style>
<template>
    <div class="login-container">
        <img src="~assets/icons/1.jpg" alt="Logo" class="logo" />
        <q-form @submit.prevent="login" class="login-form">
            <q-input class="q-pa-sm" type="email" v-model="email" label="Email" outlined />
            <q-input class="q-pa-sm" type="password" v-model="password" label="Password" outlined />
            <q-btn type="submit" label="Login" class="login-btn" color="primary" dense />
        </q-form>
        <div class="register-link">
            <q-btn no-caps label="Don't have an account? Register now" @click="$router.push('/register')" color="primary"
                flat dense />
        </div>
    </div>
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
    created() {
        const auth = getAuth();
        if (auth.currentUser) {
            this.$router.push('/home');
        }
    },
    methods: {
        async login() {
            try {
                const auth = getAuth();
                const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);

                // Access the signed-in user
                const user = userCredential.user;

                console.log("User signed in:", user);
                // Redirect or perform actions after successful login

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

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.logo {
    max-width: 250px;
    margin-bottom: 20px;
}

.login-form {
    width: 80%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.q-input {
    width: 100%;
}

.login-btn {
    margin-top: 20px;
    width: 100%;
}

.register-link {
    margin-top: 20px;
}
</style>
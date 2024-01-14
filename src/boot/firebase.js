import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAuth } from 'firebase/auth';
import { Plugins } from '@capacitor/core';

const { PushNotifications } = Plugins;

const firebaseConfig = {
    apiKey: "AIzaSyDxcHUuCR5Zrc7J1wDej4r07HIcEcPmTxs",
    authDomain: "raudahislamic-de28b.firebaseapp.com",
    projectId: "raudahislamic-de28b",
    storageBucket: "raudahislamic-de28b.appspot.com",
    messagingSenderId: "186126529540",
    appId: "1:186126529540:web:a0bc914476707226e93151"
};

let app;

try {
    app = initializeApp(firebaseConfig);
} catch (error) {
    console.error('Error initializing Firebase: ', error);
}

const auth = getAuth(app);

// Push Notifications code
const messaging = getMessaging(app);

// Function to retrieve FCM token
async function retrieveFCMToken() {
    try {
        const token = await getToken(messaging);
        console.log('FCM Token:', token);
        // Send the token to your server or perform other actions
    } catch (error) {
        console.error('Error retrieving FCM token: ', error);
    }
}

// Function to handle incoming messages
onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    // Handle the incoming notification as needed
});

async function requestPermissions() {
    const permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
        throw new Error('User denied permissions!');
    }
}

async function registerNotifications() {
    await PushNotifications.register();
    // Retrieve FCM token after successful registration
    await retrieveFCMToken();
}

// Add listeners for registration, errors, incoming notifications, and actions
addListeners();

// Call requestPermissions() and registerNotifications() at appropriate points
// ...

export { app, auth, requestPermissions, registerNotifications };
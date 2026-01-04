// --- Firebase Configuration ---
// Follow these steps to get your actual config:
// 1. Go to console.firebase.google.com
// 2. Create a new project (or select an existing one)
// 3. Register a web app (click the </> icon)
// 4. Copy the "firebaseConfig" object provided
// 5. Replace the values below with YOUR actual keys

const firebaseConfigValues = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

window.__firebase_config = JSON.stringify(firebaseConfigValues);
window.__app_id = "parivartan-foundation";

console.log("Firebase Config Loaded. Please ensure you have replaced the placeholder values in 'firebase-config.js' with your real keys.");

/**
 * @module firebase
 * @description Firebase configuration and initialization
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

/**
 * Firebase configuration object
 * @private
 */
const firebaseConfig = {
  apiKey: "AIzaSyAUfVSJ3BpDrlV7-6Ou9DWE3KX1jHHFGEY",
  authDomain: "aryanranderiya-portfolio.firebaseapp.com",
  projectId: "aryanranderiya-portfolio",
  storageBucket: "aryanranderiya-portfolio.appspot.com",
  messagingSenderId: "540599201791",
  appId: "1:540599201791:web:757239eec07a33dc9ec1ca",
  measurementId: "G-S3XP36W3P9",
};

/**
 * Initialize Firebase services
 * @returns {{app: Object, database: Object, storage: Object}} Firebase services
 */
export function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const database = getDatabase();
  const storage = getStorage();
  
  return { app, database, storage };
}
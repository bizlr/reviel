import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, limit, deleteDoc, doc } from "firebase/firestore";
import dotenv from "dotenv";

dotenv.config();

// Build Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Simple sanity‑check – abort if any required field is missing
for (const [key, value] of Object.entries(firebaseConfig)) {
  if (!value) {
    console.error(`❗️ Missing Firebase config value for ${key}`);
    process.exit(1);
  }
}

console.log("✅ Firebase config loaded", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function runTest() {
  const testEmail = "test_user@example.com";
  const testName = "Test User";
  const coll = collection(db, "waitlist");

  // Clean up any previous test doc
  const cleanupSnap = await getDocs(query(coll, where("email", "==", testEmail)));
  for (const docSnap of cleanupSnap.docs) {
    await deleteDoc(doc(db, "waitlist", docSnap.id));
    console.log("Deleted previous test doc", docSnap.id);
  }

  // Add test doc
  const docRef = await addDoc(coll, {
    name: testName,
    email: testEmail,
    createdAt: new Date(),
  });
  console.log("Added test doc with ID", docRef.id);

  // Verify it exists
  const verifySnap = await getDocs(query(coll, where("email", "==", testEmail), limit(1)));
  if (!verifySnap.empty) {
    console.log("Verification success: document exists.");
  } else {
    console.error("Verification failed: document not found.");
  }

  // Clean up
  await deleteDoc(doc(db, "waitlist", docRef.id));
  console.log("Cleaned up test doc.");
}

runTest().catch((e) => {
  console.error("Error during test:", e);
});

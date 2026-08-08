import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUQFAI8Es1YapBTxpBrWIDFU-bTNS0ODs",
  authDomain: "thisvanlife.firebaseapp.com",
  projectId: "thisvanlife",
  storageBucket: "thisvanlife.firebasestorage.app",
  messagingSenderId: "486561964002",
  appId: "1:486561964002:web:6aed57471b09f3c1efe3bb",
};

// Initialize Firebase services used throughout the app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


export async function loadCart(uid) {
  const cartRef = doc(db, "carts", uid);

  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    return cartSnap.data().items;
  }

  return [];
}

export async function saveCart(uid, cart) {
  const cartRef = doc(db, "carts", uid); 

  await setDoc(cartRef, {
    items: cart,
  });
}

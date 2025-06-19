import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase ayarların
const firebaseConfig = {
  apiKey: "AIzaSyA6nkyMdQ4HKDrPW5Gw9u5p2Xy_NfklufE",
  authDomain: "premium-dental-85adf.firebaseapp.com",
  projectId: "premium-dental-85adf",
  storageBucket: "premium-dental-85adf.appspot.com",
  messagingSenderId: "169886165919",
  appId: "1:169886165919:web:051bf7161614a4625babaa"
};

// Uygulama init (tekrar başlatmaya karşı güvenli)
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Sadece getAuth kullanıyoruz, initializeAuth YOK
const auth = getAuth(firebaseApp);

export { firebaseApp, auth };

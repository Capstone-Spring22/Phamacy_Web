import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBZnaUXTBhgzey44sbutDpfECzve4zhLN8",
  authDomain: "chat-9c685.firebaseapp.com",
  projectId: "chat-9c685",
  storageBucket: "chat-9c685.appspot.com",
  messagingSenderId: "63066469338",
  appId: "1:63066469338:web:3640b174ff35e1a28746e3",
  measurementId: "G-B3N5PENXRF"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

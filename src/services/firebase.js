import firebase from 'firebase/app'
import 'firebase/auth'

var firebaseConfig = {
  apiKey: "AIzaSyBvEvhIpO_0nmzqteggIUKZIytVZiJ3dqg",
  authDomain: "chat-otp-d0351.firebaseapp.com",
  projectId: "chat-otp-d0351",
  storageBucket: "chat-otp-d0351.appspot.com",
  messagingSenderId: "46809127369",
  appId: "1:46809127369:web:eb43db6c288593234fb018"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase

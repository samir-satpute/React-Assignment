

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const initialiseFirebase = () => {

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    // apiKey: process.env.Firebase_API_Key,
    // authDomain: process.env.Firebase_Auth_Domain,
    // projectId: process.env.Firebase_Project_Id,
    // storageBucket: process.env.Firebase_Storage_Bucket,
    // messagingSenderId: process.env.Firebase_Messaging_Sender_Id,
    // appId: process.env.Firebase_App_Id,
    // measurementId: process.env.Firebase_Measurement_Id
    apiKey: "AIzaSyC2Vrdh1rzRvWdoFHZB84CTXSr7FWb7GDM",
authDomain: "book-store-js.firebaseapp.com",
projectId: "book-store-js",
storageBucket: "book-store-js.appspot.com",
messagingSenderId: "24031979168",
appId: "1:24031979168:web:dc71f5c056ddce7fdc0bc5",
measurementId: "G-G0Q7F7E4JJ"

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

}


export default initialiseFirebase;
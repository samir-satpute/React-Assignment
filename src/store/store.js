import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// import firebase from 'firebase/app'
// import 'firebase/auth';
// import 'firebase/firestore' // <- needed if using firestore
// // import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
// import { reduxFirestore, getFirestore } from 'redux-firestore';
//import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// import initialiseFirebase from "../initialiseFirebase";





// here add the logic for save the current state of the application to localstorage for preventing state to be lost
// const firebaseConfig = {
//     apiKey: "AIzaSyC2Vrdh1rzRvWdoFHZB84CTXSr7FWb7GDM",
//     authDomain: "book-store-js.firebaseapp.com",
//     projectId: "book-store-js",
//     storageBucket: "book-store-js.appspot.com",
//     messagingSenderId: "24031979168",
//     appId: "1:24031979168:web:dc71f5c056ddce7fdc0bc5",
//     measurementId: "G-G0Q7F7E4JJ"
//   };
// firebase.initializeApp(firebaseConfig);
// firebase.firestore() // <- needed if using firestore



// const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
//     ? compose(applyMiddleware(
//         thunk.withExtraArgument({ getFirestore, getFirebase })),
//         reduxFirestore(firebase),
//         reactReduxFirebase(firebase),
//         window.__REDUX_DEVTOOLS_EXTENSION__())
//     : applyMiddleware(thunk);


const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
  : applyMiddleware(thunk);


const store = createStore(reducers,middleware);


//after that need to subscribe with local storage
export default store;   
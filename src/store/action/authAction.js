
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { history } from "../../util/history";
import secureStorage from "../../util/secureStorage";


export const authLogin = (credentials) => {

    //console.log("in authAction authlogin ---->", credentials)
    const auth = getAuth();
    const db = getFirestore();
    return (dispatch) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then(async (loginUserCredential) => {
                const user = loginUserCredential.user;
                const docSnap = await getDoc(doc(db, 'users', user.uid))
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    // console.log("Successfully login user ---->", user);
                    secureStorage.setItem("userData", docSnap.data());
                    dispatch({ type: "LOGIN_SUCCESS", auth });
                    if(docSnap.data().userType === 'customer'){
                        history.push('/my-orders');
                    }else if(docSnap.data().userType === 'seller'){
                        history.push('/dashboard');
                    }else if(docSnap.data().userType === 'admin'){
                        history.push('/dashboard');
                    }else{
                        //redirect to user not found or 404 error page
                    }
                    
                    
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            })
            .catch((error) => {
                dispatch({ type: "LOGIN_FAIL", error });
            });
    }
}

export const registration = (credentials) => {
    const auth = getAuth();
    const db = getFirestore();
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                //console.log("Successfully create user through email and password user ---->", user);
                let data = {
                    first_name: credentials.first_name,
                    last_name: credentials.last_name,
                    email: credentials.email,
                    userType: credentials.userType
                }
                return setDoc(doc(db, 'users', user.uid), data).then((res) => {
                    // console.log("Successfully create user in collection ---->", res)
                    secureStorage.setItem("userData", data);
                    dispatch({ type: "REGISTRATION_SUCCESS", res });
                    history.push('/dashboard');
                    if(data.userType === 'customer'){
                        history.push('/my-orders');
                    }else if(data.userType === 'seller'){
                        history.push('/dashboard');
                    }else if(data.userType === 'admin'){
                        history.push('/dashboard');
                    }else{
                        //redirect to user not found or 404 error page
                    }
                })
            }).catch((error) => {
                //console.log("fail to create user ---->", error)
                dispatch({ type: "REGISTRATION_FAIL", error });
            });
    }
}

export const logout = () =>{

}

// When logout then clear securestorage
//secureStorage.clear();
// clears all data in the underlining sessionStorage/localStorage.

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

import { history } from "../../util/history";
import secureStorage from "../../util/secureStorage";


export const authLogin = (credentials) => {

    const auth = getAuth();
    const db = getFirestore();
    return (dispatch) => {
        signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then(async (loginUserCredential) => {
                const user = loginUserCredential.user;
                const docSnap = await getDoc(doc(db, 'users', user.uid))
                if (docSnap.exists()) {
                    secureStorage.setItem("userData", docSnap.data());
                    dispatch({ type: "LOGIN_SUCCESS", auth });
                    if (docSnap.data().userType === 'customer') {
                        history.push('/dashboard');
                    } else if (docSnap.data().userType === 'seller') {
                        history.push('/book-list');
                    } else if (docSnap.data().userType === 'admin') {
                        history.push('/users');
                    } else {
                        //redirect to user not found or 404 error page
                        history.push('/not-fount')
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
                let data = {
                    first_name: credentials.first_name,
                    last_name: credentials.last_name,
                    email: credentials.email,
                    userType: credentials.userType
                }
                return setDoc(doc(db, 'users', user.uid), data).then((res) => {
                    secureStorage.setItem("userData", data);
                    dispatch({ type: "REGISTRATION_SUCCESS", res });
                    if (data.userType === 'customer') {
                        history.push('/dashboard');
                    } else if (data.userType === 'seller') {
                        history.push('/book-list');
                    } else if (data.userType === 'admin') {
                        history.push('/users');
                    } else {
                        //redirect to user not found or 404 error page
                        history.push('/not-fount')
                    }
                })
            }).catch((error) => {
                dispatch({ type: "REGISTRATION_FAIL", error });
            });
    }
}

// export const logout = () =>{
// }

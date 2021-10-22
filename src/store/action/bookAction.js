import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export const getBookList = () => {

    const db = getFirestore();

    return async (dispatch) => {

        try {
            const querySnapshot = await getDocs(collection(db, "books"));
            let list = [];
            querySnapshot.forEach((doc) => {
                let bookId = {
                    bookId: doc.id
                }
                list.push({ ...bookId, ...doc.data() })
            });
            dispatch({ type: "GET_BOOK_LIST", list })
            return Promise.resolve(list);
        } catch (error) {
            dispatch({ type: "GET_BOOK_LIST_ERROR", error })
            return Promise.reject(null);
        }
    }
}
export const getSellerList = () => {

    const db = getFirestore();
    return async (dispatch) => {

        try {
            const q = query(collection(db, "users"), where("userType", "==", 'seller'));
            const querySnapshot = await getDocs(q);
            let list = [];
            querySnapshot.forEach((doc, index) => {
                list.push({ key: index, text: doc.data().first_name, value: doc.data().first_name })
            });
            dispatch({ type: "GET_SELLER_LIST", list })
            return Promise.resolve(list);

        } catch (error) {
            console.log("<<<<<<<=====", error);
            dispatch({ type: "GET_SELLER_LIST_ERROR", error })
            return Promise.reject(error);
        }
    }
}


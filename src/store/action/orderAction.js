import { collection, getDocs, getFirestore, doc, addDoc, updateDoc } from "firebase/firestore";


export const getOrderList = () => {

    const db = getFirestore();
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(collection(db, "orders"));
            let list = [];
            querySnapshot.forEach((doc) => {
                let orderId = {
                    orderId: doc.id
                }
                list.push({ ...orderId, ...doc.data() })
            });
            dispatch({ type: "GET_ORDER_LIST", list })
            return Promise.resolve(list);
        } catch (error) {
            dispatch({ type: "GET_ORDER_LIST_ERROR", error })
            return Promise.reject(null);
        }
    }
}


export const placeOrder = (orderDetails) => {

    const db = getFirestore();
    return async (dispatch) => {

        try {
            const orderRef = await addDoc(collection(db, "orders"), orderDetails);
            dispatch({ type: "ORDER_PLACE_SUCCESS", isOrderPlace: true })
            return Promise.resolve();
        } catch (error) {
            dispatch({ type: "ORDER_PLACE_ERROR", error })
            return Promise.reject(null);
        }
    }
}


export const confirmOrder = (orderDetails) => {

    const db = getFirestore();
    return async (dispatch) => {

        try {
            const bookRef = doc(db, "orders", orderDetails.orderId);
            await updateDoc(bookRef, {
                bookName: orderDetails.bookName,
                discount: orderDetails.discount,
                price: orderDetails.price,
                quantity: orderDetails.quantity,
                sellerName: orderDetails.sellerName,
                status: "CONFIRM",
                totalPrice: orderDetails.totalPrice,
                userName: orderDetails.userName
            });
            dispatch({ type: "ORDER_CONFIRM_SUCCESS", isOrderConfirm: true })
            return Promise.resolve();
        } catch (error) {
            dispatch({ type: "ORDER_CONFIRM_ERROR", error })
            return Promise.reject(null);
        }
    }
}



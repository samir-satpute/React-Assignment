
const initialState = {
    orderList: null,
    isOrderPlace:false,
    isOrderConfirm:false
}

const orderReducer = (state = initialState, action) => {
    // console.log("-------->reducer", action)
    switch (action.type) {
        case 'GET_ORDER_LIST':
            return {
                ...state,
                orderList: action.list
            }
        case 'GET_ORDER_LIST_ERROR':
            return {
                ...state,
                orderList: null
            }
        case 'ORDER_PLACE_SUCCESS':
            return {
                ...state,
                isOrderPlace: true
            }
        case 'ORDER_PLACE_ERROR':
            return {
                ...state,
                sellerList: false
            }
        case 'ORDER_CONFIRM_SUCCESS':
            return {
                ...state,
                isOrderConfirm: true
            }
        case 'ORDER_CONFIRM_ERROR':
            return {
                ...state,
                isOrderConfirm: false
            }
        default:
            return state;
    }
}

export default orderReducer;
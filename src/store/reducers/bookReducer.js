const initialState = {
    bookList: null,
    sellerList: null,
    bookStatus: false,
    isUpdatedBook: false,
    isDeletedBook: false
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOK_LIST':
            return {
                ...state,
                bookList: action.list
            }
        case 'GET_BOOK_LIST_ERROR':
            return {
                ...state,
                bookList: null
            }
        case 'GET_SELLER_LIST':
            return {
                ...state,
                sellerList: action.list
            }
        case 'GET_SELLER_LIST_ERROR':
            return {
                ...state,
                sellerList: null
            }
        case 'ADD_BOOK_SUCCESS':
            return {
                ...state,
                bookStatus: true
            }
        case 'ADD_BOOK_FAIL':
            return {
                ...state,
                bookStatus: false
            }
        case 'UPDATE_BOOK_SUCCESS':
            return {
                ...state,
                isUpdatedBook: true
            }
        case 'UPDATE_BOOK_FAIL':
            return {
                ...state,
                isUpdatedBook: false
            }
        case 'DELETE_BOOK_SUCCESS':
            return {
                ...state,
                isDeletedBook: true
            }
        case 'DELETE_BOOK_FAIL':
            return {
                ...state,
                isDeletedBook: false
            }
        default:
            return state;
    }
}

export default bookReducer;
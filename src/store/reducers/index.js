import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
import orderReducer from "./orderReducer";
import { combineReducers } from 'redux';



const reducers = combineReducers({
    auth: authReducer,
    book: bookReducer,
    orders:orderReducer
})

export default reducers;
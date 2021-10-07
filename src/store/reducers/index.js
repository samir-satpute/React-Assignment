import authReducer from "./authReducer";
import { combineReducers } from 'redux';



const reducers = combineReducers({
    auth: authReducer,
})

export default reducers;
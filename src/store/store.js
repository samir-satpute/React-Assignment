import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

// here add the logic for save the current state of the application to localstorage for preventing state to be lost

const store = createStore( applyMiddleware(thunk));


//after that need to subscribe with local storage
export default store;
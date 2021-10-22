const initialState = {
    authMessage: "",
    isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                authMessage: "Login Success...",
                isAuthenticated: true
            }
        case 'LOGIN_FAIL':
            return {
                ...state,
                authMessage: action.error.message,
                isAuthenticated: false
            }
        case 'REGISTRATION_SUCCESS':
            return {
                ...state,
                authMessage: "Successfully created user!",
                isAuthenticated: true
            }
        case 'REGISTRATION_FAIL':
            return {
                ...state,
                authMessage: action.error.message,
                isAuthenticated: false
            }

        default:
            return state;
    }
}

export default authReducer;
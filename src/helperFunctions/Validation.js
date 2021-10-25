export function Validations(rule, value) {

    switch (rule) {
        case "required": return required(value);
        case "email": return isValidEmail(value);
        case "password": return isValidPassword(value);
        default: return true;
    }
}


function required(value) {
    return value !== "" && value !== undefined
}

function isValidEmail(value) {
    // console.log("isValidEmail", value)
    const regex =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!value || regex.test(value) === false) {
        return false;
    }
    return true;
}


function isValidPassword(value) { 
    // console.log("isValid Password", value)
    const regex =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i;
    if (!value || regex.test(value) === false) {
        return false;
    }
    
    
    return true }
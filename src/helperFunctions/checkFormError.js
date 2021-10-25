const checkFormError = (formData, key) =>{
    var err = [];
    if (formData[key] && formData[key].length) {
        err = formData[key].filter(r => {
            return Object.values(r)[0] == false;
        })
    }

    if (err.length != 0 && err[0]['required'] == false) {
        return 'This field required'
    }
    if (err.length != 0 && err[0][key] == false) {
        if (key == 'email')
            return 'invalid email';
        else if (key == 'password')
            return 'password should be 8 char'
    }
    return null
}

export default checkFormError;
//validate email
export const isValidEmail = (email) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
}


export const isValidPassword = (pw) => {
    return pw.length >= 5
}

//validate re-password
export const isValidRePassword = (rePassword, password) => {
    return rePassword === password
}
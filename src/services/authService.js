const KEY = 'isLoggedIn';

export const register = (payload) => {
    const isExist = JSON.parse(localStorage.getItem(KEY));//converts the string to an object
    const existEmail =isExist? isExist.email : null;
    console.log('existing email')
    if (existEmail !== payload.email) {
        localStorage.setItem(KEY, JSON.stringify(payload));
        return true;
    } else { 
        return false};
}
export const loginUser = (payload) => {
    const isExist = JSON.parse(localStorage.getItem(KEY));//converts the string to an object
    const existEmail =isExist? isExist.email : null;
    const existPassword =isExist? isExist.password : null;
    console.log('existing email')
    if (existEmail === payload.email && existPassword === payload.password) {
        return JSON.parse(localStorage.getItem(KEY));
    } else {
        return false};
}
export const logoutUser = () => {
    localStorage.removeItem('userToken');
}
export const checkAuthStatus = () => {
    return localStorage.getItem('userToken') === 'true';
}


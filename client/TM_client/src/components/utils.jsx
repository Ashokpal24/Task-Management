import { jwtDecode } from "jwt-decode";

const saveJWTToken = ({ accessToken, refreshToken }) => {

    localStorage.setItem('Token', JSON.stringify({
        accessToken, refreshToken
    }))
}

const loadJWTToken = () => {
    return JSON.parse(localStorage.getItem('Token'))
}

const deleteJWTToken = () => {
    localStorage.removeItem('Token')
    console.log('Token deleted')
}

const checkExpiration = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    if (currentTime > expirationTime) {
        console.log('Token has expired');
        return false
    }
    console.log('Token is still valid');
    return true
}


export { saveJWTToken, loadJWTToken, deleteJWTToken, checkExpiration }


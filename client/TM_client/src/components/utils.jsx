import { jwtDecode } from "jwt-decode";

const loginURL = 'https://fuzzy-rotary-phone-674p77v5gqr2xpv-8000.app.github.dev/login/'
const registerURL = 'https://fuzzy-rotary-phone-674p77v5gqr2xpv-8000.app.github.dev/register/'
const projectListURL = 'https://fuzzy-rotary-phone-674p77v5gqr2xpv-8000.app.github.dev/project/'
const taskListURL = 'https://fuzzy-rotary-phone-674p77v5gqr2xpv-8000.app.github.dev/task/'

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


export { saveJWTToken, loadJWTToken, deleteJWTToken, checkExpiration, loginURL, registerURL, projectListURL, taskListURL }


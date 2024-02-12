import { jwtDecode } from "jwt-decode";
import {
    TextField,
    styled,
} from '@mui/material';

const profileURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/profile/'
const loginURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/login/'
const registerURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/register/'
const projectURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/project/'
const taskURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/task/'
const subtaskURL = 'https://psychic-space-broccoli-gw7pwwx7grr3p7v7-8000.app.github.dev/subtask/'


const CustomTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#E0E3E7',
        },
        '&:hover fieldset': {
            borderColor: '#B2BAC2',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'black',
            border: "1.5px solid"
        },
    },
});

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

const getDataList = async ({ token, setList, URL }) => {
    try {
        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
        }
        const data = await response.json();
        setList(data)
    }
    catch (error) {
        console.error("An error occurred during retriving of data:", error);
    }
}


const getDataItem = async ({ token, setItem, URL, Id }) => {
    const ItemURL = URL + Id
    try {
        const response = await fetch(ItemURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.accessToken
            },
        })
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData)
        }
        const data = await response.json();
        let new_data = []
        new_data.push(data)
        // console.log(data)
        setItem(new_data)
    }
    catch (error) {
        console.error("An error occurred during retriving of data:", error);
    }
}

const formatToDMY = ({ dateString }) => {

    const tempString = dateString.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    const isoDate = new Date(tempString);

    const day = isoDate.getDate();
    const monthNames = [
        'Jan', 'Feb', 'March', 'April', 'May', 'June',
        'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
    ];
    const month = isoDate.getMonth();
    const year = isoDate.getFullYear();

    const formattedDate = `${day} ${monthNames[month]} ${year}`;

    return formattedDate;
}

export {
    saveJWTToken,
    loadJWTToken,
    deleteJWTToken,
    checkExpiration,
    getDataList,
    getDataItem,
    loginURL,
    registerURL,
    profileURL,
    projectURL,
    taskURL,
    subtaskURL,
    formatToDMY,
    CustomTextField
}


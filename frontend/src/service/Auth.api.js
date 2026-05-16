import axios from 'axios'

axios.defaults.withCredentials = true;

const BASE_URL = 'https://chatapp-g0f6.onrender.com'

export const RegisterApi = async (data) => {

    const response = await axios.post(

       `${BASE_URL}/api/auth/signup`,

        data

    )
    return response.data

}


export const LoginApi = async (data) => {

    const response = await axios.post(

        `${BASE_URL}/api/auth/login`,

        data)

    return response.data
}

export const GetUser = async () => {

    const response = await axios.get(
        `${BASE_URL}/api/auth/users`)

    return response.data
}


export const SaveMessage = async (data) => {
    const response = await axios.post( `${BASE_URL}/api/message/save`, data)

    return response.data
}

export const GetMessages = async (receiverId) => {

    const response = await axios.get(
        `${BASE_URL}/api/message/${receiverId}`)

    return response.data
}

export const LogoutApi = async () => {

    const response = await axios.post( `${BASE_URL}/api/auth/logout`)

    return response.data
}   
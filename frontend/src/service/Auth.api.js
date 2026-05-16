import axios from 'axios'

axios.defaults.withCredentials = true;


export const RegisterApi = async (data) => {

    const response = await axios.post(

        'http://localhost:3000/api/auth/signup',

        data

    )
    return response.data

}


export const LoginApi = async (data) => {

    const response = await axios.post(

        'http://localhost:3000/api/auth/login',

        data)

    return response.data
}

export const GetUser = async () => {

    const response = await axios.get('http://localhost:3000/api/auth/users')

    return response.data
}


export const SaveMessage = async (data) => {
    const response = await axios.post('http://localhost:3000/api/message/save', data)

    return response.data
}

export const GetMessages = async (receiverId) => {

    const response = await axios.get(`http://localhost:3000/api/message/${receiverId}`)

    return response.data
}

export const LogoutApi = async () => {

    const response = await axios.post('http://localhost:3000/api/auth/logout')

    return response.data
}   
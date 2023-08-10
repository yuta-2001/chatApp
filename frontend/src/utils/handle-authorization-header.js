import axios from '../libs/axios'

const createAuthorizationHeader = (tokenType, accessToken) => {
    axios.defaults.headers['Authorization'] = tokenType + ' ' + accessToken;
}

const deleteAuthorizationHeader = () => {
    delete axios.defaults.headers['Authorization']
}

export { createAuthorizationHeader, deleteAuthorizationHeader }

const setTokenToLocalStorage = (tokenType, accessToken) => {
    localStorage.setItem('tokenType', tokenType);
    localStorage.setItem('accessToken', accessToken);
}

const getAuthorizationHeader = () => {
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');
    
    if (tokenType && accessToken) {
        return tokenType + ' ' + accessToken;
    }
    return null;
}

const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('tokenType');
    localStorage.removeItem('accessToken');
}

export { setTokenToLocalStorage, getAuthorizationHeader, removeTokenFromLocalStorage }

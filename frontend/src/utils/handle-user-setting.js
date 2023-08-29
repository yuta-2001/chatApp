const userInfoToLocalStorage = (userInfo) => {
  localStorage.setItem('user', JSON.stringify(userInfo));
}

const getUserInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem('user');
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
}

const removeUserInfoFromLocalStorage = () => {
  localStorage.removeItem('user');
}

export { userInfoToLocalStorage, getUserInfoFromLocalStorage, removeUserInfoFromLocalStorage}

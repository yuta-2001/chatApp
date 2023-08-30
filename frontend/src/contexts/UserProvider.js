'use client'
import React, { createContext, useState } from 'react';
import { useContext } from 'react';
import { getUserInfoFromLocalStorage } from '../utils/handle-user-setting';

export const UserContext = createContext();
export const UserUpdateContext = createContext();

export function UserProvider({ children }) {
  const storedUser = getUserInfoFromLocalStorage()
  const [user, setUser] = useState(storedUser)

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={setUser}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}

export const useUser = () => {
  return useContext(UserContext);
}

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
}

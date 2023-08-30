'use client'

import { ToastProvider } from '../contexts/ToastProvider'
import { UserProvider } from '../contexts/UserProvider'

export const Providers = ({ children }) => {
  return (
    <ToastProvider>
      <UserProvider>
        {children}
      </UserProvider>
    </ToastProvider>
  )
}

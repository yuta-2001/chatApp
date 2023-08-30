'use client'
import React, { createContext, useState } from 'react';
import { useContext } from 'react';

export const ToastContext = createContext();
export const ToastUpdateContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState('')

  return (
    <ToastContext.Provider value={toast}>
      <ToastUpdateContext.Provider value={setToast}>
        {children}
      </ToastUpdateContext.Provider>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  return useContext(ToastContext);
}

export const useToastUpdate = () => {
  return useContext(ToastUpdateContext);
}

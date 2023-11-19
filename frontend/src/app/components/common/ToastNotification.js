'use client'
import { useEffect } from 'react';
import { useToast, useToastUpdate } from '../../../contexts/ToastProvider';

const colorClasses = {
  error: 'bg-red-100 border-red-500',
  success: 'bg-green-100 border-green-500',
  warning: 'bg-yellow-100 border-yellow-500',
};

const ToastNotification = () => {
  const toastInfo = useToast();
  const setToast = useToastUpdate();

  useEffect(() => {
    if (toastInfo) {
      setTimeout(() => {
        setToast(null);
      }, 6000);
    }
  }, [toastInfo]);

  const color = toastInfo ? colorClasses[toastInfo.type] : '';

  return (
    <>
      {toastInfo && (
        <div
          className={`fixed z-50 top-0 right-0 m-8 p-4 rounded-md shadow-md w-auto border-l-4 ${color}`}
        >
          {toastInfo.message}
        </div>
      )}
    </>
  )
}

export default ToastNotification

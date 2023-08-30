'use client'
import { useRouter } from 'next/navigation'

const handleErrorResponse = (response, setToast, router) => {
  console.log(response.status)
  if (response.status === 422) {
    let message = '';
    for (const [key, value] of Object.entries(response.data.errors)) {
      message += `${key}: ${value[0]} \n`;
    }
    setToast({
        type: 'error',
        message: message,
    });
  } else if (response.status === 401) {
    setToast({
      type: 'error',
      message: 'Unauthorized',
    });
    router.push('/login')
  } else {
    setToast({
        type: 'error',
        message: 'Something went wrong',
    });
  }
}

export { handleErrorResponse }

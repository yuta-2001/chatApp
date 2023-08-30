'use client'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { set, useForm } from 'react-hook-form'
import axios from '../../../libs/axios'
import { setTokenToLocalStorage } from '../../../utils/handle-authorization-header'
import FormBtn from './FormBtn'
import FormInput from './FromInput'
import FormImage from '../image/FormImage'
import { useUserUpdate } from '../../../contexts/UserProvider'
import { userInfoToLocalStorage } from '../../../utils/handle-user-setting'
import { useToastUpdate } from '../../../contexts/ToastProvider'

export default function AuthForm({ isRegister }) {
  const { 
    register, 
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({})
  const [icon, setIcon] = useState('')
  const router = useRouter()
  const setUser = useUserUpdate()
  const setToast = useToastUpdate()

  const handleChangeIcon = useCallback((nextIcon) => {
    setIcon(nextIcon);
    setValue('icon', nextIcon);
  },[]);

  const handleErrorResponse = (response) => {
    if (response.status === 422) {
      let message = '';
      for (const [key, value] of Object.entries(response.data.errors)) {
        message += `${key}: ${value[0]} \n`;
      }
      setToast({
          type: 'error',
          message: message,
      });
    } else {
      setToast({
          type: 'error',
          message: 'Something went wrong',
      });
    }
  }

  const onSubmit = (data) => {
    if (isRegister) {
      const formData = new FormData();
      formData.append('icon', data.icon);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      axios.post('/api/register', formData)
        .then((res) => {
          router.push('/login')
        })
        .catch((err) => {
          handleErrorResponse(err.response);
        })
    } else {
      axios.post('/api/login', {
        'email' : data.email,
        'password' : data.password
      }).then((res) => {
        setTokenToLocalStorage(res.data.token_type, res.data.access_token)
        axios.get('/api/users/me').then((res) => {
          userInfoToLocalStorage(res.data)
          setUser(res.data)
          router.push('/dashboard')
        }).catch((err) => {
          handleErrorResponse(err.response);
        })
      }).catch((err) => {
        handleErrorResponse(err.response);
      })
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6" 
        onSubmit={handleSubmit(onSubmit)}
      >
        {isRegister && (
          <>
            <FormImage
              icon={icon}
              handleChangeIcon={handleChangeIcon}
            />
            <FormInput
              fieldName='name'
              type='text'
              register={...register('name', {
                required: 'Name is required',
              })}
              error={errors.name && errors.name.message}
            />
          </>
        )}
        <FormInput
          fieldName='email' 
          type='email' 
          register={...register('email', {
            required: 'Email is required',
          })}
          error={errors.email && errors.email.message}
        />
        <FormInput
          fieldName='password'
          type='password'
          register={...register('password', {
            required: 'Password is required',
          })}
          error={errors.password && errors.password.message}
        />
        <FormBtn isRegister={isRegister} />
      </form>
    </div>
  )
}
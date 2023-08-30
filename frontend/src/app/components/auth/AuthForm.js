'use client'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../../libs/axios'
import { setTokenToLocalStorage } from '../../../utils/handle-authorization-header'
import FormBtn from './FormBtn'
import FormInput from './FromInput'
import FormImage from '../image/FormImage'
import { useUserUpdate } from '../../../contexts/UserProvider'
import { userInfoToLocalStorage } from '../../../utils/handle-user-setting'

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

  const handleChangeIcon = useCallback((nextIcon) => {
    setIcon(nextIcon);
    setValue('icon', nextIcon);
  },[]);

  const onSubmit = async (data) => {
    if (isRegister) {
      const formData = new FormData();
      formData.append('icon', data.icon);
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      const res = await axios.post('/api/register', formData)
      if (res.status === 200) {
        router.push('/login')
      } else {
        alert('Register failed')
      }
    } else {
      const res = await axios.post('/api/login', { 
        'email' : data.email,
        'password' : data.password
      })
      if (res.status === 200) {
        setTokenToLocalStorage(res.data.token_type, res.data.access_token)
        const user = await axios.get('/api/users/me')
        userInfoToLocalStorage(user.data)
        setUser(user.data)
        router.push('/dashboard')
      } else {
        alert('Login failed')
      }
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
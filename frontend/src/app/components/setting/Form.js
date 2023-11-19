"use client"
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import FormBtn from './FormBtn'
import FormInput from './FormInput'
import FormImage from '../image/FormImage'
import axios from '../../../libs/axios'
import { useToastUpdate } from '../../../contexts/ToastProvider'

import { useUser, useUserUpdate } from '../../../contexts/UserProvider'
import { userInfoToLocalStorage } from '../../../utils/handle-user-setting'
import { handleErrorResponse } from '../../../utils/handle-error-response'

export default function Form() {
  const user = useUser()
  const setUser = useUserUpdate()
  const [userIcon, setUserIcon] = useState(user.icon)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      current_password: '',
      new_password: '',
      tel: user.tel,
      company: user.company,
    },
  })

  const clearUpdatePassword = useCallback(() => {
    setValue('current_password', '')
    setValue('new_password', '')
    setValue('password_confirm', '')
  }, [])

  const handleChangeIcon = useCallback((icon) => {
    setUserIcon(icon)
    setValue('icon', icon)
  }, [])

  const setToast = useToastUpdate()
  async function onSubmit(data) {
    const formData = new FormData();
    if (data.icon !== undefined) {
      formData.append('icon', data.icon);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);
    if (data.new_password !== '' && data.current_password !== '' && data.new_password === data.password_confirm) {
      formData.append('current_password', data.current_password);
      formData.append('new_password', data.new_password);
    }
    formData.append('tel', data.tel);
    formData.append('company', data.company);
    formData.append('_method', 'put');

    axios.post('/api/users/me', formData)
      .then((res) => {
        axios.get('/api/users/me')
          .then((res) => {
            userInfoToLocalStorage(res.data)
            setUser(res.data)
            setToast({
              type: 'success',
              message: 'Update user successfully',
            });
            clearUpdatePassword()
          })
          .catch((err) => {
            handleErrorResponse(err.response, setToast, router);
            clearUpdatePassword()
          })
      })
      .catch((err) => {
        handleErrorResponse(err.response, setToast, router);
        clearUpdatePassword()
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormImage handleChangeIcon={handleChangeIcon} icon={userIcon} />
      <FormInput 
        type="text" 
        name="name" 
        id="name" 
        label="Name" 
        register={register('name', {
          required: 'Name is required',
        })}
        error={errors.name && errors.name.message}
      />
      <FormInput 
        type="email" 
        name="email" 
        id="email"
        label="Email"
        register={register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: 'Invalid email address',
          },
        })}
        error={errors.email && errors.email.message}
      />
      <FormInput 
        type="password" 
        name="current_password" 
        id="current_password" 
        label="Current_password"
        register={register('current_password')}
        error={errors.current_password && errors.current_password.message}
      />
      <FormInput
        type="password" 
        name="new_password" 
        id="new_password" 
        label="New password" 
        register={register('new_password', {
          validate: {
            isRequiredIfCurrentPasswordIsNotEmpty: (value) => {
              if (value === '' && getValues('current_password') !== '') {
                return 'New password is required'
              }
            }
          }
        })}
        error={errors.new_password && errors.new_password.message}
      />
      <FormInput
        type="password_confirm"
        name="password_confirm"
        id="password_confirm"
        label="Confirm password"
        register={register('password_confirm', {
          validate: {
            isRequiredIfNewPasswordIsNotEmpty: (value) => {
              if (value === '' && getValues('new_password') !== '') {
                return 'Confirm password is required'
              }
            },
            isMatchNewPassword: (value) => {
              if (value !== getValues('new_password')) {
                return 'Password does not match'
              }
            }
          }
        })}
        error={errors.password_confirm && errors.password_confirm.message}
      />
      <div className="grid md:grid-cols-2 md:gap-6">
        <FormInput 
          type="text" 
          name="tel" 
          id="tel" 
          label="Tel" 
          register={register('tel')}
          error={errors.tel && errors.tel.message}
        />
        <FormInput 
          type="text" 
          name="company" 
          id="company" 
          label="Company" 
          register={register('company')}
          error={errors.company && errors.company.message}
        />
      </div>
      <FormBtn />
    </form>
  )
}

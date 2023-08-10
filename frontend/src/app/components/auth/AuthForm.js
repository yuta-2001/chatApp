'use client'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import axios from '../../../libs/axios'
import { createAuthorizationHeader } from '../../../utils/handle-authorization-header'
import FormBtn from './FormBtn'
import FormInput from './FromInput'
import FormImage from '../Image/FormImage'

export default function AuthForm({ isRegister }) {
  const [icon, setIcon] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  const handleChangeIcon = useCallback((nextIcon) => {
    setIcon(nextIcon);
},[]);

  const handleNameChange = useCallback((e) => {
    setName(e.target.value)
  }, [])

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const handlePasswordChange = useCallback((e) => {
    setPassword(e.target.value)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isRegister) {
      const formData = new FormData();
      formData.append('icon', icon);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      const res = await axios.post('/api/register', formData)
      if (res.status === 200) {
        router.push('/login')
      } else if (res.status === 419) {
        createCsrfCookie()
      } else {
        alert('Register failed')
      }
    } else {
      const res = await axios.post('/api/login', { 
        'email' : email,
        'password' : password
      })
      if (res.status === 200) {
        createAuthorizationHeader(res.data.token_type, res.data.access_token)
        router.push('/')
      } else if (res.status === 419) {
        createCsrfCookie()
      } else {
        alert('Login failed')
      }
    }
  }

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <FormImage icon={icon} handleChangeIcon={handleChangeIcon} />
            <FormInput fieldName='name' type='text' value={name} onChange={handleNameChange} required />
          </>
        )}
        <FormInput fieldName='email' type='email' value={email} onChange={handleEmailChange} required />
        <FormInput fieldName='password' type='password' value={password} onChange={handlePasswordChange} required />
        <FormBtn isRegister={isRegister} />
      </form>
    </div>
  )
}
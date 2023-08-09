'use client'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import axios from '../../../libs/axios'
import createCsrfCookie from '../../../utils/create-cookie'
import FormBtn from './FormBtn'
import FormInput from './FromInput'

export default function AuthForm({ isRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()

  useEffect(() => {
    createCsrfCookie()
  }, [])

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
      const res = await axios.post('/api/register', { 
        'name' : name,
        'email' : email,
        'password' : password
      })
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
          <FormInput fieldName='name' type='text' value={name} onChange={handleNameChange} required />
        )}
        <FormInput fieldName='email' type='email' value={email} onChange={handleEmailChange} required />
        <FormInput fieldName='password' type='password' value={password} onChange={handlePasswordChange} required />
        <FormBtn isRegister={isRegister} />
      </form>
    </div>
  )
}
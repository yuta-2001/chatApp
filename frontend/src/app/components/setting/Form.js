"use client"
import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import FormBtn from './FormBtn'
import FormInput from './FormInput'
import FormImage from '../image/FormImage'
import axios from '../../../libs/axios'

import { useUser, useUserUpdate } from '../../../contexts/UserProvider'
import { userInfoToLocalStorage } from '../../../utils/handle-user-setting'

export default function Form() {
  const user = useUser()
  const setUser = useUserUpdate()
  const [userName, setUserName] = useState(user.name)
  const [userIcon, setUserIcon] = useState(user.icon)
  const [userEmail, setUserEmail] = useState(user.email)
  const [userCurrentPassword, setUserCurrentPassword] = useState('')
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userTel, setUserTel] = useState(user.tel)
  const [userCompany, setUserCompany] = useState(user.company)

  const router = useRouter()

  async function updateUser(e) {
    e.preventDefault()
    const user = {
      'name': userName,
      'email': userEmail,
      'current_password': userCurrentPassword,
      'new_password': userNewPassword,
      'tel': userTel,
      'company': userCompany
    }
    const res = await axios.put('/api/users/me', user)
    if (res.status === 200) {
      const user = await axios.get('/api/users/me')
      userInfoToLocalStorage(user.data)
      setUser(user.data)
      router.push('/dashboard')
    }
    if (res.status !== 200) {
      console.log(res.status)
      alert('更新に失敗しました')
    }
  }

  const handleChangeIcon = useCallback((icon) => {
    setUserIcon(icon)
  }, [])

  const handleChangeEmail = useCallback((e) => {
    setUserEmail(e.target.value)
  }, [])

  const handleChangeCurrentPassword = useCallback((e) => {
    setUserCurrentPassword(e.target.value)
  }, [])

  const handleChangeNewPassword = useCallback((e) => {
    setUserNewPassword(e.target.value)
  }, [])

  const handleChangeName = useCallback((e) => {
    setUserName(e.target.value)
  }, [])

  const handleChangeTel = useCallback((e) => {
    setUserTel(e.target.value)
  }, [])

  const handleChangeCompany = useCallback((e) => {
    setUserCompany(e.target.value)
  }, [])

  return (
    <form onSubmit={updateUser}>
      <FormImage handleChangeIcon={handleChangeIcon} icon={userIcon} />
      <FormInput type="email" name="email" id="email" label="Email" value={userEmail} required onChange={handleChangeEmail} />
      <FormInput type="password" name="current_password" id="current_password" label="Current_password" value={userCurrentPassword} onChange={handleChangeCurrentPassword} />
      <FormInput type="password" name="new_password" id="new_password" label="New password" value={userNewPassword} onChange={handleChangeNewPassword} />
      <FormInput type="password_confirm" name="password_confirm" id="password_confirm" label="Confirm password" />
      <FormInput type="text" name="name" id="name" label="Name" value={userName} required onChange={handleChangeName} />
      <div className="grid md:grid-cols-2 md:gap-6">
        <FormInput type="text" name="tel" id="tel" label="Tel" value={userTel} onChange={handleChangeTel} />
        <FormInput type="text" name="company" id="company" label="Company" value={userCompany} onChange={handleChangeCompany} />
      </div>
      <FormBtn />
    </form>
  )
}

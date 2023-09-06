"use client"
import { set, useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from '../../../libs/axios'
import { handleErrorResponse } from '../../../utils/handle-error-response'
import { useToastUpdate } from '../../../contexts/ToastProvider'

export default function SearchPage() {
  const setToast = useToastUpdate();

  const {
    register, 
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({})

  const [user, setUser] = useState('')

  const onSubmit = (data) => {
    axios.get('/api/users', {
      params: {
        email: data.email
      }
    }).then((res) => {
      setUser(res.data)
      if (res.data === '') {
        setToast({
          type: 'warning',
          message: 'No user found.',
        })
      }
    }).catch((err) => {
      handleErrorResponse(err.response, setToast);
    })
  }

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/friend-requests', {
      requested_id: user.id,
    }).then((res) => {
      setToast({
        type: 'success',
        message: 'Request sent.',
      })
      setUser('');
      setValue('email', '');
    }).catch((err) => {
      handleErrorResponse(err.response, setToast);
    })
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setUser('');
    setValue('email', '');
  }


  return (
    <section className="text-gray-600 body-font py-10">
      <div className="container px-5 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <div className="relative flex-grow w-full">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input
                {...register('email', {
                  required: 'Email is required.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address.'
                  }
                })}
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
              />
            </div>
            <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Search</button>
          </div>
          {errors.email && <p className="lg:w-2/3 w-full sm:flex-row flex-col mx-auto mt-2 text-sm text-red-600">{errors.email.message}</p>}
        </form>
        {user && (
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img className="lg:w-1/5 md:w-1/4 w-2/5 mb-8 object-cover object-center rounded-full" alt="hero" src={user.icon} />
            <div className="text-center lg:w-2/3 w-full">
              <h2 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{user.name}</h2>
              <div className="flex justify-center">
                <form onSubmit={handleRequestSubmit}>
                  <button type="submit" className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Reqeust</button>
                  <button onClick={handleCancel} type="button" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
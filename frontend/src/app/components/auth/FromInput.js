'use client'
import { memo } from "react"

const FormInput = memo(({ fieldName, type, register, error }) => {
  return (
    <div>
      <label htmlFor={fieldName} className="block text-sm font-medium leading-6 text-gray-900">{fieldName}</label>
      <div className="mt-2">
        <input
          id={fieldName} 
          name={fieldName} 
          type={type}
          {...register}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
        />
        {error && <p className="mt-2 text-sm text-red-600" id="email-error">{error}</p>}
      </div>
    </div>
  )
});

export default FormInput

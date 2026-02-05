import React from 'react'

interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function InputField({ value, onChange, placeholder = 'Enter Amount' }: InputFieldProps) {
  return (
    <div className='mt-4 border border-border rounded-xl px-4 py-3'>
        <input
          type='text'
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        className="w-full text-sm  !outline-none! focus:outline-none! focus:ring-none!  focus:ring-primary/30"
        />
    </div>
  )
}

'use client'
import Image from 'next/image'
import React, { useState, useRef } from 'react'
import { haptic } from '@/lib/useHaptics'
import { Button } from './button'
import { ChevronDown } from 'lucide-react'

type StatementOption = {
  id: 'mini' | 'custom'
  label: string
  sublabel?: string
}

const statementOptions: StatementOption[] = [
  { id: 'mini', label: 'Mini Statement', sublabel: '( Last 1 Month )' },
  { id: 'custom', label: 'Custom Date Range' },
]

export default function EmailStatements() {
  const [selectedOption, setSelectedOption] = useState<'mini' | 'custom'>('custom')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [showPopup, setShowPopup] = useState(false)
  const fromInputRef = useRef<HTMLInputElement>(null)
  const toInputRef = useRef<HTMLInputElement>(null)

  const handleSelect = (option: 'mini' | 'custom') => {
    haptic('light')
    setSelectedOption(option)
  }

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const handleDatePickerClick = (inputRef: React.RefObject<HTMLInputElement | null>) => {
    if (selectedOption === 'custom' && inputRef.current) {
      inputRef.current.showPicker()
    }
  }

  const handleSendEmail = () => {
    haptic('light')
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    haptic('light')
    setShowPopup(false)
  }

  return (
    <>
      <div className='p-5 border border-border rounded-2xl'>
        <div className='flex items-center gap-2 mb-5'>
          <div className='w-6 h-6 flex items-center justify-center '>
            <Image src='/svg/email-statements.svg' alt='Email Statement' width={20} height={20} className='object-contain size-full' />
          </div>
          <p className='text-text-primary text-md font-medium'>Email Statements</p>
        </div>

        <div className='space-y-5'>
          {statementOptions.map((option, index) => (
            <React.Fragment key={option.id}>
              {index > 0 && <div className='' />}
              <button
                type='button'
                role='radio'
                aria-checked={selectedOption === option.id}
                onClick={() => handleSelect(option.id)}
                className='btn-press w-full flex items-center gap-3 cursor-pointer'
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full border flex items-center justify-center transition-[border-color] duration-200 ease-in-out ${selectedOption === option.id ? 'border-text-primary' : 'border-border'}`}
                >
                  {selectedOption === option.id && (
                    <span className='w-[10px] h-[10px] rounded-full bg-orange' />
                  )}
                </span>
                <span className='text-[14px] text-text-primary'>
                  {option.label} {option.sublabel && <span className='text-text-secondary'>{option.sublabel}</span>}
                </span>
              </button>
            </React.Fragment>
          ))}

          <div className='flex gap-3 mt-2'>
            <div 
              className={`flex-1 relative flex items-center justify-between px-4 py-3 border border-border rounded-lg ${selectedOption === 'custom' ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              onClick={() => handleDatePickerClick(fromInputRef)}
            >
              <span className={`text-sm ${fromDate ? 'text-text-primary' : 'text-text-secondary'}`}>
                {fromDate ? formatDateDisplay(fromDate) : 'From'}
              </span>
              <ChevronDown size={16} className='text-text-secondary' />
              <input
                ref={fromInputRef}
                type='date'
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className='absolute inset-0 opacity-0 pointer-events-none'
                disabled={selectedOption === 'mini'}
              />
            </div>
            <div 
              className={`flex-1 relative flex items-center justify-between px-4 py-3 border border-border rounded-lg ${selectedOption === 'custom' ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
              onClick={() => handleDatePickerClick(toInputRef)}
            >
              <span className={`text-sm ${toDate ? 'text-text-primary' : 'text-text-secondary'}`}>
                {toDate ? formatDateDisplay(toDate) : 'To'}
              </span>
              <ChevronDown size={16} className='text-text-secondary' />
              <input
                ref={toInputRef}
                type='date'
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className='absolute inset-0 opacity-0 pointer-events-none'
                disabled={selectedOption === 'mini'}
              />
            </div>
          </div>

          <Button variant='primary' size='lg' fullWidth onClick={handleSendEmail}>
            Send to Registered Email
          </Button>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className='fixed inset-0 z-50 h-screen flex items-center justify-center bg-black/20'>
          <div className='bg-white/60 backdrop-blur-2xl border-white border rounded-2xl p-6 mx-6 max-w-sm w-full text-center shadow-lg'>
            <p className='text-text-primary text-base mb-6'>
              Your Statement has been emailed to your registered Email ********@gmail.com
            </p>
            <button
              type='button'
              onClick={handleClosePopup}
              className='text-text-primary text-base font-medium py-2 px-8 cursor-pointer'
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

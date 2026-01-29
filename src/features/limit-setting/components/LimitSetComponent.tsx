'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface LimitSetComponentProps {
  title: string
  description: string
  icon: string
  dailyLimit: number
  maxLimit: number
  isEnabled: boolean
  onToggle: (enabled: boolean) => void
  borderBottom?: boolean
}

export default function LimitSetComponent({
  title,
  description,
  icon,
  dailyLimit,
  maxLimit,
  isEnabled: initialEnabled,
  onToggle,
  borderBottom = true,
}: LimitSetComponentProps) {
  const [isEnabled, setIsEnabled] = useState(initialEnabled)

  const formatCurrency = (value: number): string => {
    return value.toLocaleString()
  }

  const handleToggle = () => {
    const newValue = !isEnabled
    setIsEnabled(newValue)
    onToggle(newValue)
  }

  return (
    <div className={`w-full p-4 ${borderBottom ? 'border-b border-text-primary/20 pb-6' : 'border-none'}`}>
      {/* Header Section */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Icon */}
          <div className="w-10 h-10 aspect-square border p-2.5 border-text-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image className='h-full w-full object-contain' src={icon} alt={title} width={20} height={20} />
          </div>
          {/* Text */}
          <div className="flex flex-col min-w-0">
            <h3 className="font-medium text-sm text-text-primary">{title}</h3>
            <p className="text-xs text-text-primary leading-tight">
              {description}
            </p>
          </div>
        </div>
        {/* Toggle */}
        <button
          type="button"
          onClick={handleToggle}
          className={`w-[50px] min-w-[50px] h-6 rounded-full border border-text-primary/10 transition-colors duration-200 flex items-center flex-shrink-0 ${isEnabled ? 'bg-[#F6F7FF]' : 'bg-white'
            }`}
        >
          <div
            className={`w-4 h-4 bg-primary rounded-full shadow-md transform transition-transform duration-200 ${isEnabled ? 'translate-x-6.5' : 'translate-x-1'
              }`}
          />
        </button>
      </div>

      {/* Daily Limit Section */}
      <div className="mt-4 border border-text-primary/20 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-primary/60">Daily Limit</span>
          <span className="text-md font-medium text-text-primary">
            <span className="line-through">N</span> {formatCurrency(dailyLimit)}
          </span>
        </div>
      </div>

      {/* Maximum Limit */}
      <div className="mt-2 text-right">
        <span className="text-xs text-text-primary/60">
          Maximum Limit: <span className="line-through">N</span> {formatCurrency(maxLimit)}
        </span>
      </div>
    </div>
  )
}

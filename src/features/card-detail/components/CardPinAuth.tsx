'use client'

import React, { useState, useCallback } from 'react'
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui'
import Image from 'next/image'

type CardPinAuthProps = {
  title?: string
  cardImageSrc: string
  maskedNumber?: string
  correctPin: string
  onVerified: () => void
}

const PIN_LENGTH = 4

export default function CardPinAuth({
  title = 'Enter PIN for Selected Instacard',
  cardImageSrc,
  maskedNumber = '0000 0000 0000 0000',
  correctPin,
  onVerified,
}: CardPinAuthProps) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  const handleKeyPress = useCallback((key: string) => {
    setError('')
    if (key === 'del') {
      setPin((prev) => prev.slice(0, -1))
      return
    }
    setPin((prev) => {
      if (prev.length >= PIN_LENGTH) return prev
      return `${prev}${key}`
    })
  }, [])

  const handleContinue = () => {
    if (pin === correctPin) {
      onVerified()
    } else {
      setError('Incorrect PIN. Please try again.')
      setPin('')
    }
  }

  const isComplete = pin.length === PIN_LENGTH

  return (
    <SheetContainer>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex-1 flex flex-col items-center gap-4 py-8 overflow-y-auto">
          <p className="text-md text-center text-text-primary">
            {title}
          </p>

          <div className="h-auto w-[70%] relative">
            <Image
              src={cardImageSrc}
              alt="Instacard"
              width={1000}
              height={1000}
              className="h-full w-full object-contain"
              priority
            />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl w-full text-center select-none">
              {maskedNumber}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4">
            <p className="text-md text-center text-text-primary">
              Enter Your PIN
            </p>
            <OTPInput value={pin} maxLength={PIN_LENGTH} />
            <div className="h-4">
              {error && (
                <p className="text-xs text-red-500 text-center">{error}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col items-center gap-3 px-6">
            <Button
              fullWidth
              onClick={handleContinue}
              disabled={!isComplete}
            >
              Continue
            </Button>
            <button
              type="button"
              className="text-xs text-primary bg-transparent border-none cursor-pointer"
            >
              Forgot PIN ?
            </button>
          </div>
        </div>

        <div className="w-full shrink-0 py-4 pb-[calc(env(safe-area-inset-bottom,24px)+16px)]">
          <OTPKeypad onKeyPress={handleKeyPress} />
        </div>
      </div>
    </SheetContainer>
  )
}

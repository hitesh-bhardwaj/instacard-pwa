'use client'

import CardMockup from '@/components/ui/CardMockup'
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui'
import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const PIN_LENGTH = 4

export default function page() {
    const [pin, setPin] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

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
        // TODO: Verify PIN against backend
        console.log('Verifying PIN:', pin)
        router.push('/pin-change/pin-setup')
    }

    const isComplete = pin.length === PIN_LENGTH

    return (
        <div className='h-screen flex flex-col'>
            <SheetContainer>
                <div className="flex-1 flex flex-col h-full overflow-hidden">
                    <div className="flex-1 flex flex-col items-center py-8 overflow-y-auto">
                        <p className='text-text-primary text-center text-sm '>Verify PIN for Selected Instacard</p>
                        <div className="h-auto w-[70%] relative">
                            <CardMockup showActions={false} isclickable={false} />
                        </div>

                        <div className="flex w-full flex-col items-center mt-4 gap-4">
                            <p className='text-text-primary text-center  text-sm '>Please verify your current PIN before setting a new one. </p>
                            <OTPInput
                                value={pin}
                                maxLength={PIN_LENGTH}
                                onChange={setPin}
                            />
                            <div className="h-4">
                                {error && (
                                    <p className="text-xs text-red-500 text-center">{error}</p>
                                )}
                            </div>
                        </div>

                    </div>
                    <div className="w-full flex flex-col items-center gap-3 pb-10 px-6">
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
            </SheetContainer>
        </div>
    )
}

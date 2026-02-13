'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui'
import { routes } from '@/lib/routes'

const MAX_CODE_LENGTH = 6

export default function VerifyEmailPage() {
    const router = useRouter()
    const [code, setCode] = useState('')
    const [isVerifying, setIsVerifying] = useState(false)

    const handleKeyPress = useCallback((key: string) => {
        if (key === 'del') {
            setCode((prev) => prev.slice(0, -1))
            return
        }
        setCode((prev) => {
            if (prev.length >= MAX_CODE_LENGTH) {
                return prev
            }
            return `${prev}${key}`
        })
    }, [])

    const handleContinue = async () => {
        setIsVerifying(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsVerifying(false)
        router.push(routes.addMoneySuccess)
    }

    const handleResend = () => {
        setCode('')
    }

    const isCodeComplete = code.length === MAX_CODE_LENGTH

    return (
        <div className="h-screen flex flex-col">
            <SheetContainer>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col flex-1 items-center justify-center h-full">
                        <div className="p-6 flex-1 py-10 px-5 text-center flex flex-col items-center justify-between gap-2">
                            <h2 className="text-xl font-semibold text-text-primary m-0">
                                Verify your Registered Email
                            </h2>
                            <p className="text-sm text-text-primary m-0">
                                We have sent you a 6-digit code to your Registered Email
                            </p>
                            <p className="text-sm leading-none font-semibold text-text-primary m-0">
                                nird***malik@gmail.com
                            </p>
                            <p className="text-sm text-text-primary m-0">
                                Please check your messages and enter it here
                            </p>

                            <div className="mt-4 mb-5">
                                <OTPInput value={code} maxLength={MAX_CODE_LENGTH} />
                            </div>

                            <Button
                                className="mt-8"
                                fullWidth
                                onClick={handleContinue}
                                disabled={!isCodeComplete || isVerifying}
                            >
                                {isVerifying ? 'Verifying...' : 'Continue'}
                            </Button>

                            <p className="mt-3 text-sm">
                                Didn&apos;t receive the Code?{' '}
                                <button
                                    onClick={handleResend}
                                    className="bg-transparent border-none text-primary font-semibold cursor-pointer p-0 text-sm"
                                    type="button"
                                >
                                    Resend
                                </button>
                            </p>
                            <div className="w-full mt-auto">
                                <OTPKeypad onKeyPress={handleKeyPress} />
                            </div>
                        </div>
                    </div>
                </div>
            </SheetContainer>
        </div>
    )
}

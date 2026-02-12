'use client';

import { SheetContainer, Button } from '@/components/ui'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import OtpInput from '@/components/ui/OtpInput'

export default function OneTimeActivationPage() {
  const [otp, setOtp] = useState<string>('');
  const router = useRouter();
  const isComplete = otp.length === 8;

  return (
    <div className='h-screen flex flex-col'>
      <SheetContainer>
        <div className='flex-1 overflow-auto flex flex-col p-6 pt-10'>
          {/* Header Section */}
          <div className='flex flex-col items-center space-y-2'>
            <h1 className='text-xl leading-[1.2] font-semibold text-text-primary text-center'>
            Enter One-Time Gift Card Activation Code
            </h1>
            
          </div>
          
          {/* Subtitle */}
          <div className='flex justify-center mt-4'>
            <p className='text-sm leading-[1.2] text-text-secondary text-center'>
            *Ask for this code from the person who gifted this Card to you
            </p>
          </div>

          {/* OTP Input Section */}
          <OtpInput
            length={8}
            onChange={(value) => setOtp(value)}
          />

          {/* Spacer to push button to bottom */}
          <div className='flex-1' />

          {/* Submit Button */}
          <div className='flex justify-center pb-6'>
            <Button
              fullWidth
              onClick={() => router.push('/pin-setup?type=gift')}
              disabled={!isComplete}
            >
              Submit
            </Button>
          </div>
        </div>
      </SheetContainer>
    </div>
  )
}
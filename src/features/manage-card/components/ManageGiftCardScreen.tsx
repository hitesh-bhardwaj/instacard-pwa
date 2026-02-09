'use client'
import { SheetContainer } from '@/components/ui'
import Image from 'next/image'

import { useState } from 'react'
import CopyButton from '@/components/ui/CopyButton'
import CardMockup from '@/components/ui/CardMockup'
import { haptic } from '@/lib/useHaptics'

const giftCardDetails = [
  { label: 'Name', value: 'Nirdesh Malik' },
  { label: 'Email', value: 'nirdeshmalik@gmail.com' },
  { label: 'Message', value: 'Gift card for you' },
]

export default function ManageGiftCardScreen() {
  const [showActivationCode, setShowActivationCode] = useState(false)

  return (
    <div className="h-screen flex flex-col">
      <SheetContainer>
        <div className="flex-1 overflow-auto pb-10 p-4 space-y-4">
         <CardMockup imageSrc='/img/gift.png' />

          <div className='w-full rounded-2xl border border-border p-4 space-y-2'>
            {giftCardDetails.map((detail, index) => (
              <div key={index} className='p-4 border border-border rounded-2xl'>
                <p className='text-text-primary text-sm'>{detail.label}</p>
                <p className='text-text-primary font-sm'>{detail.value}</p>
              </div>
            ))}
          </div>
          <div className='w-full flex items-center relative justify-center overflow-hidden rounded-2xl min-h-[180px]'>
            <div className='absolute inset-0'>
              <Image src="/img/giftcardbg.png" alt="Gift Card background" width={340} height={215} className="w-full h-full object-cover rounded-2xl" />
            </div>

            <div className='flex items-center flex-col z-10 justify-center gap-5 py-6'>
              <div className='flex items-center gap-2'>
                <p className='text-orange text-xl font-bold'>DS73488QDJ738</p>
                <CopyButton value="DS73488QDJ738" size="sm" />
              </div>

              <div className='flex items-center gap-4'>
                <div className='h-fit py-4 px-4 flex items-center gap-2 border border-primary rounded-full'>
                  <span className='w-5 h-5 block'>
                    <Image className='object-contain h-full w-full' src="/svg/share.svg" alt="Share" width={20} height={20} />
                  </span>
                  <p className='text-text-primary text-xs font-medium'>Share Gift Card</p>
                </div>
                <div className='h-fit py-4 px-4 flex items-center gap-2 border border-primary rounded-full'>
                  <span className='w-5 h-5 block'>
                    <Image className='object-contain h-full w-full' src="/svg/mail.svg" alt="Download" width={20} height={20} />
                  </span>
                  <p className='text-text-primary text-xs font-medium'>Download Card</p>
                </div>
              </div>
            </div>
          </div>

          <p className='mt-2 font-medium'>One time Activation Code</p>
          <div className='w-full flex items-center justify-between h-fit py-5 px-4 border border-border rounded-2xl'>
            <p className='text-text-primary text-sm font-medium'>
              {showActivationCode ? '4668 4782 3787 78378' : '***** **** **** ****'}
            </p>
            <div className='flex items-center gap-3'>
              <CopyButton value="4668 4782 3787 78378" />
              <Image 
                src={showActivationCode ? '/svg/eyeopen.svg' : '/svg/eyeclose.svg'} 
                alt={showActivationCode ? 'Hide' : 'Show'} 
                width={35} 
                height={35} 
                className='w-5 h-5 text-text-primary cursor-pointer' 
                onClick={() => {
                  haptic('light')
                  setShowActivationCode(!showActivationCode)
                }}
              />
            </div>
          </div>
            <p className='text-text-primary text-sm'>(Please ensure that you are giving the activation code to the person you are gifting this card to. If you share this code with someone you were not looking to gif this card, Instacard  & the Issuer would have no accountability to any exposure that you may encounter against the money you may have loaded)</p>




        </div>
      </SheetContainer>


    </div>
  )
}

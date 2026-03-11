'use client'

import { Button, SheetContainer } from '@/components/ui'
import { notifyCardAdded, notifyNavigation } from '@/lib/bridge'
import { routes } from '@/lib/routes'
import { useCardWalletStore } from '@/store/useCardWalletStore'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function UniversalCardSuccessPage() {
  const router = useRouter()
  const addCard = useCardWalletStore((s) => s.addCard)
  const cardAddedRef = useRef(false)

  useEffect(() => {
    notifyNavigation('add-universal-card-success')

    if (!cardAddedRef.current) {
      cardAddedRef.current = true
      const newCard = addCard('debit')
      notifyCardAdded({
        cardId: newCard.id,
        cardType: newCard.cardType,
        lastFourDigits: newCard.cardNumber.slice(-4),
      })
    }
  }, [addCard])

  const handleDone = () => {
    router.push(routes.instacard)
  }

  return (
    <div className='h-dvh w-full flex flex-col overflow-hidden'>
      <SheetContainer>
        <div className='flex-1 w-full flex flex-col justify-between items-center overflow-auto pt-10 space-y-4 p-6'>
          <div className="w-full flex-1 flex relative flex-col items-center justify-center animate-scale-in">
            <Image
              src={'/img/success.png'}
              alt="Success"
              width={200}
              height={200}
              className="w-[70%] h-auto absolute top-[100px] left-[55%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none"
              priority
            />
            <div className="w-full bg-white/60 flex items-center justify-center gap-2 flex-col border-text-secondary/20 space-y-4 py-6 z-5 relative border rounded-2xl p-4 backdrop-blur-sm text-center mt-4">
              <p className="text-lg font-medium leading-[1.2] text-text-primary">
                Universal Card Added Successfully!
              </p>
              <div className='h-auto w-[100px] flex items-center justify-center rounded-lg overflow-hidden'>
                <Image
                  src='/svg/debitcard.svg'
                  alt='Card'
                  width={40}
                  height={24}
                  className='object-contain h-full w-full'
                />
              </div>
              <p className="text-sm text-text-secondary">
                Your Universal Card has been set up and is ready to use.
              </p>
            </div>
          </div>
        </div>
        <div className='p-4 pb-[max(env(safe-area-inset-bottom),24px)] pt-2'>
          <Button fullWidth onClick={handleDone}>Back to Home</Button>
        </div>
      </SheetContainer>
    </div>
  )
}

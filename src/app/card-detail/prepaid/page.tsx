'use client'

import { SheetContainer } from '@/components/ui'
import CardDetailFlip from '@/components/ui/CardDetailFlip'
import TransactionHistoryItem from '@/components/ui/TransactionHistoryItem'
import React, { useState } from 'react'
import CardPinAuth from '@/features/card-detail/components/CardPinAuth'
import CardMockup from '@/components/ui/CardMockup'

const CORRECT_PIN = '2222'

export default function CardDetailPrepaidPage() {
  const [isVarified, setIsVarified] = useState(false)

  return (
    <>
      {isVarified ? (
        <div className="h-screen flex flex-col">
          {/* <Header title="Card Detail" showBackButton /> */}

          <SheetContainer>
            <div className="flex-1 overflow-auto pb-10">
              {/* <CardDetailFlip /> */}
              <div className='w-full flex items-center pt-5 px-5 justify-center'>
                <CardMockup imageSrc='/img/prepaid.png' />
              </div>

              <div className="text-md p-6 h-[42vh] border-t mt-5 border-text-primary/20 rounded-t-2xl text-text-primary">
                <div className="w-full flex items-center justify-between">
                  <p className="text-md font-medium text-center text-text-primary">
                    Transactions History
                  </p>
                  <p className="text-xs text-center text-text-primary">
                    Pull down to Refresh
                  </p>
                </div>

                <TransactionHistoryItem />
              </div>
            </div>
          </SheetContainer>
        </div>
      ) : (
        <CardPinAuth
          title="Enter PIN for Selected Instacard"
          cardImageSrc="/img/frontside.png"
          maskedNumber="0000 0000 0000 0000"
          correctPin={CORRECT_PIN}
          onVerified={() => setIsVarified(true)}
        />
      )}
    </>
  )
}



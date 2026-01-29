import { Checkbox, Button, SheetContainer, Header } from '@/components/ui'
import CardDetailFlip from '@/components/ui/CardDetailFlip'
import TransactionHistoryItem from '@/components/ui/TransactionHistoryItem'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function carddetail() {
  return (
    <div className="h-screen flex flex-col">
      {/* <Header title="Card Detail" showBackButton /> */}

      <SheetContainer>
        <div className="flex-1 overflow-auto pb-10  ">

          <CardDetailFlip />



          <div className="text-md p-6  h-[42vh] border-t mt-5 border-text-primary/20 rounded-t-2xl text-text-primary">

            <div className='w-full flex items-center justify-between'>
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

        <div className="p-4 pb-[calc(env(safe-area-inset-bottom,24px)+24px)] pt-2">
          <Button fullWidth >
            Apply Now
          </Button>
        </div>
      </SheetContainer>
    </div>
  )
}

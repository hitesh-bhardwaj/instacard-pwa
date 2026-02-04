'use client'

import FAQModal from '@/components/Modal/FAQModal'
import RemoveCardModal from '@/components/Modal/RemoveCardModal'
import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { SheetContainer } from '@/components/ui'
import Image from 'next/image'
import React, { useState } from 'react'

import { cardActions, manageBtns } from '../constants'
import { useManageCardStore } from '../store/useManageCardStore'
import { useRouter } from 'next/navigation'
import { haptic } from '@/lib/useHaptics'

const creditCardDetails = [
  { label: 'Approved Credit Limit', value: '₦ 1,000,000' },
  { label: 'Available Limit', value: '₦ 275,000' },
  { label: 'Total Outstanding', value: '₦ 625,000' },
  { label: 'Unbilled Amount', value: '₦ 1000,000' },
  { label: 'Payment Due Date', value: '16-Aug-2024' },
  { label: 'Payment Status', value: 'Due In 2 Days' },
]

export default function ManageCreditCardScreen() {
  const { isFaqOpen, faqData, openFaq, closeFaq } = useManageCardStore()
  const router = useRouter()
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const handleCardActionClick = (action: typeof cardActions[number]) => {
    if (action.text === 'Remove Card') {
      setShowRemoveModal(true)
    } else {
      router.push(action.route)
      haptic('heavy')
    }
  }

  const handleRemoveCard = () => {
    // TODO: Implement card removal API call
    console.log('Card removed')
    setShowRemoveModal(false)
  }
  return (
    <div className="h-screen flex flex-col">
      <SheetContainer>
        <div className="flex-1 overflow-auto pb-10 p-4 space-y-4">
          <div className="flex items-center pt-5 justify-center">
            <Image
              src="/img/creditmockup.png"
              alt="Debit Card Front"
              width={340}
              height={215}
              className="w-[340px] h-[215px] object-contain"
            />
          </div>

          <div className='w-full rounded-2xl border border-border p-4 space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-text-primary text-sm'>Minimum Payment Due</p>
                <p className='text-text-primary text-xl font-medium'>₦ 62,500.00</p>
              </div>
              <button className='bg-primary text-white px-6 py-3 rounded-full '>
                Pay Now
              </button>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              {creditCardDetails.map((detail, index) => (
                <div key={index} className='px-4 py-3 border border-border rounded-2xl space-y-2 text-center'>
                  <p className='text-text-primary text-xs'>{detail.label}</p>
                  <p className='text-text-primary font-sm'>{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {manageBtns.map((btn, index) => (
              <ManageBtn href={btn.href} key={index} icon={btn.icon} title={btn.title} />
            ))}
          </div>

          <div className="flex w-full gap-2">
            {cardActions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleCardActionClick(action)}
                className="w-full border flex items-start flex-col justify-between border-text-primary/20 gap-4 rounded-xl p-4 cursor-pointer"
              >
                <div className="flex h-[30%] items-center gap-2 w-full justify-between">
                  <div>
                    <div className="w-6 h-auto flex items-center justify-center aspect-square">
                      <Image src={action.icon} alt="icon" className='h-full w-full object-contain' width={24} height={24} />
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      openFaq(action.faqData)
                    }}
                    className="h-6 font-semibold flex items-center justify-center text-white text-md w-6 bg-primary rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="Open FAQ"
                    type="button"
                  >
                    ?
                  </button>
                </div>

                <p className="text-[12px] w-full leading-[1.2]">{action.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SheetContainer>

      <FAQModal visible={isFaqOpen} onClose={closeFaq} data={faqData || undefined} />
      <RemoveCardModal
        visible={showRemoveModal}
        onClose={() => setShowRemoveModal(false)}
        onConfirm={handleRemoveCard}
      />
    </div>
  )
}

'use client'

import FAQModal from '@/components/Modal/FAQModal'
import RemoveCardModal from '@/components/Modal/RemoveCardModal'
import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { SheetContainer } from '@/components/ui'
import Image from 'next/image'
import React, { useState } from 'react'

import { cardActions, getManageBtns } from '../constants'
import { useManageCardStore } from '../store/useManageCardStore'
import { useRouter } from 'next/navigation'
import { haptic } from '@/lib/useHaptics'

export default function ManagePrepaidCardScreen() {
  const { isFaqOpen, faqData, openFaq, closeFaq } = useManageCardStore()
  const router = useRouter()
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const [showBalance, setShowBalance] = useState(false)

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

  const toggleBalance = () => {
    setShowBalance((prev) => !prev)
  }

  return (
    <div className="h-screen flex flex-col">
      <SheetContainer>
        <div className="flex-1 overflow-auto pb-10 p-4 space-y-4">
          <div className="flex items-center pt-5 justify-center relative">
            <Image
              src="/img/prepaid.png"
              alt="Debit Card Front"
              width={340}
              height={215}
              className="w-[340px] h-[215px] object-contain"
            />
       
          </div>

          <div className='w-full flex rounded-xl gap-2 '>
            <div className='flex-1 p-4 py-6  border border-text-primary/20 rounded-2xl  flex flex-col gap-4'>
              <p className='text-text-primary text-sm'>Wallet Account</p>
              <p className='text-text-primary font-medium'>12344567890</p>
            </div>
            <div className='flex-1 p-4 py-6 flex flex-col gap-4 border border-text-primary/20 rounded-2xl'>
              <p className='text-text-primary text-sm'>Balance</p>
              <div className='flex items-center justify-between gap-2'>
                <p className='text-text-primary font-medium'>
                  <span className='line-through mr-2'>N </span>
                  {showBalance ? '50,000.00' : '********'}
                </p>
                <button className='w-6 h-6 flex items-center justify-center' type='button' aria-label='Toggle balance visibility' onClick={toggleBalance}>
                  <Image className='h-full w-full object-contain' src={showBalance ? '/svg/eyeopen.svg' : '/svg/eyeclose.svg'} alt={showBalance ? 'Show' : 'Hide'} width={16} height={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto">
            {getManageBtns('prepaid').map((btn, index) => (
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

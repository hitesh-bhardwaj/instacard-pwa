'use client'

import FAQModal from '@/components/Modal/FAQModal'
import RemoveCardModal from '@/components/Modal/RemoveCardModal'
import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { SheetContainer } from '@/components/ui'
import FaqIconButton from '@/components/ui/FaqIconButton'
import Image from 'next/image'
import React, { useState } from 'react'

import { cardActions, getManageBtns } from '../constants'
import { useManageCardStore } from '../store/useManageCardStore'
import { useRouter } from 'next/navigation'
import { haptic } from '@/lib/useHaptics'
import Link from 'next/link'
import { Clock, Eye, Link2, Settings } from 'lucide-react'

const creditCardDetails = [
  { label: 'Approved Credit Limit', value: '₦ 1,000,000' },
  { label: 'Available Limit', value: '₦ 275,000' },
  { label: 'Minimum Payment Due', value: '₦ 62,500' },
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
        <div className="flex-1 overflow-auto p-4 py-10 space-y-4">
          <div className="flex h-fit w-fit relative items-center justify-center">
            <Image
              src="/img/planecard2.png"
              alt="Debit Card Front"
              width={340}
              height={215}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-between py-5 px-6">
              <div className='space-y-1'>
                <p className="text-white/80 text-left text-sm">Total Outstanding</p>
                <p className="text-white text-3xl font-bold tracking-tight">₦ 62,500.00</p>
                <div className="inline-flex items-center gap-1.5 bg-orange-500/25 text-orange-300 px-3 py-1.5 rounded-full mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <p className="text-xs font-semibold">Due In 2 Days</p>
                </div>
              </div>
              <div className='flex items-center justify-between gap-4 w-full'>
                <Link href='/make-repayments' className='bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors'>
                  Pay Now
                </Link>
                <div className='flex items-center gap-4'>
                  <button className='w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex flex-col items-center justify-center hover:bg-white/30 transition-colors'>
                    <Link2 className="w-5 h-5 text-white" />
                  </button>
                  <button className='w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex flex-col items-center justify-center hover:bg-white/30 transition-colors'>
                    <Eye className="w-5 h-5 text-white" />
                  </button>
                  <button className='w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex flex-col items-center justify-center hover:bg-white/30 transition-colors'>
                    <Settings className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>


          </div>

          <div className='w-full space-y-4'>

            <div className='grid grid-cols-2 gap-2'>
              
              {creditCardDetails.map((detail, index) => (
                <div key={index} className='px-4 py-3 border border-border rounded-2xl space-y-2 text-center'>
                  <p className='text-text-primary text-xs'>{detail.label}</p>
                  <p className='text-text-primary font-sm'>{detail.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4    overflow-x-auto   ">
            {getManageBtns('credit').map((btn, index) => (
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
                  <FaqIconButton
                    onClick={(e) => {
                      e.stopPropagation()
                      openFaq(action.faqData)
                    }}
                  />
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

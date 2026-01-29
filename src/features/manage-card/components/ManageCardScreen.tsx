'use client'

import FAQModal from '@/components/Modal/FAQModal'
import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { SheetContainer } from '@/components/ui'
import Image from 'next/image'
import React from 'react'

import { cardActions, manageBtns } from '../constants'
import { useManageCardStore } from '../store/useManageCardStore'

export default function ManageCardScreen() {
  const { isFaqOpen, faqData, openFaq, closeFaq } = useManageCardStore()

  return (
    <div className="h-screen flex flex-col">
      <SheetContainer>
        <div className="flex-1 overflow-auto pb-10 p-4 space-y-4">
          <div className="flex items-center pt-5 justify-center">
            <Image
              src="/img/frontside.png"
              alt="Debit Card Front"
              width={340}
              height={215}
              className="w-[340px] h-[215px] object-contain"
            />
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
                className="w-full border flex items-start flex-col justify-between border-text-primary/20 gap-4 rounded-xl p-4"
              >
                <div className="flex h-[30%] items-center gap-2 w-full justify-between">
                  <div>
                    <div className="w-4 h-auto flex items-center justify-center aspect-square">
                      <Image src={action.icon} alt="icon" width={24} height={24} />
                    </div>
                  </div>
                  <button
                    onClick={() => openFaq(action.faqData)}
                    className="h-6 font-semibold flex items-center justify-center text-white text-md w-6 bg-primary rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                    aria-label="Open FAQ"
                    type="button"
                  >
                    ?
                  </button>
                </div>

                <p className="text-[12px] h-[70%] w-full leading-[1.2]">{action.text}</p>
              </div>
            ))}
          </div>
        </div>
      </SheetContainer>

      <FAQModal visible={isFaqOpen} onClose={closeFaq} data={faqData || undefined} />
    </div>
  )
}


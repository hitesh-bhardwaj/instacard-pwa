'use client'
import { useState } from 'react'
import { Checkbox, SheetContainer } from '@/components/ui'
import CardMockup from '@/components/ui/CardMockup'
import { ChevronRight } from 'lucide-react'
import { AddMoneyForm } from '@/components/AddMoney/AddMoneyForm'

export default function page() {
    const [agreed, setAgreed] = useState(false)
    const [amount, setAmount] = useState('')

    return (
        <div className='h-screen flex flex-col'>
            <SheetContainer>
                <div className="flex-1 overflow-auto pb-10 p-4 space-y-4">
                    <p className='text-text-primary text-sm pt-5 translate-y-5 ml-4'>Your Instacard Gift Card is Ready for Activation.</p>
                    <CardMockup />
                    <div className='text-sm'>

                        <p className='ml-1'>KYC Tier : <span className='text-orange font-medium'>KYC Level 1</span></p>
                        <p className='ml-1'>Max Daily Transaction Limit: <span className='text-orange font-medium'><span className='line-through'>N </span>100,000 </span></p>
                        <p className='ml-1'>Max Daily Transaction Limit : <span className='text-orange font-medium'><span className='line-through'>N </span> 100,000: </span></p>

                    </div>


                    <div className='border border-border rounded-2xl p-4'>
                        <p className='text-text-primary text-sm'>Details of the Person you are Gifting this Virtual Instacard to</p>
                        <div>


                            <p className='text-text-primary text-xs py-4'>Name of the person gifting this card to</p>
                            <p className='text-text-primary text-xs border-t border-b border-border py-4'>Email of the person gifting this card to</p>
                            <p className='text-text-primary text-xs py-4'>Type a Message for the person you are gifting this card to..</p>
                        </div>
                    </div>

                    <div className='border border-border rounded-2xl p-4 flex items-center justify-between'>
                        <p className='text-text-primary text-md font-medium'>Read Terms & Conditions</p>
                        <ChevronRight className='w-5 h-5 text-text-primary' />
                    </div>
                    <Checkbox label='I agree the above terms & conditions. Please Debit the Card Issuance Fee to any of my bank accounts to issue this Instacard' checked={agreed} onChange={setAgreed} />

                   <AddMoneyForm 
                       showKycTier={false} 
                       amount={amount}
                       onAmountChange={setAmount}
                       onSelectRecommended={setAmount}
                       onOpenModal={() => {}}
                       btnTitle='Proceed to Add Money'
                   />

                </div>
            </SheetContainer>
        </div>
    )
}

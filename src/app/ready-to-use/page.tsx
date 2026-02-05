'use client'
import { useState } from 'react'
import { Button, SheetContainer } from '@/components/ui'
import Image from 'next/image'

import { Copy } from 'lucide-react'
import CardMockup from '@/components/ui/CardMockup'

const giftCardDetails = [
    { label: 'Name', value: 'Nirdesh Malik' },
    { label: 'Email', value: 'nirdeshmalik@gmail.com' },
    { label: 'Message', value: 'Gift card for you' },
]

export default function page() {
    const [showBalance, setShowBalance] = useState(false)

    const toggleBalance = () => {
        setShowBalance(!showBalance)
    }

    return (
        <div className="h-screen flex flex-col">
            <SheetContainer>
                <div className="flex-1 overflow-auto h-fit pb-10 p-4 space-y-4">
                    <CardMockup />

                    <div className='w-full rounded-2xl space-y-2'>
                        {giftCardDetails.map((detail, index) => (
                            <div key={index} className='p-4 border border-border rounded-2xl'>
                                <p className='text-text-primary text-sm'>{detail.label}</p>
                                <p className='text-text-primary font-sm'>{detail.value}</p>
                            </div>
                        ))}
                    </div>
                    <span className='h-px w-[90%] mx-auto bg-border block my-5'></span>
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
                    <div className='text-sm'>

                        <p className='ml-1'>KYC Tier : <span className='text-orange font-medium'>KYC Level 1</span></p>
                        <p className='ml-1'>Max Daily Transaction Limit: <span className='text-orange font-medium'><span className='line-through'>N </span>100,000 </span></p>

                    </div>
                    <div className='mt-2 w-full'>

                        <Button fullWidth variant='primary' size='md'>
                            Proceed to Gift this Card
                        </Button>
                    </div>
                </div>
            </SheetContainer>


        </div>
    )
}

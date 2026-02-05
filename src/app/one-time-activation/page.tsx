import { SheetContainer } from '@/components/ui'
import CardMockup from '@/components/ui/CardMockup'
import { Copy } from 'lucide-react'
import React from 'react'

export default function page() {
    return (
        <div className='h-screen flex flex-col'>
            <SheetContainer>
                <div className="flex-1 overflow-auto pb-10 p-4 space-y-2">
                    <CardMockup imageSrc='/img/gift.png' />
                    <p className='text-text-primary text-lg ml-1 mt-4'>One time Activation Code</p>
                    <div className='p-4 border flex items-center justify-between border-border my-4 rounded-2xl'>
                        <p className='text-text-primary text-md font-medium'>4668-4782-3787-78378</p>
                        <Copy className='w-4 h-4 text-text-primary cursor-pointer' />
                    </div>
                    <p className='text-text-primary text-sm '>(Please ensure that you are giving the activation code to the person you are gifting this card to. If you share this code with someone you were not looking to gif this card, Instacard  & the Issuer would have no accountability to any exposure that you may encounter against the money you may have loaded)</p>
                </div>
            </SheetContainer>
        </div>
    )
}

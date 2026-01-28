import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { Checkbox, Button, SheetContainer, Header } from '@/components/ui'
import CardDetailFlip from '@/components/ui/CardDetailFlip'
import TransactionHistoryItem from '@/components/ui/TransactionHistoryItem'
import { BadgeQuestionMark, CircleQuestionMark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const manageBtns = [
    { icon: '/svg/limitations.svg', title: 'Limit Setting' },
    { icon: '/svg/pin.svg', title: 'PIN Change' },
    { icon: '/svg/block.svg', title: 'Block/Unblock Card' },
]

const cardActions = [
    { icon: '/svg/phone.svg', text: 'Link to a Physical Universal or Sigma Instacard' },
    { icon: '/svg/del.svg', text: 'Remove Card' },
]

export default function carddetail() {
    return (
        <div className="h-screen flex flex-col">
            {/* <Header title="Card Detail" showBackButton /> */}

            <SheetContainer>
                <div className="flex-1 overflow-auto pb-10 p-4 space-y-4 ">
                    <div className='flex items-center justify-center '>

                        <Image src={'/img/frontside.png'} alt='Debit Card Front' width={340} height={215} className='w-[340px] h-[215px] object-contain' />
                    </div>


                    <div className='flex  gap-2'>
                        {manageBtns.map((btn, index) => (
                            <ManageBtn key={index} icon={btn.icon} title={btn.title} />
                        ))}
                    </div>

                    <div className='flex w-full gap-2'>
                        {cardActions.map((action, index) => (
                            <div key={index} className='w-full border flex items-start flex-col justify-between border-text-primary/20 gap-4 rounded-xl p-4'>
                                <div className='flex h-[30%] items-center gap-2 w-full justify-between'>

                                    <div>
                                        <div className='w-4 h-auto flex items-center justify-center aspect-square'>
                                            <Image src={action.icon} alt='icon' width={24} height={24} />
                                        </div>
                                    </div>
                                    <div className='h-6  font-semibold flex items-center justify-center text-white text-md w-6 bg-primary rounded-full'>
                                        <p>?</p>
                                    </div>
                                </div>

                                <p className='text-[12px] h-[70%] w-full leading-[1.2]'>{action.text}</p>
                            </div>
                        ))}
                    </div>



                </div>

            </SheetContainer>
        </div>
    )
}

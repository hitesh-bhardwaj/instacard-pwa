'use client'

import ManageBtn from '@/components/ManageBtns/ManageBtn'
import { Checkbox, Button, SheetContainer, Header } from '@/components/ui'
import CardDetailFlip from '@/components/ui/CardDetailFlip'
import TransactionHistoryItem from '@/components/ui/TransactionHistoryItem'
import { BadgeQuestionMark, CircleQuestionMark } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'


export default function CardStatus() {
    const [isUnblocked, setIsUnblocked] = useState(true)
    const [showBlockModal, setShowBlockModal] = useState(false)

    const handleToggle = () => {
        if (isUnblocked) {
            // Show confirmation modal when trying to block
            setShowBlockModal(true)
        } else {
            // Directly unblock
            setIsUnblocked(true)
        }
    }

    const confirmBlock = () => {
        setIsUnblocked(false)
        setShowBlockModal(false)
    }

    return (
        <div className="h-screen flex flex-col">
            <Header title="Card Status" showBackButton />

            <SheetContainer>
                <div className="flex-1 overflow-auto pb-10 p-4 space-y-4 ">
                    <div className='flex items-center justify-center '>

                        <Image src={'/img/frontside.png'} alt='Debit Card Front' width={340} height={215} className='w-[340px] h-[215px] object-contain' />
                    </div>

                    <div className='flex items-center justify-between p-4 border border-gray-300 rounded-xl bg-white'>
                        <span className='text-gray-800 font-medium'>Card Status</span>
                        <div className='flex items-center gap-2'>
                            <span className={`text-sm block font-medium `}>
                                {isUnblocked ? 'Unblocked' : 'Blocked'}
                            </span>
                            <button
                                onClick={handleToggle}
                                className={`relative w-12 h-6 rounded-full border border-text-primary/10 transition-colors duration-200 g-primary/30'}`}
                            >
                                <span
                                    className={`absolute top-1 w-4 h-4 bg-primary rounded-full shadow transition-transform duration-200 ${isUnblocked ? '-translate-x-5' : 'translate-x-1'}`}
                                />
                            </button>
                        </div>
                    </div>

                </div>

            </SheetContainer>

            {/* Block Confirmation Modal */}
            {showBlockModal && (
                <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
                    <div className='bg-white w-full backdrop-blur-lg rounded-2xl p-6 border border-text-primary/50 mx-4 space-y-4'>
                        <p className='text-center text-gray-800 font-medium'>
                            Are you sure you want to block this Card?
                        </p>
                        <div className='flex flex-col space-y-2 w-full'>
                            <Button
                                onClick={confirmBlock}
                                className='w-full bg-error text-white rounded-full py-3'
                            >
                                OK
                            </Button>
                            <Button
                                onClick={() => setShowBlockModal(false)}
                                variant='secondary'
                                className='w-full border border-gray-300 text-gray-800 rounded-full py-3 bg-white hover:bg-gray-100'
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

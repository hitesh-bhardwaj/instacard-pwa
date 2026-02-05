'use client'
import Image from 'next/image'
import { useCallback, useState } from 'react'

export default function Balance() {
    const [showBalance, setShowBalance] = useState(false)

    const toggleBalance = useCallback(() => setShowBalance((p) => !p), [])

    return (
        <div className='w-full  flex rounded-xl gap-2 '>
            <div className='flex-1 p-4 py-6  border border-text-primary/20 rounded-2xl  flex flex-col gap-4'>
                <p className='text-text-primary text-sm'>Prepaid Account</p>
                <p className='text-text-primary font-medium'>12344567890</p>
            </div>
            <div className='flex-1 p-4 py-6 flex flex-col gap-4 border border-text-primary/20 rounded-2xl'>
                <p className='text-text-primary text-sm'>Balance</p>
                <div className='flex items-center justify-start gap-2'>
                    <p className='text-text-primary flex items-center gap-2 font-medium'>
                        <span className='line-through mr-2'>N</span>
                        {showBalance ? '2,500' : '********'}
                    </p>
                    <button className='w-6 h-6 flex items-center justify-center' type='button' aria-label='Toggle balance visibility' onClick={toggleBalance}>
                        <Image className='h-full w-full object-contain' src={showBalance ? '/svg/eyeopen.svg' : '/svg/eyeclose.svg'} alt={showBalance ? 'Show' : 'Hide'} width={16} height={16} />
                    </button>
                </div>

            </div>
        </div>
    )
}

import Image from 'next/image'
import React from 'react'

export default function ManageBtn({icon, title}: {icon: string, title: string}) {
    return (
        <div className='px-2 py-3 flex flex-col items-center w-full justify-center gap-2 rounded-xl bg-[#F6F7FF]'>

            <div className='h-6 w-6 flex items-center justify-center aspect-square '>
                <Image src={icon} alt={title} width={28} height={28} />
            </div>
            <p className='text-text-primary text-[10px]  w-full text-center font-medium'>{title}</p>
        </div>
    )
}

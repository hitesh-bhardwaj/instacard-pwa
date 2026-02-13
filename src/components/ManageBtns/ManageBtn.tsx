import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ManageBtn({icon, title, href,fullWidth = false}: {icon: string, title: string, href: string,fullWidth?: boolean}) {
    return (
        <Link href={href} className={`px-2 py-5 ${fullWidth ? 'w-[48%]' : 'w-[30vw] shrink-0'} h-[110px] flex flex-col items-center justify-center rounded-xl bg-background2`}>

            <div className={`${fullWidth ? 'h-6 w-6' : 'h-6 w-6'} flex items-center justify-center shrink-0`}>
                <Image src={icon} alt={title} width={28} height={28} className='h-full w-full object-contain' />
            </div>
            <p className='text-text-primary text-xs mt-4 w-[80%] text-center line-clamp-2'>{title}</p>
        </Link>
    )
}

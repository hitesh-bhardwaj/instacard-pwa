import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ManageBtn({icon, title, href}: {icon: string, title: string, href: string}) {
    return (
        <Link href={href} className='px-2 py-5 shrink-0 min-w-[25vw] flex flex-col items-center justify-center gap-2 rounded-xl bg-background2'>

            <div className='h-6 w-6 flex items-center justify-center aspect-square '>
                <Image src={icon} alt={title} width={28} height={28} />
            </div>
            <p className='text-text-primary text-[12px]  w-full text-center '>{title}</p>
        </Link>
    )
}

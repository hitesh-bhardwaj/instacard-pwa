import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ManageBtn({icon, title, href,fullWidth = false}: {icon: string, title: string, href: string,fullWidth?: boolean}) {
    return (
        <Link href={href} className={`px-2 py-5  ${fullWidth ? 'min-w-[48%] ' : 'min-w-[25vw] shrink-0'} flex flex-col items-center justify-center  rounded-xl bg-background2`}>

            <div className={`${fullWidth ? 'h-5 w-5' : 'h-6 w-6'} flex items-center justify-center aspect-square `}>
                <Image src={icon} alt={title} width={28} height={28} className='' />
            </div>
            <p className='text-text-primary text-xs mt-4  w-full text-center '>{title}</p>
        </Link>
    )
}

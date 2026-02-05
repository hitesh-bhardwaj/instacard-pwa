import Image from 'next/image'
import React from 'react'

type CardMockupProps = {
    imageSrc?: string
    maskedNumber?: string
}

export default function CardMockup({ 
    imageSrc = '/img/frontside.png', 
    maskedNumber = '0000 0000 0000 0000' 
}: CardMockupProps) {
    return (
        <div className="flex relative items-center pt-5 justify-center">
            <Image src={imageSrc} alt="Debit Card Front" width={340} height={215} className="w-[340px] h-[215px] object-contain" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl w-full text-center select-none">
                {maskedNumber}
            </p>
        </div>
    )
}

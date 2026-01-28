'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

export default function CardDetailFlip() {
    const cardRef = useRef<HTMLDivElement>(null)
    const balanceRef = useRef<HTMLParagraphElement>(null)
    const timerRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<SVGCircleElement>(null)
    const timerTextRef = useRef<HTMLSpanElement>(null)
    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
    const frontSideRef = useRef<HTMLDivElement>(null)
    const backSideRef = useRef<HTMLDivElement>(null)
    const frontContentRef = useRef<HTMLDivElement>(null)
    const backContentRef = useRef<HTMLDivElement>(null)

    const [isFlipped, setIsFlipped] = useState(false)
    const [isBalanceVisible, setIsBalanceVisible] = useState(false)
    const [timeLeft, setTimeLeft] = useState(10)

    const TIMER_DURATION = 180
    const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 16

    const formatTime = (seconds: number) => {
        if (seconds >= 60) {
            const mins = Math.floor(seconds / 60)
            const secs = seconds % 60
            return `${mins}:${String(secs).padStart(2, '0')}`
        }
        return `0:${String(seconds).padStart(2, '0')}`
    }

    const startTimer = () => {
        setTimeLeft(TIMER_DURATION)

        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
        }

        // Animate the progress circle
        if (progressRef.current) {
            gsap.fromTo(progressRef.current,
                { strokeDashoffset: 0 },
                {
                    strokeDashoffset: CIRCLE_CIRCUMFERENCE,
                    duration: TIMER_DURATION,
                    ease: 'linear'
                }
            )
        }

        // Animate timer appearance
        if (timerRef.current) {
            gsap.fromTo(timerRef.current,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
            )
        }

        timerIntervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    if (timerIntervalRef.current) {
                        clearInterval(timerIntervalRef.current)
                    }
                    // Auto flip back
                    setTimeout(() => {
                        flipCard(false)
                    }, 100)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const stopTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current)
            timerIntervalRef.current = null
        }
        if (progressRef.current) {
            gsap.killTweensOf(progressRef.current)
        }
    }

    const flipCard = (toFlipped: boolean) => {
        if (!cardRef.current) return

        // Animate content visibility with GSAP
        if (toFlipped) {
            // Fading out front content, fading in back content
            if (frontContentRef.current) {
                gsap.to(frontContentRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        if (frontContentRef.current) {
                            frontContentRef.current.style.visibility = 'hidden'
                        }
                    }
                })
            }
            if (backContentRef.current) {
                backContentRef.current.style.visibility = 'visible'
                gsap.fromTo(backContentRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, delay: 0.3, ease: 'power2.inOut' }
                )
            }
        } else {
            // Fading out back content, fading in front content
            if (backContentRef.current) {
                gsap.to(backContentRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        if (backContentRef.current) {
                            backContentRef.current.style.visibility = 'hidden'
                        }
                    }
                })
            }
            if (frontContentRef.current) {
                frontContentRef.current.style.visibility = 'visible'
                gsap.fromTo(frontContentRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.3, delay: 0.3, ease: 'power2.inOut' }
                )
            }
        }

        gsap.to(cardRef.current, {
            rotateY: toFlipped ? 180 : 0,
            duration: 0.6,
            ease: 'power2.inOut',
        })

        setIsFlipped(toFlipped)

        if (toFlipped) {
            startTimer()
        } else {
            stopTimer()
        }
    }

    const handleFlip = () => {
        flipCard(!isFlipped)
    }

    const handleEyeClick = (e: React.MouseEvent) => {
        e.stopPropagation()

        if (balanceRef.current) {
            gsap.to(balanceRef.current, {
                opacity: 0,
                scale: 0.8,
                duration: 0.15,
                ease: 'power2.in',
                onComplete: () => {
                    setIsBalanceVisible(!isBalanceVisible)
                    gsap.to(balanceRef.current, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.15,
                        ease: 'power2.out',
                    })
                }
            })
        } else {
            setIsBalanceVisible(!isBalanceVisible)
        }
    }

    useEffect(() => {
        // Initialize back content as hidden
        if (backContentRef.current) {
            backContentRef.current.style.visibility = 'hidden'
            backContentRef.current.style.opacity = '0'
        }
        return () => {
            if (timerIntervalRef.current) {
                clearInterval(timerIntervalRef.current)
            }
        }
    }, [])

    return (
        <>

            <div
                className="mt-2 w-full flex items-center justify-center pt-6  mx-auto relative rounded-2xl cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={handleFlip}
            >
                <div
                    ref={cardRef}
                    className="w-[340px] h-[215px] relative"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front Side */}
                    <div
                        ref={frontSideRef}
                        className="absolute inset-0 w-[340px] h-[215px]"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                        }}
                    >
                        <div ref={frontContentRef}>
                            <div className='h-fit w-fit absolute bottom-[32px] z-10 text-white right-[34px]'>
                                <p className='text-sm'>Nirdesh Malik</p>
                            </div>
                            <div className='h-fit w-fit flex items-center gap-[17px] absolute top-[97px] -translate-x-1/2 -translate-y-1/2 z-10 text-white left-1/2'>
                                <p ref={balanceRef} className='text-2xl font-semibold'>
                                    <span className='line-through'>N</span>
                                    {isBalanceVisible ? '1234' : '****'}
                                </p>
                                <button onClick={handleEyeClick} className='p-[7px] transition-transform duration-200 hover:scale-110 active:scale-95'>
                                    {isBalanceVisible ? (
                                        <EyeOffIcon className='w-5 h-5' />
                                    ) : (
                                        <EyeIcon className='w-5 h-5' />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Image src={'/img/frontside.png'} alt='Debit Card Front' width={340} height={215} className='w-[340px] h-[215px] object-contain' />
                    </div>

                    {/* Back Side */}
                    <div
                        ref={backSideRef}
                        className="absolute inset-0 w-[340px] h-[215px]"
                        style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <div ref={backContentRef} className="absolute inset-0 w-[340px] h-[215px] z-10">
                            <div className="flex flex-col h-full w-full p-[27px]">
                                {/* Card Number - Center */}
                                <div className="flex-1 pt-[20px] flex items-center justify-center">
                                    <p className='text-xl text-white text-center'>
                                        0000 0000 0000 0000
                                    </p>
                                </div>

                                {/* Bottom Section */}
                                <div className="flex items-end justify-between">
                                    {/* Valid Till - Left */}
                                    <div className='text-white h-fit'>
                                        <p className='text-xs font-semibold mb-[4px]' >VALID TILL</p>
                                        <div className='flex items-center gap-[4px]'>
                                            <p className='text-sm font-semibold'>MM</p>
                                            <p className='text-sm font-semibold'>YY</p>
                                        </div>
                                        <div className='flex items-center gap-[4px]'>
                                            <p className='text-sm font-semibold'>05</p>
                                            <p className='text-sm font-semibold'>35</p>
                                        </div>
                                    </div>

                                    {/* Timer Component - Right */}
                                    <div
                                        ref={timerRef}
                                        className='w-[40px] h-[40px]  flex items-center justify-center'
                                    >
                                        <svg
                                            className="w-full h-full -rotate-90"
                                            viewBox="0 0 40 40"
                                        >
                                            {/* Background circle */}
                                            <circle
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                fill="transparent"
                                                strokeWidth="3"
                                            />
                                            {/* Progress circle */}
                                            <circle
                                                ref={progressRef}
                                                cx="20"
                                                cy="20"
                                                r="16"
                                                fill="transparent"
                                                stroke="white"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeDasharray={CIRCLE_CIRCUMFERENCE}
                                                strokeDashoffset={0}
                                            />
                                        </svg>
                                        {/* Timer text */}
                                        <span
                                            ref={timerTextRef}
                                            className="absolute text-white text-[8px] font-semibold"
                                        >
                                            {formatTime(timeLeft)}
                                        </span>
                                    </div>

                                    {/* CVV - Center */}
                                    <div className='text-text-primary absolute bottom-[35px] z-10 right-[85px]'>
                                        <p className='text-sm font-semibold'>053</p>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <Image src={'/img/backside.png'} alt='Debit Card Back' width={340} height={215} className='w-[340px] h-[215px] object-contain' />
                    </div>
                </div>
            </div>
            <p className="text-sm text-center delay-200 duration-300 transition-all text-text-primary">
                {!isFlipped ? 'Tap to view details' : 'This Dynamic CVV is valid for maximum 3 minutes.'}
            </p>

        </>

    )
}

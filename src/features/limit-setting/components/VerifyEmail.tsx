'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui';
import { notifyNavigation } from '@/lib/bridge';
import gsap from 'gsap';

const MAX_CODE_LENGTH = 6;

export default function VerifyEmailScreen() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const popupOverlayRef = useRef<HTMLDivElement>(null);
    const popupContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        notifyNavigation('verify-email');
    }, []);

    useEffect(() => {
        if (showSuccessPopup) {
            // Animate in
            gsap.fromTo(
                popupOverlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(
                popupContentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out', delay: 0.1 }
            );
        }
    }, [showSuccessPopup]);

    const handleKeyPress = useCallback((key: string) => {
        if (key === 'del') {
            setCode((prev) => prev.slice(0, -1));
            return;
        }
        setCode((prev) => {
            if (prev.length >= MAX_CODE_LENGTH) {
                return prev;
            }
            return `${prev}${key}`;
        });
    }, []);

    const handleContinue = async () => {
        setIsVerifying(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsVerifying(false);
        setShowSuccessPopup(true);
    };

    const handleResend = () => {
        setCode('');
        // TODO: Implement resend OTP API call
    };

    const handlePopupOk = () => {
        // Animate out
        gsap.to(popupContentRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
        });
        gsap.to(popupOverlayRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            delay: 0.1,
            onComplete: () => {
                setShowSuccessPopup(false);
                router.push('/limit-setting');
            },
        });
    };

    const isCodeComplete = code.length === MAX_CODE_LENGTH;

    return (
        <div className="h-screen flex flex-col">
            {/* <Header title="Verify Phone" showBackButton onBack={handleBack} /> */}

            <SheetContainer>
                <div className="flex-1 flex flex-col">
                    <div className='flex flex-col flex-1 items-center justify-center h-full'>

                        <div className="p-6 flex-1 py-10 px-5 text-center flex flex-col items-center  justify-between gap-2">
                            <h2 className="text-xl font-semibold text-text-primary m-0">
                                Verify your Registered Email
                            </h2>
                            <p className="text-[13px] text-text-primary m-0">
                                We have sent you a 6-digit code to your Registered Email
                            </p>
                            <p className="text-md leading-none font-semibold text-text-primary m-0">
                                ******@gmail.com
                            </p>
                            <p className="text-[13px] text-text-primary m-0">
                                Please check your messages and enter it here
                            </p>

                            <div className="mt-4 mb-5">
                                <OTPInput value={code} maxLength={MAX_CODE_LENGTH} />
                            </div>

                            <Button
                                className="mt-8"
                                fullWidth
                                onClick={handleContinue}
                                disabled={!isCodeComplete || isVerifying}
                            >
                                {isVerifying ? 'Verifying...' : 'Continue'}
                            </Button>

                            <p className="mt-3 text-sm ">
                                Didn&apos;t receive the Code?{' '}
                                <button
                                    onClick={handleResend}
                                    className="bg-transparent border-none text-primary font-semibold cursor-pointer p-0 text-sm"
                                    type="button"
                                >
                                    Resend
                                </button>
                            </p>
                        <div className="w-full mt-auto">
                            <OTPKeypad onKeyPress={handleKeyPress} />
                        </div>
                        </div>

                    </div>

                </div>
            </SheetContainer>

            {/* Success Popup */}
            {showSuccessPopup && (
                <div
                    ref={popupOverlayRef}
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
                    style={{ opacity: 0 }}
                >
                    <div
                        ref={popupContentRef}
                        className="bg-white/80 backdrop-blur-xl  rounded-2xl p-6 mx-8 text-center border border-white/60 min-w-[280px]"
                        style={{ opacity: 0 }}
                    >
                        <p className="text-text-primary text-xm mb-6">
                            Your Payment Limits have been successfully updated
                        </p>
                        <button
                            onClick={handlePopupOk}
                            className="w-full py-3 rounded-full text-text-primary font-medium cursor-pointer border-none"
                            type="button"
                        >
                            Ok
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

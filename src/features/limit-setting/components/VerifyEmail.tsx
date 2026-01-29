'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { SheetContainer, OTPInput, OTPKeypad, Button } from '@/components/ui';
import { notifyNavigation } from '@/lib/bridge';

const MAX_CODE_LENGTH = 6;

export default function VerifyEmailScreen() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    useEffect(() => {
        notifyNavigation('verify-email');
    }, []);

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
        setShowSuccessPopup(false);
        router.push('/limit-setting');
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
                <div className="fixed inset-0 bg-black/0 flex items-center justify-center z-50">
                    <div className="bg-white/60 backdrop-blur-xl rounded-2xl mb-10 p-6 mx-8 text-center border border-text-primary/20 min-w-[280px]">
                        <p className="text-text-primary text-base mb-6">
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

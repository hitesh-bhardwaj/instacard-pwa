'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SheetContainer, OTPInput, Button } from '@/components/ui';
import { routes } from '@/lib/routes';

const MAX_CODE_LENGTH = 6;

export default function page() {
    const router = useRouter();
    const [code, setCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);

    const handleContinue = async () => {
        setIsVerifying(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsVerifying(false);
        router.push(routes.giftCardActivation);
    };

    const handleResend = () => {
        setCode('');
        // TODO: Implement resend OTP API call
    };

    const isCodeComplete = code.length === MAX_CODE_LENGTH;

    return (
        <div className="h-screen flex flex-col">
            <SheetContainer>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col flex-1 items-center justify-center h-full">
                        <div className="p-6 flex-1 py-10 px-5 text-center flex flex-col items-center gap-2">
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
                                <OTPInput 
                                    value={code} 
                                    maxLength={MAX_CODE_LENGTH} 
                                    onChange={setCode}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='p-6 pb-10 text-center'>
                        <Button
                            className="mt-8"
                            fullWidth
                            onClick={handleContinue}
                            disabled={!isCodeComplete || isVerifying}
                        >
                            {isVerifying ? 'Verifying...' : 'Continue'}
                        </Button>

                        <p className="mt-3 text-sm">
                            Didn&apos;t receive the Code?{' '}
                            <button
                                onClick={handleResend}
                                className="bg-transparent border-none text-primary font-semibold cursor-pointer p-0 text-sm"
                                type="button"
                            >
                                Resend
                            </button>
                        </p>
                    </div>
                </div>
            </SheetContainer>
        </div>
    );
}

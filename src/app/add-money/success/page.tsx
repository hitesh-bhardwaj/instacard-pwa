'use client'

import SuccessScreen from '@/features/success/components/SuccessScreen'
import { notifyUserCancelled } from '@/lib/bridge'
import { Button, SheetContainer } from '@/components/ui'
import Image from 'next/image'

export default function AddMoneySuccessPage() {
    return (
        <>
            <div className="h-screen flex flex-col">
                {/* <Header title="Success" /> */}

                <SheetContainer>
                    <div className="flex-1 flex flex-col items-start h-full justify-center p-6 py-10 gap-10 text-center">
                        {/* Success checkmark animation */}
                        <div className="w-full flex  relative flex-col items-center justify-start animate-scale-in">
                            <Image
                                src={'/img/success.png'}
                                alt="Success"
                                width={200}
                                height={200}
                                className="w-[120px] h-auto  object-contain"
                            />
                        </div>
                        <div className="w-full bg-white/60 backdrop-blur-xl rounded-2xl border-text-secondary/20 space-y-4 py-6 z-5 relative border p-4  text-center mt-4">
                            <p className="text-lg font-semibold text-text-primary">
                                Payment was Successful!
                            </p>
                            <p className="text-sm text-text-secondary mt-2">
                                Your Payment Limits have been successfully
                                updated
                            </p>
                        </div>


                    </div>
                    <div className="p-4 pb-[calc(env(safe-area-inset-bottom,24px)+24px)] pt-2">
                        <Button fullWidth onClick={notifyUserCancelled}>
                            Back to Home
                        </Button>
                    </div>

                    <style jsx>{`
          @keyframes scaleIn {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          .animate-scale-in {
            animation: scaleIn 0.5s ease-out;
          }
        `}</style>
                </SheetContainer>
            </div>
        </>

    )
}

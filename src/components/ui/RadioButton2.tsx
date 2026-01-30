'use client';

import { Check } from "lucide-react";
import Image from "next/image";
import { haptic } from "@/lib/useHaptics";

interface RadioOptionProps {
    label: string;
    selected: boolean;
    onSelect: () => void;
    accessibilityLabel?: string;
    icon?: string;

}

export function RadioOption2({ label, selected, onSelect, accessibilityLabel, icon }: RadioOptionProps) {
    const handleSelect = () => {
        haptic('light');
        onSelect();
    };

    return (
        <button
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={accessibilityLabel || label}
            onClick={handleSelect}
            className={`btn-press w-full flex items-center justify-between p-4 rounded-[14px] bg-white cursor-pointer transition-[border-color] duration-200 ease-in-out border ${selected ? 'border-text-primary/10' : 'border-border'
                }`}
        >

            <div className="flex items-center gap-4">

                {icon && (
                    <div className="h-fit w-fit">
                        <Image src={icon} alt={icon} width={1000} height={1000} className='h-full w-full object-contain' />

                    </div>
                )}
                <span className="text-[14px] text-text-primary">
                    {label}
                </span>
            </div>
            {selected ? (
                <span
                    className={`w-[22px] h-[22px] bg-orange p-1.5 rounded-full  flex items-center justify-center transition-[border-color] duration-200 ease-in-out`}
                >
                    <Check strokeWidth={3} color="white" />
                </span>
            ) : (
                <span
                    className={`w-[20px] border-2 border-text-primary h-[20px]  p-1.5 rounded-full  flex items-center justify-center transition-[border-color] duration-200 ease-in-out`}
                >
                </span>
            )}
        </button>
    );
}

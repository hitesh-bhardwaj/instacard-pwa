'use client';

import { useEffect, useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { SheetContainer, Button } from '@/components/ui';
import { notifyNavigation, notifyCardAdded } from '@/lib/bridge';
import { ChevronDown } from 'lucide-react';
import FAQModal from '@/components/Modal/FAQModal';
import type { FAQData } from '@/components/Modal/FAQModal';
import { useRouter, useSearchParams } from 'next/navigation';

interface AccordionItemProps {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}

function AccordionItem({ title, isExpanded, onToggle, children }: AccordionItemProps) {
    return (
        <div className="bg-[#F6F7FF] rounded-xl border border-gray-200 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 text-left"
            >
                <span className="text-sm font-medium text-text-primary">{title}</span>
                <ChevronDown
                    className={`w-5 h-5 text-text-primary transition-transform duration-200 ease-out ${isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                />
            </button>
            <div
                className={`grid transition-all duration-200 ease-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <div className="px-4 pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

const getCardActions = (cardType: string): Array<{
    icon: string;
    text: string;
    faqData: FAQData;
    route: string;
}> => [
        {
            icon: '/svg/managecard.svg',
            text: 'Manage Card',
            route: `/manage-card/${cardType}`,
            faqData: {
                heading: 'Remove Card',
                bulletPoints: [
                    'Removing a card will permanently delete it from your account.',
                    'All associated transactions and history will be archived.',
                    'You will no longer be able to use this card for any transactions.',
                    'If you have any pending transactions, please wait for them to complete before removing the card.',
                    'You can always add a new card later if needed.',
                ],
            },
        },
        {
            icon: '/svg/phone.svg',
            text: 'Link to a Physical Card',
            route: '/link-physical-card',
            faqData: {
                heading: 'Link to a Physical Card',
                bulletPoints: [
                    'You can purchase a Universal Card or a Sigma card from your Bank or any Agent, Marketplace or order online.',
                    'Universal Card or Sigma Card offer unified card experience such that you can link any Virtual Instacard to them to start using the virtual Instacard on any POS/ATM through the linked Universal or Sigma Instacard.',
                    'Sigma Card is a physical card variant of Instacard that is issued by a Bank/ FinTech to allow users to link any Virtual Instacard issued by them for making Domestic as well as International payments.',
                    'Universal Card is another physical card variant of Instacard that users can link any virtual Instacard issued by any Bank/ FinTech in your country for making Domestic Payments through a single Physical Card.',
                    'You can simply link any one Virtual Instacard to a Universal or Sigma Cards to start using the linked Virtual Instacard from the physical card. When you link a new Virtual Instacard to a Universal or Sigma card, previously linked Virtual Instacard is de-linked and you can start using the newly linked Virtual Card from the physical Universal / Sigma card.',
                ],
            },
        },

    ];

type CardType = 'debit' | 'credit' | 'prepaid' | 'gift';

function HowToUseCardContent() {
    const [expandedSection, setExpandedSection] = useState<string | null>('virtual');
    const [isFaqOpen, setIsFaqOpen] = useState(false);
    const [faqData, setFaqData] = useState<FAQData | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const cardType = (searchParams.get('type') as CardType) || 'debit';
    const cardActions = useMemo(() => getCardActions(cardType), [cardType]);
    useEffect(() => {
        notifyNavigation('how-to-use-card');
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    const openFaq = (e: React.MouseEvent, data: FAQData) => {
        e.stopPropagation();
        setFaqData(data);
        setIsFaqOpen(true);
    };

    const closeFaq = () => {
        setIsFaqOpen(false);
        setFaqData(null);
    };

    return (
        <div className="h-screen flex flex-col">
            <SheetContainer>
                <div className="flex-1 flex flex-col overflow-auto py-10  p-6">
                    {/* Header */}
                    <div className="text-center">
                        <p className="text-sm text-text-primary">Hello, Nirdesh Malik</p>
                        <p className="text-sm text-text-primary mt-1">Your Instacard is now ready for usage</p>
                    </div>

                    {/* Card Preview */}
                    <div className="mt-4">
                        <div className="w-full aspect-[1.58] rounded-2xl overflow-hidden relative">
                            <Image
                                src="/img/frontside.png"
                                alt="FCMB Magic Debit Card"
                                width={1000}
                                height={1000}
                                className="w-full h-full object-contain"
                            />
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl w-full text-center select-none">0000 0000 0000 0000</p>
                        </div>
                    </div>

                    {/* How to use section */}
                    <div className="mt-6">
                        <h2 className="text-base text-text-primary text-center">
                            How to use this card?
                        </h2>
                        <p className="text-xs text-text-primary text-center mt-2">
                            You can simply use this Virtual Debit Card using any of the following method:
                        </p>
                    </div>

                    {/* Accordion Sections */}
                    <div className="mt-4  space-y-3 pb-6">
                        {/* Use Virtual Card Directly */}
                        <AccordionItem
                            title="Use Virtual bg-background2 Card Directly"
                            isExpanded={expandedSection === 'virtual'}
                            onToggle={() => toggleSection('virtual')}
                        >
                            <p className="text-xs text-text-primary mb-3">
                                Open your Digital Instacard Wallet and select this card to:
                            </p>
                            <ul className="space-y-2 text-xs text-text-primary">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Make Online Payment using security of a Dynamic CVV</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span>Make the selected card your Default Contactless card on your NFC enabled phone to Tap your Phone on any POS for initiating a contactless payment, similar to how you make contactless payment using a Physical Card.</span>
                                </li>
                            </ul>
                        </AccordionItem>
                        <AccordionItem
                            title="Link to Physical Card"
                            isExpanded={expandedSection === 'link-physical'}
                            onToggle={() => toggleSection('link-physical')}
                        >
                            <p className="text-xs text-text-primary mb-3">
                                You can link this Virtual Instacard to a Physical Card:
                            </p>
                            <ul className="space-y-2 text-xs text-text-primary">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary  ">•</span>
                                    <span>Request a Physical Card from any FCMB branch near you</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary ">•</span>
                                    <span>Link your Virtual Instacard to the Physical Card to share the same account and transaction history</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary ">•</span>
                                    <span>Use the Physical Card at ATMs and POS terminals for cash withdrawals and in-store purchases</span>
                                </li>
                            </ul>
                        </AccordionItem>


                    </div>


                    <div className="flex w-full gap-2">
                        {cardActions.map((action, index) => (
                            <div
                                key={index}
                                onClick={() => router.push(action.route)}
                                className="w-full border flex items-start flex-col justify-between border-text-primary/20 gap-4 rounded-xl p-4"
                            >
                                <div className="flex h-[30%] items-center gap-2 w-full justify-between">
                                    <div>
                                        <div className="w-7 h-auto flex items-center justify-center aspect-square">
                                            <Image src={action.icon} alt="icon" className='h-full w-full object-contain' width={24} height={24} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => openFaq(e, action.faqData)}
                                        className="h-6 font-semibold flex items-center justify-center text-white text-md w-6 bg-primary rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                                        aria-label="Open FAQ"
                                        type="button"
                                    >
                                        ?
                                    </button>
                                </div>

                                <p className="text-[12px] w-full leading-[1.2]">{action.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <FAQModal visible={isFaqOpen} onClose={closeFaq} data={faqData || undefined}  />


            </SheetContainer>
        </div>
    );
}

export default function HowToUseCardPage() {
    return (
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <HowToUseCardContent />
        </Suspense>
    );
}
import type { FAQData } from '@/components/Modal/FAQModal'

export const manageBtns = [
  { icon: '/svg/limitations.svg', title: 'Limit Setting', href: '/limit-setting' },
  { icon: '/svg/pin.svg', title: 'PIN Change', href: '/pin-change' },
  { icon: '/svg/block.svg', title: 'Block/Unblock Card', href: '/card-status' },
] as const

export const cardActions: Array<{
  icon: string
  text: string
  faqData: FAQData
}> = [
  {
    icon: '/svg/phone.svg',
    text: 'Link to a Physical Universal or Sigma Instacard',
    faqData: {
      heading: 'Link to a Physical Universal or Sigma Instacard',
      bulletPoints: [
        'You can purchase a Universal Card or a Sigma card from your Bank or any Agent, Marketplace or order online.',
        'Universal Card or Sigma Card offer unified card experience such that you can link any Virtual Instacard to them to start using the virtual Instacard on any POS/ATM through the linked Universal or Sigma Instacard.',
        'Sigma Card is a physical card variant of Instacard that is issued by a Bank/ FinTech to allow users to link any Virtual Instacard issued by them for making Domestic as well as International payments.',
        'Universal Card is another physical card variant of Instacard that users can link any virtual Instacard issued by any Bank/ FinTech in your country for making Domestic Payments through a single Physical Card.',
        'You can simply link any one Virtual Instacard to a Universal or Sigma Cards to start using the linked Virtual Instacard from the physical card. When you link a new Virtual Instacard to a Universal or Sigma card, previously linked Virtual Instacard is de-linked and you can start using the newly linked Virtual Card from the physical Universal / Sigma card.',
      ],
    },
  },
  {
    icon: '/svg/del.svg',
    text: 'Remove Card',
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
]


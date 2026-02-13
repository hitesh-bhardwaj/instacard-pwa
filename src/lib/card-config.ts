import type { CardType } from './types'

export type CardConfig = {
  label: string
  image: string
  mockupImage: string
}

export const CARD_CONFIG: Record<CardType, CardConfig> = {
  debit: {
    label: 'Debit Card',
    image: '/img/frontside.png',
    mockupImage: '/img/debitmockup.png',
  },
  credit: {
    label: 'Credit Card',
    image: '/img/creditcard.png',
    mockupImage: '/img/creditmockup.png',
  },
  prepaid: {
    label: 'Pre-Paid Card',
    image: '/img/prepaid.png',
    mockupImage: '/img/prepaid.png',
  },
  gift: {
    label: 'Gift Card',
    image: '/img/gift.png',
    mockupImage: '/img/gift.png',
  },
}

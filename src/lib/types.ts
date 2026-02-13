export const CARD_TYPES = ['debit', 'credit', 'prepaid', 'gift'] as const

export type CardType = (typeof CARD_TYPES)[number]

export const PIN_LENGTH = 4

export const DEFAULT_PIN = '0000'

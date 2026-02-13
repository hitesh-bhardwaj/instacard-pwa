import { create } from 'zustand'
import { DEFAULT_PIN } from '@/lib/types'

type CardStore = {
  pin: string
  setPin: (pin: string) => void
  resetPin: () => void
  verifyPin: (input: string) => boolean
}

export const useCardStore = create<CardStore>((set, get) => ({
  pin: DEFAULT_PIN,
  setPin: (pin) => set({ pin }),
  resetPin: () => set({ pin: DEFAULT_PIN }),
  verifyPin: (input) => input === get().pin,
}))

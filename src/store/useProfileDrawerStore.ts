import { create } from 'zustand'

type ProfileDrawerStore = {
  visible: boolean
  open: () => void
  close: () => void
}

export const useProfileDrawerStore = create<ProfileDrawerStore>((set) => ({
  visible: false,
  open: () => set({ visible: true }),
  close: () => set({ visible: false }),
}))

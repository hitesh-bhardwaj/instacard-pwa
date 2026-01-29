import { create } from 'zustand'

export type LimitTab = 'domestic' | 'international'

type LimitSettingState = {
  activeTab: LimitTab
}

type LimitSettingActions = {
  setActiveTab: (tab: LimitTab) => void
}

export const useLimitSettingStore = create<LimitSettingState & LimitSettingActions>((set) => ({
  activeTab: 'domestic',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))


'use client'

import { ProfileDrawer } from '@/components/ProfileDrawer'
import { ProfileContent } from '@/components/ProfileDrawer/ProfileContent'
import { useProfileDrawerStore } from '@/store/useProfileDrawerStore'

export default function GlobalProfileDrawer() {
  const visible = useProfileDrawerStore((s) => s.visible)
  const close = useProfileDrawerStore((s) => s.close)

  return (
    <ProfileDrawer visible={visible} onClose={close}>
      {(closeDrawer) => (
        <ProfileContent
          userName="Nirdesh Malik"
          onClose={closeDrawer}
        />
      )}
    </ProfileDrawer>
  )
}

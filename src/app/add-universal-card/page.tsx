'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/routes'

export default function AddUniversalCardPage() {
  const router = useRouter()

  useEffect(() => {
    router.push(routes.addUniversalFaceVerification)
  }, [router])

  return (
    <div className="h-dvh w-full flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        {/* <p className="text-text-secondary text-sm">Loading...</p> */}
      </div>
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'

const AntimatterInner = dynamic(() => import('./AntimatterInner'), { ssr: false })

export function AntimatterCanvas() {
  return <AntimatterInner />
}

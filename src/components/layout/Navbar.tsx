'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard' },
  { href: '/calendario', label: 'Calendario' },
  { href: '/nutricion', label: 'Nutrición' },
  { href: '/objetivos', label: 'Objetivos' },
  { href: '/progreso', label: 'Progreso' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const clickCount = useRef(0)
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [typedKeys, setTypedKeys] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Logo 5-click easter egg trigger
  function handleLogoClick() {
    clickCount.current += 1
    if (clickTimer.current) clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0
    }, 3000)
    if (clickCount.current >= 5) {
      clickCount.current = 0
      router.push('/antigravity')
    }
  }

  // Keyboard "mamba" sequence easter egg
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      setTypedKeys((prev) => {
        const next = (prev + e.key).slice(-5).toLowerCase()
        if (next === 'mamba') {
          router.push('/antigravity')
          return ''
        }
        return next
      })
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router])

  // suppress unused warning
  void typedKeys

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          onClick={handleLogoClick}
          className="select-none text-left focus:outline-none"
          aria-label="Mamba by Jarvis"
        >
          <span className="text-xl font-bold tracking-tight text-primary">
            MAMBA
          </span>
          <span className="ml-1 text-xl font-light text-muted-foreground">
            by Jarvis
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-muted-foreground p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background px-4 pb-3 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block py-2 text-sm font-medium',
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

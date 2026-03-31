interface PageWrapperProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
}

export function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </main>
  )
}

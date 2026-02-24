import * as React from "react"

export type DashboardHeaderProps = {
  onMobileMenuToggle: () => void
}

export function DashboardHeader({ onMobileMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-foreground/5 lg:hidden"
            aria-label="Open menu"
          >
            <span aria-hidden="true">☰</span>
          </button>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-foreground font-serif">
              WickBiz Dashboard
            </div>
            <div className="truncate text-xs text-muted-foreground">
              Supply costs & receipt uploads
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Feb 2026
          </span>
          <div className="hidden h-6 w-px bg-border sm:block" />
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
              B
            </div>
            <span className="hidden text-sm font-medium text-foreground sm:inline">
              Business
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

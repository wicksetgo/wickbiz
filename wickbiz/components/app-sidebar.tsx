import * as React from "react"

export type AppSidebarProps = {
  collapsed: boolean
  onToggle: () => void
}

type NavItem = {
  label: string
  href?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard" },
  { label: "Receipts" },
  { label: "Supplies" },
  { label: "COGS Calculator" },
]

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={[
        "fixed inset-y-0 left-0 z-30",
        "border-r border-border bg-background",
        "flex flex-col",
        "transition-[width] duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[260px]",
      ].join(" ")}
      aria-label="Sidebar"
    >
      <div className="flex h-16 items-center justify-between gap-2 px-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            W
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-foreground font-serif">
                WickBiz
              </div>
              <div className="truncate text-xs text-muted-foreground">
                Candle COGS
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-foreground/5"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
        </button>
      </div>

      <nav className="flex-1 px-2 py-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? "#"}
                className={[
                  "group flex items-center gap-3 rounded-md px-3 py-2",
                  "text-sm font-medium",
                  "text-foreground hover:bg-foreground/5",
                ].join(" ")}
              >
                <span
                  className="flex size-8 items-center justify-center rounded bg-foreground/5 text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  {item.label.slice(0, 1)}
                </span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-border p-2">
        <div
          className={[
            "rounded-md bg-foreground/5 px-3 py-2",
            collapsed ? "text-center" : "",
          ].join(" ")}
        >
          <div className="text-xs font-semibold text-foreground">
            {collapsed ? "Pro" : "WickBiz Pro"}
          </div>
          {!collapsed && (
            <div className="mt-0.5 text-xs text-muted-foreground">
              Track your inventory & costs.
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

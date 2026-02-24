"use client"

import type * as React from "react"
import { useState, useCallback } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { UploadZone } from "@/components/upload-zone"
import { SupplyTable, type SupplyItem } from "@/components/supply-table"
import { StatsCards } from "@/components/stats-cards"
import { AddItemDialog } from "@/components/add-item-dialog"

type FlameProps = React.HTMLAttributes<HTMLSpanElement>

function Flame({ className, ...rest }: FlameProps) {
  return (
    <span
      className={["inline-flex items-center justify-center", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      🔥
    </span>
  )
}

const SAMPLE_DATA: SupplyItem[] = [
  {
    id: "1",
    vendor: "CandleScience",
    date: "2026-02-10",
    item: "Golden Brands 464 Soy Wax",
    totalPrice: 34.99,
    quantity: 10,
    unit: "lb",
  },
  {
    id: "2",
    vendor: "Lone Star Candle Supply",
    date: "2026-02-08",
    item: 'Premium Cotton Wicks CD-18 (6")',
    totalPrice: 12.5,
    quantity: 100,
    unit: "oz",
  },
  {
    id: "3",
    vendor: "CandleScience",
    date: "2026-02-05",
    item: "Lavender Eucalyptus Fragrance Oil",
    totalPrice: 18.0,
    quantity: 16,
    unit: "oz",
  },
  {
    id: "4",
    vendor: "Fillmore Container",
    date: "2026-01-28",
    item: "Straight Sided Tumbler Jars (8oz)",
    totalPrice: 48.0,
    quantity: 24,
    unit: "oz",
  },
  {
    id: "5",
    vendor: "Nature's Garden",
    date: "2026-01-22",
    item: "Coconut Wax Blend CB-135",
    totalPrice: 52.99,
    quantity: 640,
    unit: "oz",
  },
  {
    id: "6",
    vendor: "Bramble Berry",
    date: "2026-01-15",
    item: "Vanilla Sandalwood FO",
    totalPrice: 22.5,
    quantity: 16,
    unit: "oz",
  },
]

export default function DashboardPage() {
  const [items, setItems] = useState<SupplyItem[]>(SAMPLE_DATA)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleAddItem = useCallback((item: SupplyItem) => {
    setItems((prev) => [item, ...prev])
  }, [])

  const handleDeleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const handleFilesProcessed = useCallback(() => {
    const newItem: SupplyItem = {
      id: crypto.randomUUID(),
      vendor: "Uploaded Vendor",
      date: new Date().toISOString().split("T")[0],
      item: "Parsed Supply Item",
      totalPrice: Math.round(Math.random() * 5000) / 100,
      quantity: Math.round(Math.random() * 500),
      unit: "oz",
    }
    setItems((prev) => [newItem, ...prev])
  }, [])

  const totalCost = items.reduce((sum, item) => sum + item.totalPrice, 0)
  const avgCostPerUnit =
    items.length > 0
      ? items.reduce(
          (sum, item) =>
            sum + (item.quantity > 0 ? item.totalPrice / item.quantity : 0),
          0
        ) / items.length
      : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - desktop always visible, mobile toggle */}
      <div className="hidden lg:block">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((prev) => !prev)}
        />
      </div>

      {/* Mobile sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-30 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AppSidebar
          collapsed={false}
          onToggle={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Main content area */}
      <div
        className={`flex min-h-screen flex-col transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:pl-[68px]" : "lg:pl-[260px]"
        }`}
      >
        <DashboardHeader
          onMobileMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Page Title Section */}
            <div className="mb-8 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Flame className="size-5 text-primary" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-primary">
                  COGS Calculator
                </h2>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground font-serif sm:text-4xl text-balance">
                Know Your Numbers.
                <br />
                <span className="text-muted-foreground">
                  Grow Your Craft.
                </span>
              </h1>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">
                Upload supply receipts, track costs down to the ounce, and
                calculate your exact Cost of Goods Sold for every candle you
                make.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="mb-8">
              <StatsCards
                totalCost={totalCost}
                itemCount={items.length}
                avgCostPerUnit={avgCostPerUnit}
                receiptCount={
                  items.length > 0
                    ? new Set(items.map((i) => i.vendor + i.date)).size
                    : 0
                }
              />
            </div>

            {/* Upload Zone */}
            <div className="mb-8">
              <UploadZone onFilesProcessed={handleFilesProcessed} />
            </div>

            {/* Supply Table */}
            <SupplyTable
              items={items}
              onAddItem={() => setDialogOpen(true)}
              onDeleteItem={handleDeleteItem}
            />
          </div>
        </main>

        <AddItemDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onAdd={handleAddItem}
        />

        {/* Footer */}
        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary">
                <Flame className="size-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground font-serif">
                WickBiz
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {"Built for candle makers who mean business."}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

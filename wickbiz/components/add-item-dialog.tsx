import * as React from "react"
import type { SupplyItem } from "@/components/supply-table"

export type AddItemDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (item: SupplyItem) => void
}

export function AddItemDialog({ open, onOpenChange, onAdd }: AddItemDialogProps) {
  const [vendor, setVendor] = React.useState("")
  const [date, setDate] = React.useState(
    () => new Date().toISOString().split("T")[0]
  )
  const [item, setItem] = React.useState("")
  const [quantity, setQuantity] = React.useState("0")
  const [unit, setUnit] = React.useState("oz")
  const [totalPrice, setTotalPrice] = React.useState("0.00")

  const resetForm = () => {
    setVendor("")
    setDate(new Date().toISOString().split("T")[0])
    setItem("")
    setQuantity("0")
    setUnit("oz")
    setTotalPrice("0.00")
  }

  const handleClose = () => {
    onOpenChange(false)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const parsedQuantity = Number(quantity) || 0
    const parsedTotal = Number(totalPrice) || 0

    const newItem: SupplyItem = {
      id: crypto.randomUUID(),
      vendor: vendor.trim() || "Manual entry",
      date: date || new Date().toISOString().split("T")[0],
      item: item.trim() || "New supply item",
      totalPrice: parsedTotal,
      quantity: parsedQuantity,
      unit: unit || "oz",
    }

    onAdd(newItem)
    resetForm()
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded-xl border border-border bg-background shadow-lg">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold text-foreground">
            Add supply item
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex size-7 items-center justify-center rounded-md border border-border text-xs text-muted-foreground hover:bg-foreground/5"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 px-4 py-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1 text-xs">
              <span className="block text-[11px] font-medium text-muted-foreground">
                Vendor
              </span>
              <input
                type="text"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
                placeholder="CandleScience"
              />
            </label>

            <label className="space-y-1 text-xs">
              <span className="block text-[11px] font-medium text-muted-foreground">
                Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
              />
            </label>
          </div>

          <label className="space-y-1 text-xs">
            <span className="block text-[11px] font-medium text-muted-foreground">
              Item
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
              placeholder="Golden Brands 464 Soy Wax"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="space-y-1 text-xs">
              <span className="block text-[11px] font-medium text-muted-foreground">
                Quantity
              </span>
              <input
                type="number"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
              />
            </label>

            <label className="space-y-1 text-xs">
              <span className="block text-[11px] font-medium text-muted-foreground">
                Unit
              </span>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
              >
                <option value="oz">oz</option>
                <option value="lb">lb</option>
                <option value="g">g</option>
                <option value="kg">kg</option>
              </select>
            </label>

            <label className="space-y-1 text-xs">
              <span className="block text-[11px] font-medium text-muted-foreground">
                Total price (USD)
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-xs text-foreground outline-none ring-0 focus:border-primary"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center justify-center rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-foreground/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
            >
              Add item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}


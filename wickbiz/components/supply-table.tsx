import * as React from "react"

export type SupplyItem = {
  id: string
  vendor: string
  date: string
  item: string
  totalPrice: number
  quantity: number
  unit: string
}

export type SupplyTableProps = {
  items: SupplyItem[]
  onAddItem: () => void
  onDeleteItem: (id: string) => void
}

export function SupplyTable({ items, onAddItem, onDeleteItem }: SupplyTableProps) {
  const hasItems = items.length > 0

  return (
    <section className="rounded-xl border border-border bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-6">
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Supply purchases
          </h2>
          <p className="text-xs text-muted-foreground">
            Each row is a supply line from a receipt.
          </p>
        </div>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
        >
          + Add item
        </button>
      </div>

      {hasItems ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border-t border-border text-xs sm:text-sm">
            <thead className="bg-foreground/5 text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium sm:px-4">
                  Date
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-left font-medium sm:px-4">
                  Vendor
                </th>
                <th className="px-3 py-2 text-left font-medium sm:px-4">
                  Item
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-right font-medium sm:px-4">
                  Qty
                </th>
                <th className="whitespace-nowrap px-3 py-2 text-right font-medium sm:px-4">
                  Total
                </th>
                <th className="px-3 py-2 text-right font-medium sm:px-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-border/70 bg-background hover:bg-foreground/3"
                >
                  <td className="whitespace-nowrap px-3 py-2 align-top text-xs text-muted-foreground sm:px-4">
                    {item.date}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top text-xs text-muted-foreground sm:px-4">
                    {item.vendor}
                  </td>
                  <td className="px-3 py-2 align-top text-xs sm:px-4">
                    <div className="text-foreground">{item.item}</div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {item.quantity.toLocaleString()} {item.unit}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top text-right text-xs sm:px-4">
                    {item.quantity.toLocaleString()} {item.unit}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top text-right text-xs font-medium text-foreground sm:px-4">
                    $
                    {item.totalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top text-right sm:px-4">
                    <button
                      type="button"
                      onClick={() => onDeleteItem(item.id)}
                      className="inline-flex items-center justify-center rounded-md border border-border px-2 py-1 text-[11px] text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="px-4 py-8 text-center text-xs text-muted-foreground sm:px-6">
          <p>No supplies yet. Upload a receipt or add an item manually.</p>
        </div>
      )}
    </section>
  )
}


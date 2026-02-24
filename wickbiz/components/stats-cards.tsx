import * as React from "react"

export type StatsCardsProps = {
  totalCost: number
  itemCount: number
  avgCostPerUnit: number
  receiptCount: number
}

function formatCurrency(value: number) {
  return value.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function StatsCards({
  totalCost,
  itemCount,
  avgCostPerUnit,
  receiptCount,
}: StatsCardsProps) {
  const cards = React.useMemo(
    () => [
      {
        label: "Total supply spend",
        value: formatCurrency(totalCost),
        helper: "Across all uploaded receipts",
      },
      {
        label: "Supply line items",
        value: itemCount.toLocaleString(),
        helper: "Every wax, wick, jar, and oil",
      },
      {
        label: "Avg cost per unit",
        value: `${formatCurrency(avgCostPerUnit)} / unit`,
        helper: "Rough blended cost per oz / lb",
      },
      {
        label: "Unique receipts",
        value: receiptCount.toLocaleString(),
        helper: "Grouped by vendor + date",
      },
    ],
    [avgCostPerUnit, itemCount, receiptCount, totalCost]
  )

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="flex flex-col justify-between rounded-xl border border-border bg-background px-4 py-3 sm:px-5 sm:py-4"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {card.value}
              </p>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
              {card.helper}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}


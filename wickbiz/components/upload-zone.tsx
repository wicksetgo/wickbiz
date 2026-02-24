import * as React from "react"

export type UploadZoneProps = {
  onFilesProcessed: () => void
}

export function UploadZone({ onFilesProcessed }: UploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)

  const handleFiles = React.useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      // In a real app we would parse the receipts here.
      // For now, just signal that "processing" is complete.
      onFilesProcessed()
    },
    [onFilesProcessed]
  )

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    handleFiles(event.dataTransfer.files)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files)
    // reset so the same file can be selected twice in a row
    event.target.value = ""
  }

  return (
    <section
      className={[
        "relative flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 sm:px-8",
        "bg-background",
        isDragging ? "border-primary bg-primary/5" : "border-border",
      ].join(" ")}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span aria-hidden="true" className="text-2xl">
          ⬆
        </span>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-foreground">
          Drop receipt images or PDFs
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          We&apos;ll read your vendor, items, and totals and add them to your
          supply list.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full bg-foreground/5 px-2 py-1">
          JPG · PNG · PDF
        </span>
        <span className="rounded-full bg-foreground/5 px-2 py-1">
          Drag &amp; drop or click to browse
        </span>
      </div>
    </section>
  )
}


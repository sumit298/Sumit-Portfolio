import { ChevronDown, GripVertical, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

export const inputBase =
  'w-full rounded-lg border border-[var(--hair)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm text-[var(--fg)] outline-none transition-colors placeholder:text-[var(--fg-faint)] focus:border-[var(--accent)]'

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.66rem] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
        {label}
      </span>
      {children}
      {hint ? <span className="mt-1 block text-[0.7rem] text-[var(--fg-faint)]">{hint}</span> : null}
    </label>
  )
}

export function Text({ label, value, onChange, placeholder, hint }) {
  return (
    <Field label={label} hint={hint}>
      <input
        className={inputBase}
        value={value ?? ''}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  )
}

export function Area({ label, value, onChange, rows = 4, hint }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        className={`${inputBase} resize-y leading-relaxed`}
        rows={rows}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </Field>
  )
}

export function Toggle({ label, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="flex items-center gap-3 rounded-lg border border-[var(--hair)] bg-[rgba(255,255,255,0.03)] px-3 py-2 text-sm"
    >
      <span
        className={`relative h-4 w-7 rounded-full transition-colors ${
          value ? 'bg-[var(--accent)]' : 'bg-[var(--hair)]'
        }`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-[var(--ground)] transition-transform ${
            value ? 'translate-x-3.5' : 'translate-x-0.5'
          }`}
        />
      </span>
      <span className="text-[0.72rem] uppercase tracking-[0.14em] text-[var(--fg-muted)]">{label}</span>
    </button>
  )
}

/** Editor for an array of plain strings — bullet points, tags, paragraphs. */
export function StringList({ label, values = [], onChange, placeholder, multiline = false }) {
  const update = (i, next) => onChange(values.map((v, idx) => (idx === i ? next : v)))
  const remove = (i) => onChange(values.filter((_, idx) => idx !== i))
  const add = () => onChange([...values, ''])

  return (
    <div>
      <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
        {label}
      </span>
      <div className="space-y-2">
        {values.map((value, i) => (
          <div key={i} className="flex gap-2">
            {multiline ? (
              <textarea
                className={`${inputBase} resize-y leading-relaxed`}
                rows={3}
                value={value}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            ) : (
              <input
                className={inputBase}
                value={value}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            )}
            <button type="button" className="icon-btn shrink-0" onClick={() => remove(i)} aria-label="Remove">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="btn mt-3 !px-3 !py-1.5 !text-[0.78rem]" onClick={add}>
        <Plus size={13} /> Add
      </button>
    </div>
  )
}

/** Collapsible card wrapping one item of a repeatable list, with reorder + delete. */
export function ItemCard({ title, subtitle, index, total, onMove, onRemove, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="rounded-xl border border-[var(--hair)] bg-[rgba(255,255,255,0.02)]">
      <div className="flex items-center gap-2 px-3 py-2.5">
        <GripVertical size={14} className="text-[var(--fg-faint)]" />
        <button type="button" className="flex flex-1 items-center gap-2 text-left" onClick={() => setOpen((o) => !o)}>
          <ChevronDown
            size={14}
            className={`text-[var(--fg-faint)] transition-transform ${open ? '' : '-rotate-90'}`}
          />
          <span className="text-sm font-medium text-white">{title || 'Untitled'}</span>
          {subtitle ? <span className="text-[0.7rem] text-[var(--fg-faint)]">{subtitle}</span> : null}
        </button>
        <button
          type="button"
          className="icon-btn !h-7 !w-7"
          disabled={index === 0}
          onClick={() => onMove(index, -1)}
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          type="button"
          className="icon-btn !h-7 !w-7"
          disabled={index === total - 1}
          onClick={() => onMove(index, 1)}
          aria-label="Move down"
        >
          ↓
        </button>
        <button type="button" className="icon-btn !h-7 !w-7" onClick={() => onRemove(index)} aria-label="Delete">
          <Trash2 size={13} />
        </button>
      </div>
      {open ? <div className="space-y-4 border-t border-[var(--hair)] px-4 py-5">{children}</div> : null}
    </div>
  )
}

export function AddButton({ label, onClick }) {
  return (
    <button type="button" className="btn w-full justify-center !py-2.5 !text-[0.82rem]" onClick={onClick}>
      <Plus size={14} /> {label}
    </button>
  )
}

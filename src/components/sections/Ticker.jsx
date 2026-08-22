/** Dark strip of repeating claims, sliding under the fold — the page's heartbeat. */
export default function Ticker({ items }) {
  return (
    <div className="band band-ink marquee overflow-hidden border-y border-[var(--hair)] py-3">
      <div className="marquee-track">
        {[0, 1].map((pass) => (
          <div key={pass} className="flex shrink-0 items-center" aria-hidden={pass === 1}>
            {items.map((item) => (
              <span key={`${pass}-${item}`} className="flex items-center">
                <span className="px-6 text-[0.68rem] tracking-[0.22em] uppercase text-[var(--fg-muted)]">
                  {item}
                </span>
                <span className="text-[var(--accent)]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

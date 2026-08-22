export default function Footer({ footer }) {
  const year = new Date().getFullYear()

  return (
    <footer className="band band-ink border-t border-[var(--hair)] py-8">
      <div className="wrap grid gap-3 text-center sm:grid-cols-3 sm:text-left">
        <p className="meta">{footer.left.replace('{year}', String(year))}</p>
        <p className="meta sm:text-center">{footer.center}</p>
        <p className="meta sm:text-right">{footer.right}</p>
      </div>
    </footer>
  )
}

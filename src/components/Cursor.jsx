import { useEffect, useRef } from 'react'

const LINK_SELECTOR = 'a, button, [role="button"], summary, label, .tagbox, .cursor-link'
const TEXT_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

/**
 * Ring + dot cursor. The dot tracks the pointer exactly, the ring eases behind it,
 * and both invert against the page via mix-blend-mode so one pair works on any surface.
 * Skipped entirely on touch/coarse pointers, where the system cursor stays put.
 */
export default function Cursor() {
  const ring = useRef(null)
  const dot = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    if (!fine.matches) return undefined

    document.body.classList.add('has-custom-cursor')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const eased = { ...target }
    let frame = 0

    const render = () => {
      eased.x += (target.x - eased.x) * 0.18
      eased.y += (target.y - eased.y) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${eased.x}px, ${eased.y}px, 0)`
      if (dot.current) dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`
      frame = requestAnimationFrame(render)
    }

    const setHidden = (hidden) => {
      ring.current?.setAttribute('data-hidden', String(hidden))
      dot.current?.setAttribute('data-hidden', String(hidden))
    }

    const onMove = (event) => {
      target.x = event.clientX
      target.y = event.clientY
      setHidden(false)

      const el = event.target
      const state = el?.closest?.(TEXT_SELECTOR) ? 'text' : el?.closest?.(LINK_SELECTOR) ? 'link' : 'default'
      ring.current?.setAttribute('data-state', state)
    }

    const setPressed = (pressed) => ring.current?.setAttribute('data-pressed', String(pressed))

    frame = requestAnimationFrame(render)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', () => setPressed(true), { passive: true })
    window.addEventListener('pointerup', () => setPressed(false), { passive: true })
    document.addEventListener('mouseleave', () => setHidden(true))
    document.addEventListener('mouseenter', () => setHidden(false))

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ring} className="cursor-ring" data-state="default" data-hidden="true" aria-hidden="true" />
      <div ref={dot} className="cursor-dot" data-hidden="true" aria-hidden="true" />
    </>
  )
}

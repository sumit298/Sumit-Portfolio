import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

/**
 * Pulls a control a few pixels toward the cursor while it is inside the element,
 * then springs back on exit. Disabled for reduced motion and coarse pointers.
 */
export default function Magnetic({ children, strength = 0.28, className = '' }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.35 })
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.35 })

  if (reduced) return <div className={className}>{children}</div>

  const onMove = (event) => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  )
}

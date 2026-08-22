/**
 * Shared motion vocabulary. One easing curve and one set of durations across the
 * whole page, so every reveal reads as the same system rather than per-component
 * guesses.
 */
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_OUT = [0.16, 1, 0.3, 1]

export const DURATION = {
  fast: 0.32,
  base: 0.6,
  slow: 0.9,
}

export const VIEWPORT = { once: true, margin: '-12% 0px -10% 0px' }

/** Parent that hands its children a staggered start. */
export const stagger = (step = 0.05, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren },
  },
})

export const fadeUp = (distance = 22) => ({
  hidden: { opacity: 0, y: distance },
  show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
})

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
}

/** Slides a line up from behind its own overflow box — used for display type. */
export const maskUp = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: DURATION.slow, ease: EASE_OUT } },
}

export const scaleInX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: DURATION.slow, ease: EASE } },
}

/** Reduced-motion fallback: everything just fades, nothing travels. */
export const flat = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast } },
}

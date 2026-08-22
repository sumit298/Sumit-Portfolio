import { useEffect, useState } from 'react'

function detectWebGL() {
  if (typeof window === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')),
    )
  } catch {
    return false
  }
}

/** WebGL support, reduced-motion preference, and a rough low-power hint in one shot. */
export function useEnvironment() {
  const [env, setEnv] = useState({ webgl: false, reducedMotion: false, lowPower: false, resolved: false })

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const cores = navigator.hardwareConcurrency || 8
    const coarse = window.matchMedia('(pointer: coarse)').matches

    const apply = () =>
      setEnv({
        webgl: detectWebGL(),
        reducedMotion: motionQuery.matches,
        lowPower: cores <= 4 || coarse,
        resolved: true,
      })

    apply()
    motionQuery.addEventListener('change', apply)
    return () => motionQuery.removeEventListener('change', apply)
  }, [])

  return env
}

/** 1 at the top of the page, easing to `floor` once the hero has scrolled away. */
export function useScrollIntensity(floor = 0.28) {
  const [intensity, setIntensity] = useState(1)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const span = window.innerHeight * 0.9
      const ratio = Math.min(window.scrollY / span, 1)
      setIntensity(1 - (1 - floor) * ratio)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [floor])

  return intensity
}

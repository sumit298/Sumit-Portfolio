import { Canvas } from '@react-three/fiber'
import Constellation from './Constellation'
import { useEnvironment } from '../../lib/useEnvironment'

/** WebGL layer for the hero only — the rest of the page stays flat and fast. */
export default function HeroField() {
  const { webgl, reducedMotion, lowPower, resolved } = useEnvironment()

  if (!resolved || !webgl || reducedMotion) return null

  return (
    <div className="hero-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, lowPower ? 1.25 : 2]}
        camera={{ position: [0, 0, 9], fov: 48 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Constellation lowPower={lowPower} />
      </Canvas>
    </div>
  )
}

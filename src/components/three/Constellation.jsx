import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const VIOLET = new THREE.Color('#5b2eff')
const OLIVE = new THREE.Color('#6d7d0a')
const NEUTRAL = new THREE.Color('#100f18')

const LINK_DISTANCE = 2.0
const MAX_LINKS = 500

function buildNodes(count, spread) {
  const nodes = []
  for (let i = 0; i < count; i += 1) {
    // Every eighth node is an accent, alternating between the two hues.
    const accent = i % 8 === 0 ? (i % 16 === 0 ? 'violet' : 'olive') : 'none'
    nodes.push({
      base: new THREE.Vector3(
        (Math.random() - 0.5) * spread.x,
        (Math.random() - 0.5) * spread.y,
        (Math.random() - 0.5) * spread.z,
      ),
      drift: new THREE.Vector3(
        (Math.random() - 0.5) * 0.09,
        (Math.random() - 0.5) * 0.09,
        (Math.random() - 0.5) * 0.06,
      ),
      phase: Math.random() * Math.PI * 2,
      accent,
    })
  }
  return nodes
}

/**
 * A drifting 3D node network: small square nodes joined by hairlines whenever
 * they come within LINK_DISTANCE of each other. Rotates slowly and parallaxes
 * with the pointer, so the hero has depth without pulling focus off the type.
 */
export default function Constellation({ count = 95, lowPower = false }) {
  const group = useRef()
  const pointsRef = useRef()
  const linesRef = useRef()
  const parallax = useRef(new THREE.Vector2())
  const { size } = useThree()

  const nodeCount = lowPower || size.width < 768 ? Math.round(count * 0.5) : count

  const { nodes, pointPositions, pointColors, pointSizes, linePositions, lineColors } = useMemo(() => {
    const spread = new THREE.Vector3(17, 9.5, 6)
    const built = buildNodes(nodeCount, spread)

    const positions = new Float32Array(nodeCount * 3)
    const colors = new Float32Array(nodeCount * 3)
    const sizes = new Float32Array(nodeCount)

    built.forEach((node, i) => {
      const color = node.accent === 'violet' ? VIOLET : node.accent === 'olive' ? OLIVE : NEUTRAL
      color.toArray(colors, i * 3)
      sizes[i] = node.accent === 'none' ? 2.6 : 5.4
    })

    return {
      nodes: built,
      pointPositions: positions,
      pointColors: colors,
      pointSizes: sizes,
      linePositions: new Float32Array(MAX_LINKS * 6),
      lineColors: new Float32Array(MAX_LINKS * 6),
    }
  }, [nodeCount])

  const pointMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
        vertexShader: /* glsl */ `
          uniform float uPixelRatio;
          attribute float aSize;
          varying vec3 vColor;
          void main() {
            vColor = color;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = aSize * uPixelRatio * (14.0 / -mv.z);
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main() {
            // Square nodes — reads as a technical diagram, not a starfield.
            gl_FragColor = vec4(vColor, 0.75);
          }
        `,
        vertexColors: true,
      }),
    [],
  )

  useFrame((state, delta) => {
    const step = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    // Drift the nodes, then rewrite the point buffer.
    nodes.forEach((node, i) => {
      const x = node.base.x + Math.sin(t * 0.16 + node.phase) * node.drift.x * 8
      const y = node.base.y + Math.cos(t * 0.13 + node.phase) * node.drift.y * 8
      const z = node.base.z + Math.sin(t * 0.1 + node.phase * 1.7) * node.drift.z * 8
      pointPositions[i * 3] = x
      pointPositions[i * 3 + 1] = y
      pointPositions[i * 3 + 2] = z
    })

    // Rebuild the links for the new positions.
    let link = 0
    for (let i = 0; i < nodes.length && link < MAX_LINKS; i += 1) {
      const ax = pointPositions[i * 3]
      const ay = pointPositions[i * 3 + 1]
      const az = pointPositions[i * 3 + 2]

      for (let j = i + 1; j < nodes.length && link < MAX_LINKS; j += 1) {
        const dx = ax - pointPositions[j * 3]
        const dy = ay - pointPositions[j * 3 + 1]
        const dz = az - pointPositions[j * 3 + 2]
        const distanceSq = dx * dx + dy * dy + dz * dz
        if (distanceSq > LINK_DISTANCE * LINK_DISTANCE) continue

        const fade = 1 - Math.sqrt(distanceSq) / LINK_DISTANCE
        const offset = link * 6

        linePositions[offset] = ax
        linePositions[offset + 1] = ay
        linePositions[offset + 2] = az
        linePositions[offset + 3] = pointPositions[j * 3]
        linePositions[offset + 4] = pointPositions[j * 3 + 1]
        linePositions[offset + 5] = pointPositions[j * 3 + 2]

        // Colour the link by whichever endpoint carries an accent.
        const accent = nodes[i].accent !== 'none' ? nodes[i].accent : nodes[j].accent
        const color = accent === 'violet' ? VIOLET : accent === 'olive' ? OLIVE : NEUTRAL
        const strength = accent === 'none' ? fade * 0.5 : fade
        for (let k = 0; k < 2; k += 1) {
          lineColors[offset + k * 3] = color.r * strength + (1 - strength) * 0
          lineColors[offset + k * 3 + 1] = color.g * strength
          lineColors[offset + k * 3 + 2] = color.b * strength
        }
        link += 1
      }
    }

    // Collapse the unused tail so stale segments do not render.
    for (let i = link; i < MAX_LINKS; i += 1) {
      linePositions.fill(0, i * 6, i * 6 + 6)
    }

    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true
      linesRef.current.geometry.attributes.color.needsUpdate = true
    }

    if (group.current) {
      parallax.current.lerp(new THREE.Vector2(state.pointer.x, state.pointer.y), 0.05)
      group.current.rotation.y = parallax.current.x * 0.22 + Math.sin(t * 0.06) * 0.08
      group.current.rotation.x = -parallax.current.y * 0.16
      group.current.position.z = Math.sin(t * 0.1) * 0.4
    }

    void step
  })

  return (
    <group ref={group}>
      <points ref={pointsRef} frustumCulled={false} material={pointMaterial}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[pointColors, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[pointSizes, 1]} />
        </bufferGeometry>
      </points>

      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.38} />
      </lineSegments>
    </group>
  )
}

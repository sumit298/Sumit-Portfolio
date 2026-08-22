import { Code2 } from 'lucide-react'
import { ICONS } from '../../lib/iconRegistry'

export default function Icon({ name, ...props }) {
  const Glyph = ICONS[name] || Code2
  return <Glyph {...props} />
}

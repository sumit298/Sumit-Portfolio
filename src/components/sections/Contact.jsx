import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'
import Reveal from '../ui/Reveal'
import MaskText from '../ui/MaskText'
import Magnetic from '../ui/Magnetic'
import { Stagger, StaggerItem } from '../ui/Stagger'
import { DURATION, EASE, VIEWPORT } from '../../lib/motion'

function DataPoint({ label, value, href, onCopy, copied }) {
  return (
    <div>
      <p className="meta">{label}</p>
      <div className="mt-3 flex items-center gap-3">
        {href ? (
          <a href={href} className="link-underline text-[1rem] text-[var(--fg)] hover:text-[var(--accent)]">
            {value}
          </a>
        ) : (
          <p className="text-[1rem] text-[var(--fg)]">{value}</p>
        )}
        {onCopy ? (
          <button
            type="button"
            onClick={onCopy}
            className="icon-btn !h-7 !w-7"
            aria-label={`Copy ${label.toLowerCase()}`}
          >
            <motion.span
              key={copied ? 'done' : 'idle'}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: DURATION.fast, ease: EASE }}
              className="flex"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
            </motion.span>
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function Contact({ contact, profile, social }) {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="band band-ink section !pb-16">
      <div className="wrap">
        <Reveal>
          <span className="kicker">Contact</span>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="meta mt-8">{contact.label}</p>
        </Reveal>

        <MaskText
          lines={[
            <>
              {contact.heading.replace(/\.$/, '')}
              <motion.span
                className="accent-block origin-bottom-left"
                initial={{ scale: reduced ? 1 : 0 }}
                whileInView={{ scale: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: DURATION.base, ease: EASE, delay: 0.55 }}
              />
            </>,
          ]}
          className="display display-xl mt-4"
          delay={0.08}
        />

        <Reveal delay={0.14}>
          <p className="mt-8 max-w-xl text-[0.92rem] leading-[1.9] text-[var(--fg-muted)]">{contact.text}</p>
        </Reveal>

        <motion.div
          className="hair mt-12 origin-left"
          initial={{ scaleX: reduced ? 1 : 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={VIEWPORT}
          transition={{ duration: DURATION.slow, ease: EASE }}
        />

        <Stagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
          <StaggerItem>
            <DataPoint
              label="Email"
              value={profile.email}
              href={contact.ctaUrl}
              onCopy={copyEmail}
              copied={copied}
            />
          </StaggerItem>
          <StaggerItem>
            <DataPoint label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, '')}`} />
          </StaggerItem>
          <StaggerItem>
            <DataPoint label="Base" value={profile.location} />
          </StaggerItem>
          <StaggerItem>
            <div>
              <p className="meta">Elsewhere</p>
              <ul className="mt-3 space-y-1.5">
                {social
                  .filter((item) => item.id !== 'email')
                  .map((item) => (
                    <li key={item.id}>
                      <Magnetic className="inline-block" strength={0.18}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline text-[0.92rem] text-[var(--fg)] hover:text-[var(--accent-2)]"
                        >
                          {item.name}
                        </a>
                      </Magnetic>
                    </li>
                  ))}
              </ul>
            </div>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  )
}

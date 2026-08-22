import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import Reveal from '../ui/Reveal'
import MaskText from '../ui/MaskText'
import SectionHead from '../ui/SectionHead'
import Magnetic from '../ui/Magnetic'
import { Stagger, StaggerItem } from '../ui/Stagger'
import { DURATION, EASE } from '../../lib/motion'

function ProjectRow({ project, index }) {
  const href = project.live || project.repo || undefined

  return (
    <article className="row-sweep border-b border-[var(--hair)]">
      <div className="grid gap-5 px-2 py-10 lg:grid-cols-[5rem_1fr_13rem] lg:items-start lg:gap-8 lg:px-4">
        <Reveal>
          <p className="meta !text-[0.9rem]">{String(index + 1).padStart(2, '0')}</p>
        </Reveal>

        <div>
          <MaskText lines={[project.title]} as="h3" className="display display-md" />

          <Reveal delay={0.08}>
            <p className="text-[0.76rem] tracking-[0.16em] uppercase text-[var(--accent-2)]">
              {project.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="row-body mt-5 max-w-2xl text-[0.88rem] leading-[1.85] text-[var(--fg-muted)]">
              {project.description}
            </p>
          </Reveal>

          {project.highlights?.length ? (
            <Stagger className="row-body mt-4 max-w-2xl space-y-2" step={0.06} delay={0.16} as="ul">
              {project.highlights.map((item) => (
                <StaggerItem
                  key={item}
                  as="li"
                  y={8}
                  className="flex gap-3 text-[0.82rem] leading-[1.8] text-[var(--fg-faint)]"
                >
                  <span className="mt-[0.85em] h-px w-3 shrink-0 bg-[var(--accent)]" />
                  {item}
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

          <Stagger className="mt-6 flex flex-wrap gap-2" step={0.03} delay={0.2}>
            {project.tech.map((tech) => (
              <StaggerItem key={tech} y={8} as="span" className="inline-block">
                <span className="tagbox">{tech}</span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="flex flex-col gap-4 lg:items-end lg:text-right">
          <Reveal delay={0.06}>
            <p className="meta">{project.domain}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="meta !text-[var(--accent)]">{project.status}</p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="flex gap-2 lg:justify-end">
              {project.repo ? (
                <Magnetic>
                  <a
                    className="icon-btn"
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source`}
                  >
                    <Github size={14} />
                  </a>
                </Magnetic>
              ) : null}
              {href ? (
                <Magnetic>
                  <a
                    className="icon-btn group"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.title}`}
                  >
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Magnetic>
              ) : null}
            </div>
          </Reveal>
        </div>
      </div>
    </article>
  )
}

export default function Work({ projects }) {
  const [expanded, setExpanded] = useState(false)
  const reduced = useReducedMotion()
  const visible = expanded ? projects : projects.slice(0, 4)

  return (
    <section id="work" className="band band-ink section">
      <div className="wrap">
        <SectionHead label="Work" title="Things I've built." caption="Selected builds — hover to explore" />

        <div>
          {visible.slice(0, 4).map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}

          {/* Rows past the fourth animate their own height so the reveal reads as a drawer. */}
          <AnimatePresence initial={false}>
            {expanded
              ? projects.slice(4).map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    animate={reduced ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: DURATION.base, ease: EASE, delay: i * 0.05 }}
                    className="overflow-hidden"
                  >
                    <ProjectRow project={project} index={i + 4} />
                  </motion.div>
                ))
              : null}
          </AnimatePresence>
        </div>

        {projects.length > 4 ? (
          <div className="mt-12 flex justify-center">
            <Magnetic>
              <button type="button" className="btn" onClick={() => setExpanded((prev) => !prev)}>
                {expanded ? 'Show less' : `Show ${projects.length - 4} more`}
              </button>
            </Magnetic>
          </div>
        ) : null}
      </div>
    </section>
  )
}

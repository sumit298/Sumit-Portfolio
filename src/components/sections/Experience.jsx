import { ArrowUpRight } from 'lucide-react'
import Reveal from '../ui/Reveal'
import MaskText from '../ui/MaskText'
import SectionHead from '../ui/SectionHead'
import { Stagger, StaggerItem } from '../ui/Stagger'

function Row({ job }) {
  return (
    <article className="row-sweep grid gap-4 border-b border-[var(--hair)] px-2 py-10 lg:grid-cols-[10rem_1fr] lg:gap-10 lg:px-4">
      <div>
        <p className="meta">
          {job.start} — {job.end}
        </p>
        {job.current ? (
          <p className="meta mt-3 flex items-center gap-2 text-[var(--accent)]">
            <span className="dot-live" />
            Current
          </p>
        ) : null}
      </div>

      <div>
        <MaskText lines={[job.role]} as="h3" className="display display-md" />

        <Reveal delay={0.1}>
          <p className="text-[0.78rem] tracking-[0.16em] uppercase text-[var(--accent)]">
            {job.url ? (
              <a href={job.url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1">
                {job.company} · {job.location}
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : (
              `${job.company} · ${job.location}`
            )}
          </p>
        </Reveal>

        <Stagger className="row-body mt-6 max-w-3xl space-y-3" step={0.06} delay={0.12} as="ul">
          {job.points.map((point, idx) => (
            <StaggerItem
              key={idx}
              as="li"
              y={10}
              className="flex gap-3 text-[0.88rem] leading-[1.85] text-[var(--fg-muted)]"
            >
              <span className="mt-[0.85em] h-px w-3 shrink-0 bg-current opacity-40" />
              {point}
            </StaggerItem>
          ))}
        </Stagger>

        {job.stack?.length ? (
          <Stagger className="mt-7 flex flex-wrap gap-2" step={0.035} delay={0.2}>
            {job.stack.map((tech) => (
              <StaggerItem key={tech} y={8} as="span" className="inline-block">
                <span className="tagbox">{tech}</span>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}
      </div>
    </article>
  )
}

export default function Experience({ experience, education }) {
  return (
    <section id="xp" className="band band-ink section">
      <div className="wrap">
        <SectionHead label="XP" title="Experience" caption="Intern → Engineer → Systems" />

        <div>
          {experience.map((job) => (
            <Row key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <span className="kicker">Education</span>
          </Reveal>

          {education.map((item) => (
            <div
              key={item.id}
              className="mt-6 grid gap-4 border-t border-[var(--hair)] pt-8 lg:grid-cols-[10rem_1fr] lg:gap-10"
            >
              <Reveal>
                <p className="meta">
                  {item.start} — {item.end}
                </p>
              </Reveal>
              <div>
                <MaskText lines={[item.degree]} as="h3" className="display display-md" />
                <Reveal delay={0.1}>
                  <p className="text-[0.78rem] tracking-[0.16em] uppercase text-[var(--accent-2)]">
                    {item.school} · {item.location}
                  </p>
                  <p className="meta mt-3">{item.detail}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

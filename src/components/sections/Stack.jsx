import Reveal from '../ui/Reveal'
import SectionHead from '../ui/SectionHead'
import { Stagger, StaggerItem } from '../ui/Stagger'
import Icon from '../ui/Icon'

export default function Stack({ skills }) {
  return (
    <section id="stack" className="band section">
      <div className="wrap">
        <SectionHead label="Stack" title="Toolkit" caption="What I'd take a 2am page for" />

        <div className="mt-2">
          {skills.map((group) => (
            <div
              key={group.id}
              className="grid gap-5 border-b border-[var(--hair)] py-10 lg:grid-cols-[14rem_1fr] lg:gap-10"
            >
              <Reveal>
                <h3 className="meta !text-[0.72rem] !text-[var(--fg)]">{group.category}</h3>
              </Reveal>

              <Stagger className="flex flex-wrap gap-2" step={0.04}>
                {group.items.map((item) => (
                  <StaggerItem key={item.name} y={10} as="span" className="inline-block">
                    <span className="tagbox gap-2">
                      <Icon name={item.icon} size={12} />
                      {item.name}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Download, RotateCcw, Save, Upload } from 'lucide-react'
import { useContent } from '../lib/contentContext'
import { ICON_KEYS } from '../lib/iconRegistry'
import { AddButton, Area, Field, ItemCard, StringList, Text, Toggle, inputBase } from './fields'

const TABS = [
  ['profile', 'Profile'],
  ['social', 'Social'],
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['skills', 'Stack'],
  ['education', 'Education'],
  ['contact', 'Contact'],
  ['json', 'Raw JSON'],
]

const uid = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`

function move(list, index, direction) {
  const next = [...list]
  const target = index + direction
  if (target < 0 || target >= next.length) return list
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

function IconSelect({ label, value, onChange }) {
  return (
    <Field label={label}>
      <select className={inputBase} value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">— none —</option>
        {ICON_KEYS.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
    </Field>
  )
}

export default function Admin() {
  const { content, save, reset, source, ready } = useContent()
  const [draft, setDraft] = useState(content)
  const [tab, setTab] = useState('profile')
  const [status, setStatus] = useState(null)
  const [raw, setRaw] = useState('')
  const [rawError, setRawError] = useState('')

  useEffect(() => {
    if (ready) setDraft(content)
  }, [ready, content])

  useEffect(() => {
    setRaw(JSON.stringify(draft, null, 2))
  }, [draft])

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(content), [draft, content])

  const patch = (key, value) => setDraft((prev) => ({ ...prev, [key]: value }))
  const patchProfile = (key, value) =>
    setDraft((prev) => ({ ...prev, profile: { ...prev.profile, [key]: value } }))

  const listOps = (key) => ({
    update: (index, changes) =>
      patch(
        key,
        draft[key].map((item, i) => (i === index ? { ...item, ...changes } : item)),
      ),
    remove: (index) => patch(key, draft[key].filter((_, i) => i !== index)),
    move: (index, direction) => patch(key, move(draft[key], index, direction)),
    add: (item) => patch(key, [...draft[key], item]),
  })

  const onSave = async () => {
    try {
      const target = await save(draft)
      setStatus(
        target === 'file'
          ? 'Saved to src/content/portfolio.json — commit it to ship.'
          : 'Saved to this browser only. Export the JSON and commit it to make it permanent.',
      )
    } catch (err) {
      setStatus(`Save failed: ${err.message}`)
    }
    setTimeout(() => setStatus(null), 6000)
  }

  const onExport = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'portfolio.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const onImport = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        setDraft(JSON.parse(String(reader.result)))
        setStatus('Imported — review, then hit Save.')
      } catch (err) {
        setStatus(`Import failed: ${err.message}`)
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const applyRaw = () => {
    try {
      setDraft(JSON.parse(raw))
      setRawError('')
    } catch (err) {
      setRawError(err.message)
    }
  }

  const profile = draft.profile
  const exp = listOps('experience')
  const projects = listOps('projects')
  const social = listOps('social')
  const education = listOps('education')

  return (
    <div className="band band-ink min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--hair)] bg-[var(--ground)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-5 py-3">
          <Link to="/" className="icon-btn" aria-label="Back to site">
            <ArrowLeft size={15} />
          </Link>
          <div className="flex-1">
            <h1 className="text-sm font-semibold text-white">Content Studio</h1>
            <p className="text-[0.66rem] text-[var(--fg-faint)]">
              source: {source}
              {dirty ? ' · unsaved changes' : ''}
            </p>
          </div>

          <label className="btn cursor-pointer !px-3 !py-1.5 !text-[0.78rem]">
            <Upload size={13} /> Import
            <input type="file" accept="application/json" className="hidden" onChange={onImport} />
          </label>
          <button type="button" className="btn !px-3 !py-1.5 !text-[0.78rem]" onClick={onExport}>
            <Download size={13} /> Export
          </button>
          <button
            type="button"
            className="btn !px-3 !py-1.5 !text-[0.78rem]"
            onClick={() => {
              reset()
              setStatus('Reverted to the JSON bundled at build time.')
            }}
          >
            <RotateCcw size={13} /> Revert
          </button>
          <button type="button" className="btn btn-primary !px-3 !py-1.5 !text-[0.78rem]" onClick={onSave}>
            <Save size={13} /> Save
          </button>
        </div>

        <div className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-5 pb-2">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[0.72rem] tracking-wider transition-colors ${
                tab === id
                  ? 'bg-white/[0.08] text-white'
                  : 'text-[var(--fg-faint)] hover:text-[var(--fg)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {status ? (
        <div className="mx-auto max-w-5xl px-5 pt-4">
          <p className="flex items-center gap-2 rounded-lg border border-[var(--hair)] bg-[var(--ground-2)] px-4 py-2.5 text-sm text-[var(--fg)]">
            <Check size={14} className="text-[var(--accent)]" />
            {status}
          </p>
        </div>
      ) : null}

      <main className="mx-auto max-w-5xl px-5 py-8 pb-24">
        {tab === 'profile' ? (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <Text label="First name" value={profile.firstName} onChange={(v) => patchProfile('firstName', v)} />
              <Text label="Last name" value={profile.lastName} onChange={(v) => patchProfile('lastName', v)} />
              <Text label="Display name" value={profile.name} onChange={(v) => patchProfile('name', v)} />
              <Text label="Role" value={profile.role} onChange={(v) => patchProfile('role', v)} />
              <Text label="Location" value={profile.location} onChange={(v) => patchProfile('location', v)} />
              <Text label="Status label" value={profile.status} onChange={(v) => patchProfile('status', v)} />
              <Text label="Email" value={profile.email} onChange={(v) => patchProfile('email', v)} />
              <Text label="Phone" value={profile.phone} onChange={(v) => patchProfile('phone', v)} />
              <Text
                label="Résumé URL"
                value={profile.resumeUrl}
                hint="Drop the PDF in /public and point here, or use an external link."
                onChange={(v) => patchProfile('resumeUrl', v)}
              />
              <Text label="Avatar URL" value={profile.avatar} onChange={(v) => patchProfile('avatar', v)} />
            </div>

            <Toggle
              label="Show availability badge"
              value={profile.available}
              onChange={(v) => patchProfile('available', v)}
            />

            <Area label="Tagline" rows={2} value={profile.tagline} onChange={(v) => patchProfile('tagline', v)} />
            <Area label="Summary" rows={3} value={profile.summary} onChange={(v) => patchProfile('summary', v)} />

            <StringList
              label="About paragraphs"
              multiline
              values={profile.about}
              onChange={(v) => patchProfile('about', v)}
            />

            <div>
              <span className="mb-2 block text-[0.66rem] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                Hero stats
              </span>
              <div className="space-y-2">
                {profile.highlights.map((item, i) => (
                  <div key={i} className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
                    <input
                      className={inputBase}
                      value={item.value}
                      placeholder="2.5+"
                      onChange={(e) =>
                        patchProfile(
                          'highlights',
                          profile.highlights.map((h, idx) =>
                            idx === i ? { ...h, value: e.target.value } : h,
                          ),
                        )
                      }
                    />
                    <input
                      className={inputBase}
                      value={item.label}
                      placeholder="Years shipping"
                      onChange={(e) =>
                        patchProfile(
                          'highlights',
                          profile.highlights.map((h, idx) =>
                            idx === i ? { ...h, label: e.target.value } : h,
                          ),
                        )
                      }
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() =>
                        patchProfile('highlights', profile.highlights.filter((_, idx) => idx !== i))
                      }
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <AddButton
                  label="Add stat"
                  onClick={() => patchProfile('highlights', [...profile.highlights, { value: '', label: '' }])}
                />
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'social' ? (
          <div className="space-y-3">
            {draft.social.map((item, i) => (
              <ItemCard
                key={item.id}
                title={item.name}
                subtitle={item.handle}
                index={i}
                total={draft.social.length}
                onMove={social.move}
                onRemove={social.remove}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Name" value={item.name} onChange={(v) => social.update(i, { name: v })} />
                  <Text label="Handle" value={item.handle} onChange={(v) => social.update(i, { handle: v })} />
                  <Text label="URL" value={item.url} onChange={(v) => social.update(i, { url: v })} />
                  <IconSelect label="Icon" value={item.icon} onChange={(v) => social.update(i, { icon: v })} />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Add social link"
              onClick={() => social.add({ id: uid('social'), name: '', handle: '', url: '', icon: 'github' })}
            />
          </div>
        ) : null}

        {tab === 'experience' ? (
          <div className="space-y-3">
            {draft.experience.map((job, i) => (
              <ItemCard
                key={job.id}
                title={job.company}
                subtitle={`${job.start}—${job.end}`}
                index={i}
                total={draft.experience.length}
                onMove={exp.move}
                onRemove={exp.remove}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Company" value={job.company} onChange={(v) => exp.update(i, { company: v })} />
                  <Text label="Role" value={job.role} onChange={(v) => exp.update(i, { role: v })} />
                  <Text label="Location" value={job.location} onChange={(v) => exp.update(i, { location: v })} />
                  <Text label="Company URL" value={job.url} onChange={(v) => exp.update(i, { url: v })} />
                  <Text label="Start" value={job.start} onChange={(v) => exp.update(i, { start: v })} />
                  <Text label="End" value={job.end} onChange={(v) => exp.update(i, { end: v })} />
                </div>
                <Toggle
                  label="Current role"
                  value={job.current}
                  onChange={(v) => exp.update(i, { current: v })}
                />
                <StringList
                  label="Bullet points"
                  multiline
                  values={job.points}
                  onChange={(v) => exp.update(i, { points: v })}
                />
                <StringList label="Stack" values={job.stack} onChange={(v) => exp.update(i, { stack: v })} />
              </ItemCard>
            ))}
            <AddButton
              label="Add role"
              onClick={() =>
                exp.add({
                  id: uid('job'),
                  company: '',
                  role: '',
                  location: '',
                  url: '',
                  start: '',
                  end: '',
                  current: false,
                  stack: [],
                  points: [],
                })
              }
            />
          </div>
        ) : null}

        {tab === 'projects' ? (
          <div className="space-y-3">
            {draft.projects.map((project, i) => (
              <ItemCard
                key={project.id}
                title={project.title}
                subtitle={project.status}
                index={i}
                total={draft.projects.length}
                onMove={projects.move}
                onRemove={projects.remove}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="Title" value={project.title} onChange={(v) => projects.update(i, { title: v })} />
                  <Text
                    label="Subtitle"
                    value={project.subtitle}
                    onChange={(v) => projects.update(i, { subtitle: v })}
                  />
                  <Text
                    label="Status"
                    value={project.status}
                    hint="Live / Building / Archived"
                    onChange={(v) => projects.update(i, { status: v })}
                  />
                  <Text label="Year" value={project.year} onChange={(v) => projects.update(i, { year: v })} />
                  <Text label="Repo URL" value={project.repo} onChange={(v) => projects.update(i, { repo: v })} />
                  <Text label="Live URL" value={project.live} onChange={(v) => projects.update(i, { live: v })} />
                  <Field label="Accent colour">
                    <div className="flex gap-2">
                      <input
                        type="color"
                        className="h-9 w-12 rounded-lg border border-[var(--hair)] bg-transparent"
                        value={project.accent || '#67e8f9'}
                        onChange={(e) => projects.update(i, { accent: e.target.value })}
                      />
                      <input
                        className={inputBase}
                        value={project.accent || ''}
                        onChange={(e) => projects.update(i, { accent: e.target.value })}
                      />
                    </div>
                  </Field>
                </div>
                <Toggle
                  label="Featured (large card)"
                  value={project.featured}
                  onChange={(v) => projects.update(i, { featured: v })}
                />
                <Area
                  label="Description"
                  rows={4}
                  value={project.description}
                  onChange={(v) => projects.update(i, { description: v })}
                />
                <StringList
                  label="Highlights (featured cards only)"
                  multiline
                  values={project.highlights}
                  onChange={(v) => projects.update(i, { highlights: v })}
                />
                <StringList label="Tech" values={project.tech} onChange={(v) => projects.update(i, { tech: v })} />
              </ItemCard>
            ))}
            <AddButton
              label="Add project"
              onClick={() =>
                projects.add({
                  id: uid('project'),
                  title: '',
                  subtitle: '',
                  featured: false,
                  status: 'Building',
                  year: String(new Date().getFullYear()),
                  description: '',
                  highlights: [],
                  tech: [],
                  repo: '',
                  live: '',
                  accent: '#67e8f9',
                })
              }
            />
          </div>
        ) : null}

        {tab === 'skills' ? (
          <div className="space-y-3">
            {draft.skills.map((group, gi) => (
              <ItemCard
                key={group.id}
                title={group.category}
                subtitle={`${group.items.length} items`}
                index={gi}
                total={draft.skills.length}
                onMove={(index, direction) => patch('skills', move(draft.skills, index, direction))}
                onRemove={(index) => patch('skills', draft.skills.filter((_, i) => i !== index))}
              >
                <Text
                  label="Category"
                  value={group.category}
                  onChange={(v) =>
                    patch('skills', draft.skills.map((g, i) => (i === gi ? { ...g, category: v } : g)))
                  }
                />
                <div className="space-y-2">
                  <span className="block text-[0.66rem] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                    Items
                  </span>
                  {group.items.map((item, ii) => {
                    const setItems = (items) =>
                      patch('skills', draft.skills.map((g, i) => (i === gi ? { ...g, items } : g)))
                    return (
                      <div key={ii} className="grid gap-2 sm:grid-cols-[2fr_2fr_auto]">
                        <input
                          className={inputBase}
                          value={item.name}
                          placeholder="PostgreSQL"
                          onChange={(e) =>
                            setItems(group.items.map((s, i) => (i === ii ? { ...s, name: e.target.value } : s)))
                          }
                        />
                        <select
                          className={inputBase}
                          value={item.icon}
                          onChange={(e) =>
                            setItems(group.items.map((s, i) => (i === ii ? { ...s, icon: e.target.value } : s)))
                          }
                        >
                          <option value="">— generic —</option>
                          {ICON_KEYS.map((key) => (
                            <option key={key} value={key}>
                              {key}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="icon-btn"
                          onClick={() => setItems(group.items.filter((_, i) => i !== ii))}
                        >
                          ✕
                        </button>
                      </div>
                    )
                  })}
                  <AddButton
                    label="Add item"
                    onClick={() =>
                      patch(
                        'skills',
                        draft.skills.map((g, i) =>
                          i === gi ? { ...g, items: [...g.items, { name: '', icon: '' }] } : g,
                        ),
                      )
                    }
                  />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Add category"
              onClick={() => patch('skills', [...draft.skills, { id: uid('group'), category: '', items: [] }])}
            />
          </div>
        ) : null}

        {tab === 'education' ? (
          <div className="space-y-3">
            {draft.education.map((item, i) => (
              <ItemCard
                key={item.id}
                title={item.school}
                subtitle={item.degree}
                index={i}
                total={draft.education.length}
                onMove={education.move}
                onRemove={education.remove}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Text label="School" value={item.school} onChange={(v) => education.update(i, { school: v })} />
                  <Text label="Degree" value={item.degree} onChange={(v) => education.update(i, { degree: v })} />
                  <Text
                    label="Detail"
                    value={item.detail}
                    hint="CGPA, honours, etc."
                    onChange={(v) => education.update(i, { detail: v })}
                  />
                  <Text
                    label="Location"
                    value={item.location}
                    onChange={(v) => education.update(i, { location: v })}
                  />
                  <Text label="Start" value={item.start} onChange={(v) => education.update(i, { start: v })} />
                  <Text label="End" value={item.end} onChange={(v) => education.update(i, { end: v })} />
                </div>
              </ItemCard>
            ))}
            <AddButton
              label="Add education"
              onClick={() =>
                education.add({ id: uid('edu'), school: '', degree: '', detail: '', location: '', start: '', end: '' })
              }
            />
          </div>
        ) : null}

        {tab === 'contact' ? (
          <div className="space-y-4">
            <Text
              label="Heading"
              value={draft.contact.heading}
              onChange={(v) => patch('contact', { ...draft.contact, heading: v })}
            />
            <Area
              label="Text"
              rows={3}
              value={draft.contact.text}
              onChange={(v) => patch('contact', { ...draft.contact, text: v })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Text
                label="CTA label"
                value={draft.contact.ctaLabel}
                onChange={(v) => patch('contact', { ...draft.contact, ctaLabel: v })}
              />
              <Text
                label="CTA URL"
                value={draft.contact.ctaUrl}
                onChange={(v) => patch('contact', { ...draft.contact, ctaUrl: v })}
              />
            </div>
          </div>
        ) : null}

        {tab === 'json' ? (
          <div className="space-y-3">
            <textarea
              className={`${inputBase} min-h-[60vh] resize-y text-[0.78rem] leading-relaxed`}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              spellCheck={false}
            />
            {rawError ? <p className="text-sm text-red-400">{rawError}</p> : null}
            <button type="button" className="btn" onClick={applyRaw}>
              Apply JSON to editor
            </button>
          </div>
        ) : null}
      </main>
    </div>
  )
}

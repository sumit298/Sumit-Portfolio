import { useEffect, useMemo, useState } from 'react'
import bundled from '../content/portfolio.json'
import { ContentContext } from './contentContext'

const DRAFT_KEY = 'portfolio:draft'
const REMOTE_URL = import.meta.env.VITE_CONTENT_URL || ''
const DEV_API = '/__content'

function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeDraft(content) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(content))
  } catch {
    /* private mode / quota — the bundled copy still renders */
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY)
  } catch {
    /* nothing to clear */
  }
}

/**
 * Resolution order, first hit wins:
 *   1. VITE_CONTENT_URL — any headless CMS that can serve this JSON shape
 *   2. the dev content API, so `npm run dev` always shows the file on disk
 *   3. a localStorage draft, for edits made against a deployed build
 *   4. the JSON bundled at build time
 */
async function resolveContent() {
  if (REMOTE_URL) {
    try {
      const res = await fetch(REMOTE_URL, { headers: { accept: 'application/json' } })
      if (res.ok) return { content: await res.json(), source: 'remote' }
    } catch {
      /* fall through */
    }
  }

  if (import.meta.env.DEV) {
    try {
      const res = await fetch(DEV_API)
      if (res.ok) return { content: await res.json(), source: 'file' }
    } catch {
      /* fall through */
    }
  }

  const draft = readDraft()
  if (draft) return { content: draft, source: 'draft' }

  return { content: bundled, source: 'bundled' }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(bundled)
  const [source, setSource] = useState('bundled')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    resolveContent().then((result) => {
      if (!alive) return
      setContent(result.content)
      setSource(result.source)
      setReady(true)
    })
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(
    () => ({
      content,
      source,
      ready,
      /** Writes to the JSON file in dev, or to a localStorage draft on a deployed build. */
      async save(next) {
        setContent(next)
        if (import.meta.env.DEV) {
          const res = await fetch(DEV_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(next),
          })
          if (!res.ok) throw new Error((await res.json()).error || 'save failed')
          setSource('file')
          return 'file'
        }
        writeDraft(next)
        setSource('draft')
        return 'draft'
      },
      reset() {
        clearDraft()
        setContent(bundled)
        setSource('bundled')
      },
    }),
    [content, source, ready],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

import fs from 'node:fs'
import path from 'node:path'

const CONTENT_PATH = 'src/content/portfolio.json'
const API = '/__content'

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', (chunk) => {
      raw += chunk
      if (raw.length > 5_000_000) reject(new Error('payload too large'))
    })
    req.on('end', () => resolve(raw))
    req.on('error', reject)
  })
}

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

/**
 * Dev-only content API. Lets the /admin editor persist changes straight into
 * src/content/portfolio.json so edits survive a restart and land in git.
 * Never registered in a production build.
 */
export default function contentPlugin() {
  return {
    name: 'portfolio-content-api',
    apply: 'serve',
    configureServer(server) {
      const file = path.resolve(server.config.root, CONTENT_PATH)

      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith(API)) return next()

        if (req.method === 'GET') {
          try {
            return json(res, 200, JSON.parse(fs.readFileSync(file, 'utf8')))
          } catch (err) {
            return json(res, 500, { error: err.message })
          }
        }

        if (req.method === 'POST' || req.method === 'PUT') {
          try {
            const parsed = JSON.parse(await readBody(req))
            if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
              return json(res, 400, { error: 'expected a content object' })
            }
            parsed.meta = { ...(parsed.meta || {}), updatedAt: new Date().toISOString().slice(0, 10) }
            fs.writeFileSync(file, `${JSON.stringify(parsed, null, 2)}\n`)
            return json(res, 200, { ok: true, updatedAt: parsed.meta.updatedAt })
          } catch (err) {
            return json(res, 400, { error: err.message })
          }
        }

        return json(res, 405, { error: 'method not allowed' })
      })
    },
  }
}

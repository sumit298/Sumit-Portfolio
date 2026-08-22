import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/globals.css'
import App from './App'
import { ContentProvider } from './lib/content'

// The studio only loads when someone actually visits /admin.
const Admin = lazy(() => import('./admin/Admin'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route
            path="/admin"
            element={
              <Suspense fallback={null}>
                <Admin />
              </Suspense>
            }
          />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  </StrictMode>,
)

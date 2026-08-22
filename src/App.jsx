import { useEffect } from 'react'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import Footer from './components/Footer'
import Hero from './components/sections/Hero'
import Ticker from './components/sections/Ticker'
import About from './components/sections/About'
import Experience from './components/sections/Experience'
import Stack from './components/sections/Stack'
import Work from './components/sections/Work'
import Contact from './components/sections/Contact'
import { useContent } from './lib/contentContext'

function useDocumentMeta(profile) {
  useEffect(() => {
    if (!profile) return
    document.title = `${profile.name} — ${profile.role}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', profile.summary)
  }, [profile])
}

export default function App() {
  const { content } = useContent()
  const { profile, social, experience, projects, skills, education, contact, ticker, footer } = content

  useDocumentMeta(profile)

  const currentRole = experience.find((job) => job.current) || experience[0]

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav name={profile.name} />

      <main>
        <Hero profile={profile} social={social} currentRole={currentRole} />
        <Ticker items={ticker} />
        <About profile={profile} />
        <Experience experience={experience} education={education} />
        <Stack skills={skills} />
        <Work projects={projects} />
        <Contact contact={contact} profile={profile} social={social} />
      </main>

      <Footer footer={footer} />
    </>
  )
}

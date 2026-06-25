import Hero from './sections/Hero'
import TechStack from './sections/TechStack'
import Contributions from './sections/Contributions'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import GithubStats from './sections/GithubStats'
import Footer from './sections/Footer'

import CursorGlow from './components/CursorGlow'
import ParticlesGrid from './components/ParticlesGrid'
import HUD from './components/HUD'
import { ReactLenis } from 'lenis/react'

function App() {
  return (
    <ReactLenis root>
      <main className="relative w-full min-h-screen bg-[#04060e] selection:bg-blue-500/30 selection:text-white">
        <ParticlesGrid />
        <CursorGlow />
        <HUD />
        <Hero />
        <TechStack />
        <Contributions />
        <Projects />
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Timeline />
        </section>
        <section id="activity">
          <GithubStats />
        </section>
        <Footer />
      </main>
    </ReactLenis>
  )
}

export default App

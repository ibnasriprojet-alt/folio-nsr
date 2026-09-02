import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { About } from '@/components/About'
import { Blog } from '@/components/Blog'
import { BlogPost } from '@/components/BlogPost'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { ProjectDetail } from '@/components/ProjectDetail'
import { Skills } from '@/components/Skills'
import { StageSection } from '@/components/StageSection'

function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <StageSection />
        <Skills />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projet/:slug" element={<ProjectDetail />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </BrowserRouter>
  )
}

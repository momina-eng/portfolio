import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { BackgroundSystem } from '@/components/background'
import { Navigation, ViewportFrame } from '@/components/layout'
import { HomePage, ProjectDetailsPage, ProjectsPage } from '@/pages'

function AppShell() {
  return (
    <div className="app-shell" id="top">
      <ViewportFrame>
        <BackgroundSystem />
        <Navigation />
        <main className="viewport-frame__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </ViewportFrame>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}

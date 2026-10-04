import type { ProjectItem } from './types'

import medisyncCover from '@/assets/projects/medisync/cover.png'
import medisyncLogo from '@/assets/projects/medisync/logo.png'

import vulnCover from '@/assets/projects/vuln-agent/cover.png'
import vulnLogo from '@/assets/projects/vuln-agent/logo.png'
import vulnDemo from '@/assets/projects/vuln-agent/demo.mp4'

import newsCover from '@/assets/projects/newssense/cover.png'
import newsLogo from '@/assets/projects/newssense/logo.png'

import voiceCover from '@/assets/projects/voicex/cover.png'
import voiceLogo from '@/assets/projects/voicex/logo.png'

import mediCover from '@/assets/projects/mediflow/cover.png'
import mediLogo from '@/assets/projects/mediflow/logo.png'

/**
 * Project listing metadata.
 * Visible titles = resume names.
 * Case-study depth from E:/Portfolio lives in caseStudies.ts (merged via projectLoader).
 *
 * Asset rule:
 * - cover/thumbnail = product screenshot (card preview / listing media)
 * - logo = brand mark (card badge + project detail hero) — single source of truth
 * Internal ids/slugs preserved for routing and asset folders.
 */
export const projects: ProjectItem[] = [
  {
    id: 'medisync',
    slug: 'medisync',
    title: 'MediSync',
    subtitle: 'AI-Assisted Radiology Workspace',
    category: 'AI Engineering · Medical Imaging',
    summary:
      'A multi-agent AI radiology assistance platform that drafts Findings, Impression, and Recommendations for radiologist review—never auto-signing reports or acting as a medical device.',
    description: [
      'Built a human-gated, mixture-of-experts radiology assistant combining region-specific MONAI imaging models, longitudinal patient memory, and guideline retrieval from Qdrant.',
      'Orchestrated the workflow with LangGraph so image analysis, clinical-context synthesis, and RAG run in parallel, then pause for mandatory radiologist approve, edit, or reject.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'LangGraph',
      'MONAI',
      'React',
      'TypeScript',
      'PostgreSQL',
      'Qdrant',
      'MinIO',
      'MedGemma',
      'Docker',
    ],
    featured: true,
    visual: 'media',
    cover: medisyncCover,
    thumbnail: medisyncCover,
    logo: medisyncLogo,
    github: null,
    liveDemo: null,
  },
  {
    id: 'vuln-agent',
    slug: 'vuln-agent',
    title: 'AI Vulnerability Analysis & Automated Patching',
    subtitle: 'AI-Based Vulnerability Analysis & Automated Patch Generation',
    category: 'AI Engineering · Cybersecurity',
    summary:
      'An AI-assisted security workflow that analyzes source code, classifies vulnerabilities, retrieves remediation patterns, and generates validated patches with Gemini.',
    description: [
      'Designed an AI-assisted source-code analysis system that identifies vulnerabilities and proposes automated remediation.',
      'Integrated vulnerability classification, CWE mapping, remediation retrieval, and Gemini-based patch generation with deterministic validation and iterative refinement.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'React',
      'Vite',
      'Google Gemini',
      'REST APIs',
    ],
    featured: true,
    visual: 'media',
    cover: vulnCover,
    thumbnail: vulnCover,
    logo: vulnLogo,
    demo: vulnDemo,
    github: null,
    liveDemo: null,
  },
  {
    id: 'newssense',
    slug: 'newssense',
    title: 'Semantic News Retrieval Platform',
    subtitle: 'Multilingual Vector Search for Pakistani News',
    category: 'AI Engineering · Semantic Search',
    summary:
      'A multilingual semantic search platform for Pakistani news, combining embeddings, vector databases, and similarity retrieval across English and Urdu content.',
    description: [
      'Built a semantic retrieval platform for discovering contextually relevant Pakistani news articles.',
      'Applied multilingual Sentence Transformers embeddings with ChromaDB and FAISS for similarity search, delivered through a Gradio interface.',
    ],
    technologies: [
      'Python',
      'FastAPI',
      'Gradio',
      'Sentence Transformers',
      'ChromaDB',
      'FAISS',
    ],
    featured: true,
    visual: 'media',
    cover: newsCover,
    thumbnail: newsCover,
    logo: newsLogo,
    github: null,
    liveDemo: null,
  },
  {
    id: 'voicex',
    slug: 'voicex',
    title: 'University Feedback Management System',
    subtitle: 'REST-Based Complaint Tracking & Administrative Workflow',
    category: 'Full-Stack Development',
    summary:
      'A full-stack complaint management platform with REST APIs, MongoDB persistence, and structured submission, tracking, and administrative review workflows.',
    description: [
      'Delivered a web platform for submitting, tracking, and managing university complaints and feedback.',
      'Implemented Node.js/Express.js REST APIs with MongoDB persistence and clear administrative review workflows.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
    ],
    featured: true,
    visual: 'media',
    cover: voiceCover,
    thumbnail: voiceCover,
    logo: voiceLogo,
    github: null,
    liveDemo: null,
  },
  {
    id: 'mediflow',
    slug: 'mediflow',
    title: 'Healthcare Appointment & Management System',
    subtitle: 'Oracle APEX Healthcare Data & Workflow Application',
    category: 'Database Application',
    summary:
      'An Oracle APEX healthcare application for appointments, operational records, relational SQL workflows, and interactive data views.',
    description: [
      'Built a database-driven healthcare appointment management application with Oracle APEX.',
      'Designed relational data structures and CRUD workflows in Oracle SQL, including interactive dashboards for day-to-day data management.',
    ],
    technologies: ['Oracle APEX', 'Oracle SQL'],
    featured: true,
    visual: 'media',
    cover: mediCover,
    thumbnail: mediCover,
    logo: mediLogo,
    github: null,
    liveDemo: null,
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): ProjectItem | null {
  return projects.find((project) => project.slug === slug) ?? null
}

export function getProjectById(id: string): ProjectItem | null {
  return projects.find((project) => project.id === id) ?? null
}

export function getAdjacentProjects(slug: string): {
  previous: ProjectItem | null
  next: ProjectItem | null
} {
  const index = projects.findIndex((project) => project.slug === slug)
  if (index < 0) return { previous: null, next: null }
  return {
    previous: index > 0 ? projects[index - 1] : null,
    next: index < projects.length - 1 ? projects[index + 1] : null,
  }
}

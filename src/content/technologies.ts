import {
  siCplusplus,
  siCss,
  siExpress,
  siFastapi,
  siGit,
  siGithub,
  siGooglegemini,
  siGradio,
  siHtml5,
  siJavascript,
  siLanggraph,
  siLinux,
  siMongodb,
  siNodedotjs,
  siOpenjdk,
  siPython,
  siReact,
  type SimpleIcon,
} from 'simple-icons'

export type TechnologyItem = {
  id: string
  name: string
  icon: SimpleIcon
  /** Optional brand accent override; defaults to icon.hex in TechnologyLogo. */
  accent?: string
}

/**
 * Visual technology showcase — curated from CV/skills + project stack.
 * Only includes items with recognizable brand logos (no invented tools).
 * Abstract concepts (DSA, OOP, semantic search text labels) stay out of this visual showcase.
 */
export const technologies: TechnologyItem[] = [
  { id: 'html5', name: 'HTML5', icon: siHtml5 },
  { id: 'css', name: 'CSS', icon: siCss },
  { id: 'javascript', name: 'JavaScript', icon: siJavascript },
  { id: 'react', name: 'React', icon: siReact },
  { id: 'python', name: 'Python', icon: siPython },
  { id: 'java', name: 'Java', icon: siOpenjdk },
  { id: 'cplusplus', name: 'C++', icon: siCplusplus },
  { id: 'nodejs', name: 'Node.js', icon: siNodedotjs },
  { id: 'express', name: 'Express.js', icon: siExpress },
  { id: 'fastapi', name: 'FastAPI', icon: siFastapi },
  { id: 'mongodb', name: 'MongoDB', icon: siMongodb },
  { id: 'git', name: 'Git', icon: siGit },
  { id: 'github', name: 'GitHub', icon: siGithub },
  { id: 'linux', name: 'Linux', icon: siLinux },
  { id: 'gemini', name: 'Google Gemini', icon: siGooglegemini },
  { id: 'gradio', name: 'Gradio', icon: siGradio },
  { id: 'langgraph', name: 'LangGraph', icon: siLanggraph },
]

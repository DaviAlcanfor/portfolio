// Todo o conteúdo do site fica aqui — edite este arquivo, não os componentes.
import type { IconName } from '../components/icons'

export const SITE = {
  title: 'Davi Alcanfor | AI Engineer',
  description:
    'Davi Alcanfor — AI engineer based in São Paulo. LLM agents, machine learning and deep learning products, built end to end.',
  roles: ['ai engineer', 'data scientist', 'ml engineer'], // alterna a cada 3s
  bio: 'I build AI products end to end:\nLLM agents, ML & deep learning models,\nobsessing over quality at every step.',
}

export interface MarqueeItem {
  text: string
  href?: string
}

export const MARQUEE: MarqueeItem[] = [
  { text: "Hi, I'm Davi Alcanfor, a Brazilian AI engineer based in São Paulo." },
  { text: 'building AI @ PicPay', href: 'https://picpay.com' },
  { text: 'studying at Instituto JEF' },
  { text: 'python · rust' },
  { text: 'portuguese, spanish and french' },
  { text: 'I write on Medium', href: 'https://medium.com/@alcanfordavi' },
]

export interface Social {
  label: string
  href: string
  icon: IconName
}

export const SOCIALS: Social[] = [
  { label: 'GitHub', href: 'https://github.com/DaviAlcanfor', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/davi-alcanfor/', icon: 'linkedin' },
  { label: 'Medium', href: 'https://medium.com/@alcanfordavi', icon: 'medium' },
  { label: 'Email', href: 'mailto:alcanfordavi@gmail.com', icon: 'mail' },
]

export interface Track {
  /** trecho depois de "watch?v=" no link do YouTube */
  id: string
  title: string
  artist: string
}

export const TRACKS: Track[] = [
  { id: '0RkXOlb_O84', title: 'do ya?', artist: 'ericdoa' },
  { id: 'FFu_lJ3EvAA', title: 'CLOUDED', artist: 'Brent Faiyaz' },
  { id: '4S-ODexQkFo', title: 'One Hundred Sleepless Nights', artist: 'Pierce The Veil' },
  { id: 'i_rw1C9eG_Q', title: 'Juna', artist: 'Clairo' },
  { id: '9kp5HIAdqis', title: 'Always Do', artist: 'Rocco' },
  { id: '_kXjViaN9uA', title: 'So Easy To Love You', artist: 'Carey Bell' },
  { id: '4JkIs37a2JE', title: 'Virtual Insanity', artist: 'Jamiroquai' },
  { id: 'A4EU_0vFzuU', title: 'Holy, Holy', artist: 'Geordie Greep' },
]

export interface Project {
  name: string
  href: string
  desc: string
  tags: string[]
  demo?: string
}

export const PROJECTS: Project[] = [
  {
    name: 'frigus-ai',
    href: 'https://github.com/Frigus-Interdisciplinar/frigus-ai',
    desc: 'Multi-agent assistant for the Frigus food app, with RAG, guardrails and an LLM-as-judge. Lead developer.',
    tags: ['langgraph', 'rag', 'qdrant', 'neo4j'],
  },
  {
    name: 'assessor-ai',
    href: 'https://github.com/DaviAlcanfor/assessor-ai',
    desc: 'Personal finance and calendar assistant built as a multi-agent system, live in production.',
    tags: ['langgraph', 'postgres', 'redis', 'qdrant'],
    demo: 'https://assessor-ai.fastapicloud.dev/docs',
  },
  {
    name: 'champions-prediction',
    href: 'https://github.com/DaviAlcanfor/champions-prediction-vlrdevapi',
    desc: 'Predicts the VALORANT Champions 2026 winner: dynamic Elo features, XGBoost tuned with Optuna and 10k Monte Carlo bracket simulations.',
    tags: ['xgboost', 'optuna', 'monte carlo'],
  },
  {
    name: 'hybridts',
    href: 'https://github.com/DaviAlcanfor/hybridts',
    desc: 'Time series forecasting library: Prophet for trend, gradient boosting for the residuals. Published on PyPI.',
    tags: ['prophet', 'xgboost', 'lightgbm', 'pypi'],
  },
  {
    name: 'nb2ob',
    href: 'https://github.com/DaviAlcanfor/nb2ob',
    desc: 'Syncs NotebookLM notebooks into structured Obsidian notes through a multi-agent LLM pipeline.',
    tags: ['langgraph', 'llm', 'obsidian'],
  },
  {
    name: 'anubis',
    href: 'https://github.com/DaviAlcanfor/anubis',
    desc: 'Fast async TCP port scanner with per-service banner grabbing.',
    tags: ['rust', 'tokio'],
  },
]

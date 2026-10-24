// Todo o conteúdo do site fica aqui — edite este arquivo, não os componentes.
import type { IconName } from '../components/icons'

export const SITE = {
  title: 'Davi Alcanfor | AI Engineer',
  description:
    'Davi Alcanfor — AI engineer based in São Paulo. LLM agents, machine learning and deep learning products, built end to end.',
  role: 'ai engineer',
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
  { text: 'python' },
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

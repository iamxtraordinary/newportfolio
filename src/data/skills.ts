import type { LucideIcon } from 'lucide-react'
import { Smartphone, Flame, Globe, Code, GitBranch, Layers } from 'lucide-react'

export interface Skill {
  name: string
  icon: LucideIcon
  level: string
}

export const skills: Skill[] = [
  { name: 'Flutter & Dart', icon: Smartphone, level: 'Primary' },
  { name: 'Firebase', icon: Flame, level: 'Advanced' },
  { name: 'REST APIs', icon: Globe, level: 'Advanced' },
  { name: 'React & TS', icon: Code, level: 'Intermediate' },
  { name: 'Git & VCS', icon: GitBranch, level: 'Advanced' },
  { name: 'Architecture', icon: Layers, level: 'Growing' },
]

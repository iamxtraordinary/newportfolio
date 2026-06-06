export interface EducationEntry {
  degree: string
  institution: string
  period: string
  honours: string
}

export interface ExperienceEntry {
  title: string
  description: string
  period: string
  color: string
}

export const education: EducationEntry[] = [
  {
    degree: 'Computer Science — BSc.',
    institution: 'Covenant University, Ogun State, Nigeria',
    period: 'Nov 2021 — Jul 2025',
    honours: 'SECOND CLASS UPPER HONOURS',
  },
]

export const experience: ExperienceEntry[] = [
  {
    title: 'Software Engineer (Contract)',
    description: 'Real-time dating app · Flutter',
    period: 'Apr 2025 — Aug 2025',
    color: '#00FFFF',
  },
  {
    title: 'Mobile Developer Intern',
    description: 'Inmotion Software Hub',
    period: 'Mar 2024 — Sep 2024',
    color: '#FF00FF',
  },
  {
    title: 'Personal Project',
    description: 'Inventory Management System',
    period: 'Jun 2024 — Nov 2024',
    color: '#FFFF00',
  },
]

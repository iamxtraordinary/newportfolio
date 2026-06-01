export interface Project {
  id: number
  title: string
  category: string
  description: string
  tech: string[]
  period: string
  image: string
  video?: string
  link?: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Workvite',
    category: 'Software Engineering',
    description:
      'Lightweight inventory management for small businesses with role-based access control and real-time sync.',
    tech: ['Flutter', 'Firebase', 'REST API'],
    period: 'Jun — Nov 2024',
    image: '/workvite.webp',
    video: '/workvideo.mp4',
    link: 'https://workvite.vercel.app',
  },
  {
    id: 2,
    title: 'Dating App',
    category: 'Mobile Development',
    description:
      'Real-time dating prototype with matching algorithms, authentication, and instant messaging.',
    tech: ['Flutter', 'Firebase', 'REST API'],
    period: 'Apr — Aug 2025',
    image: '/project-dating.webp',
  },
  {
    id: 3,
    title: 'Ride-Hailing App',
    category: 'Full Stack',
    description:
      'Real-time ride-hailing connecting riders and drivers via live geolocation tracking.',
    tech: ['Flutter', 'Firebase', 'Google Maps'],
    period: 'Final Year Project',
    image: '/project-ride.webp',
  },
  {
    id: 4,
    title: 'Inmotion Hub',
    category: 'Internship Project',
    description:
      'Streamlined SDLC at Inmotion Software, integrated booking and payment APIs.',
    tech: ['Flutter', 'REST API', 'Agile'],
    period: 'Mar — Sep 2024',
    image: '/project-inmotion.webp',
  },
]

export interface GalleryPhoto {
  id: string
  src: string
  alt: string
}

export const gallery: GalleryPhoto[] = [
  { id: '01', src: '/graduation.webp', alt: 'Graduation' },
  { id: '02', src: '/nysc.webp', alt: 'NYSC' },
  { id: '03', src: '/swag.webp', alt: 'Swag' },
  { id: '04', src: '/fumble.webp', alt: 'Fumble' },
]

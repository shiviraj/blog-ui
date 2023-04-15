import { SITE_DETAILS } from '../config'

type Site = {
  shortTitle: string
  tagLine?: string
  developer: {
    name: string
    url: string
  }
  title: string
}

const useSite = (): Site => {
  const siteDetails = JSON.parse(SITE_DETAILS) as Record<string, unknown>
  return {
    developer: { name: 'Shiviraj', url: 'https://shiviraj.com/about-me' },
    shortTitle: 'SP',
    title: 'Shivi Poetry',
    ...siteDetails
  } as Site
}

export default useSite

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

export type SiteType = {
  shortTitle: string
  tagLine?: string
  developer: {
    name: string
    url: string
  }
  title: string
}

const defaultSite: SiteType = {
  developer: { name: 'Shiviraj', url: 'https://www.shiviraj.com/about-me' },
  shortTitle: '',
  title: ''
}
const SiteDetailsContext = createContext<SiteType>(defaultSite)
const SiteDetailsProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [site, setSite] = useState(defaultSite)

  useEffect(() => {
    api.site.getSiteDetails().then(setSite).catch()
  }, [])

  return <SiteDetailsContext.Provider value={site}>{children}</SiteDetailsContext.Provider>
}

export const useSite = (): SiteType => useContext(SiteDetailsContext)
export default SiteDetailsProvider

import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import api from '../api'

export type SiteType = {
  hostname: string
  shortTitle: string
  tagLine?: string
  developer: {
    name: string
    url: string
  }
  title: string
}

export const defaultSite: SiteType = {
  hostname: '',
  developer: { name: 'Shiviraj', url: 'https://www.shiviraj.com/about-me' },
  shortTitle: 'B',
  title: 'Blog'
}

type SiteDetailsContextType = { site: SiteType; updateSite: (site: SiteType) => void }

const SiteDetailsContext = createContext<SiteDetailsContextType>({ site: defaultSite, updateSite: () => ({}) })
const SiteDetailsProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [site, updateSite] = useState(defaultSite)

  return <SiteDetailsContext.Provider value={{ site, updateSite }}>{children}</SiteDetailsContext.Provider>
}

export const fetchSite = (): Promise<SiteType> => {
  return api.site.getSiteDetails()
}
export const useSite = (): SiteDetailsContextType => useContext(SiteDetailsContext)
export default SiteDetailsProvider

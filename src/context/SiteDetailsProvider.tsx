import type { PropsWithChildren } from 'react'
import { createContext, useContext, useState } from 'react'
import { SiteGateway } from '../api'

export type SiteType = {
  metaOverviewImage: string
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
  metaOverviewImage: '',
  hostname: '',
  developer: { name: 'Shiviraj', url: 'https://www.shiviraj.com/about-me' },
  shortTitle: '',
  title: ''
}

type SiteDetailsContextType = { site: SiteType; updateSite: (site: SiteType) => void }

const SiteDetailsContext = createContext<SiteDetailsContextType>({ site: defaultSite, updateSite: () => ({}) })
const SiteDetailsProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [site, updateSite] = useState(defaultSite)

  return <SiteDetailsContext.Provider value={{ site, updateSite }}>{children}</SiteDetailsContext.Provider>
}

export const fetchSite = (): Promise<SiteType> => {
  return SiteGateway.getSiteDetails()
}
export const useSite = (): SiteDetailsContextType => useContext(SiteDetailsContext)
export default SiteDetailsProvider

import { config } from '../config'
import type { SiteType } from '../context'
import WebClient from './webClient'

const siteConfig = config.site

const SiteGateway = {
  getSiteDetails(): Promise<SiteType> {
    return WebClient.get<SiteType>({ baseUrl: siteConfig.baseUrl, path: '' })
  }
}

export default SiteGateway

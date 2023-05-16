import fetch from '../adapter'
import type { SiteType } from '../../context'

class Site {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  getSiteDetails(): Promise<SiteType> {
    return fetch<SiteType>(this.url)
  }
}

export default Site

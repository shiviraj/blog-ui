import React, { useEffect } from 'react'
import type { SiteType } from '../../context'
import Head from 'next/head'
import { useSite } from '../../context'

export type PageType = { title: string }
export const defaultPage: PageType = { title: '' }

type SEODetailsType = { site: SiteType; page: PageType }
const SEODetails = ({ site, page }: SEODetailsType): JSX.Element => {
  const { updateSite } = useSite()

  useEffect(() => {
    updateSite(site)
  }, [])

  const title = `${page.title}${page.title ? ' | ' : ''}${site.title}`

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' 'unsafe-eval' 'unsafe-inline' * blob: data: filesystem:; object-src 'none';"
      />
      <title>{title}</title>
    </Head>
  )
}

export default SEODetails

import React, { useEffect } from 'react'
import type { SiteType } from '../../context'
import Head from 'next/head'
import { useSite } from '../../context'

export type PageType = {
  keywords: string[]
  description: string
  title: string
}
export const defaultPage: PageType = {
  description:
    'Discover a treasure trove of diverse and engaging content on our All Posts page. ' +
    'From thought-provoking articles to helpful guides, our collection has something for everyone. ' +
    'Explore and expand your horizons with our wide range of topics, ' +
    'expertly crafted to inform, entertain, and inspire. ' +
    'Start your journey today and unlock a world of knowledge and discovery.',
  keywords: [],
  title: ''
}

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
        content="default-src 'self' 'unsafe-eval' 'unsafe-inline' * blob: data: filesystem:; object-src 'none';"
        httpEquiv="Content-Security-Policy"
      />
      <meta content="basic-page" name="template" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta content="index,follow" name="robots" />
      <meta content={page.description} name="description" />
      <meta content={title} itemProp="name" />
      <meta content={page.description} itemProp="description" />
      <meta content={site.metaOverviewImage} itemProp="image" />
      <meta content={site.metaOverviewImage} property="og:image" />
      <meta content={title} property="og:title" />
      <meta content={page.description} property="og:description" />
      <meta content={site.title} property="og:site_name" />
      <meta content={`https://${site.hostname}`} property="og:url" />
      <meta content={page.keywords.join(', ')} name="keywords" />
      <meta content={page.keywords.join(', ')} name="news_keywords" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={title} name="twitter:title" />
      <meta content={page.description} name="twitter:description" />
      <meta content={site.metaOverviewImage} name="twitter:image:src" />
      <title>{title}</title>
    </Head>
  )
}

export default SEODetails

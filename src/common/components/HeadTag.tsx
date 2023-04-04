import React from 'react'
import Head from 'next/head'
import { useSite } from '../../store'
import type { SiteType } from '../../modules/home/reducer'

const HeadTag = (): JSX.Element => {
  const site: SiteType = useSite()
  return (
    <Head>
      <title>{site.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
  )
}

export default HeadTag

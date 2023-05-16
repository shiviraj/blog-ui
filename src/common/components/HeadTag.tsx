import React from 'react'
import { useSite } from '../../context'

const HeadTag = (): JSX.Element => {
  const site = useSite()
  return (
    <>
      <meta charSet="UTF-8" />
      <meta
        httpEquiv="Content-Security-Policy"
        content="default-src 'self' 'unsafe-eval' 'unsafe-inline' * blob: data: filesystem:; object-src 'none';"
      />
      <title>{site.title}</title>
    </>
  )
}

export default HeadTag

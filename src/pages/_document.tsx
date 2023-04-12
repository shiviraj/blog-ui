import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import { HeadTag } from '../common/components'

const Document = (): JSX.Element => {
  return (
    <Html lang={'en'}>
      <Head>
        <HeadTag />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document

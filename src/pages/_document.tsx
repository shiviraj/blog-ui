import React from 'react'
import { Head, Html, Main, NextScript } from 'next/document'

const Document = (): JSX.Element => {
  return (
    <Html lang={'en'}>
      <Head></Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document

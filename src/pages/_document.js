import React from 'react'
import Document from 'next/document'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />))
      })
      const initialProps = await NextDocument.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [
          <React.Fragment key='styles'>
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>
        ]
      }
    } finally {
      styledComponentSheet.seal()
    }
  }
  
  render() {
    return (
      <Html>
        <Head />
        <body style={{ margin: 0, padding: 0, fontFamily: 'Roboto', height: '100vh', width: '100vw' }}>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

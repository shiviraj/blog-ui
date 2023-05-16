import React from 'react'
import theme from '../theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { HeadTag, Layout, ToastWrapper } from '../common/components'
import '../../styles/index.css'
import AuthorProvider from '../context/AuthorProvider'
import { SiteDetailsProvider } from '../context'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SiteDetailsProvider>
      <ThemeProvider theme={theme}>
        <HeadTag />
        <ToastWrapper>
          <AuthorProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthorProvider>
        </ToastWrapper>
      </ThemeProvider>
    </SiteDetailsProvider>
  )
}

export default MyApp

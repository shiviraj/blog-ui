import React from 'react'
import theme from '../theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { Layout, ToastWrapper } from '../common/components'
import '../../styles/index.css'
import AuthorProvider from '../context/AuthorProvider'
import { SiteDetailsProvider } from '../context'
import { useRouter } from 'next/router'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter()
  return (
    <SiteDetailsProvider>
      <ThemeProvider theme={theme}>
        <ToastWrapper>
          <AuthorProvider>
            <Layout>
              <Component {...pageProps} key={router.asPath} />
            </Layout>
          </AuthorProvider>
        </ToastWrapper>
      </ThemeProvider>
    </SiteDetailsProvider>
  )
}

export default MyApp

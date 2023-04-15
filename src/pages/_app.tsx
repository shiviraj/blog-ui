import React from 'react'
import theme from '../theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { HeadTag, Layout, PopUpWrapper, ToastWrapper } from '../common/components'
import '../../styles/index.css'
import AuthorProvider from '../context/AuthorProvider'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider theme={theme}>
      <HeadTag />
      <PopUpWrapper>
        <ToastWrapper>
          <AuthorProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthorProvider>
        </ToastWrapper>
      </PopUpWrapper>
    </ThemeProvider>
  )
}

export default MyApp

import type { PropsWithChildren } from 'react'
import React, { useEffect } from 'react'
import theme from '../theme'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { HeadTag, Layout, PopUpWrapper, ToastWrapper } from '../common/components'
import { Router } from 'next/router'
import { onRouteChange } from '../utils/routing'
import '../../styles/index.css'

const MyApp = ({ Component, pageProps, ...rest }: AppProps): JSX.Element => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <HeadTag />
      <PopUpWrapper>
        <ToastWrapper>
          <WithValidatedProfile {...rest}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </WithValidatedProfile>
        </ToastWrapper>
      </PopUpWrapper>
    </ThemeProvider>
  )
}

const WithValidatedProfile = ({ children }: PropsWithChildren): JSX.Element => {
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   API.users
  //     .validateUser()
  //     .then(user => dispatch(setUser(user)))
  //     .catch((error = {}) => {
  //       if (error?.token) {
  //         setStorage(StorageKeys.DUMMY, error)
  //       }
  //     })
  // }, [])

  return <>{children}</>
}

export default MyApp

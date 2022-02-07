import React, { useEffect } from 'react'
import theme from '../theme/theme'
import HeadTag from '../common/components/HeadTag'
import Layout from '../common/components/Layout'
import { Router, useRouter } from 'next/router'
import { onRouteChange } from '../utils/routing'
import ToastWrapper from '../common/components/ToastWrapper'
import API from '../API'
import { Provider, useDispatch } from 'react-redux'
import store from '../store'
import { setUser } from '../modules/user/action'
import { ThemeProvider } from '@mui/styles'
import { setStorage } from '../utils/storage'
import { StorageKeys } from '../constants/storage'

const MyApp = ({ Component, pageProps, ...rest }) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange)
  }, [])
  
  return <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HeadTag />
      <ToastWrapper>
        <WithValidatedProfile {...rest}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </WithValidatedProfile>
      </ToastWrapper>
    </ThemeProvider>
  </Provider>
}

const WithValidatedProfile = ({ children }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  useEffect(() => {
    if (!router.pathname.startsWith('/login')) {
      API.users.validateUser()
        .then((user) => dispatch(setUser(user)))
        .catch((error) => {
          if (typeof error === 'object') {
            setStorage(StorageKeys.AUTH, error)
          }
        })
    }
  }, [])
  
  return <>{children}</>
}

export default MyApp

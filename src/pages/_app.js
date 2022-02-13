import React, { useEffect } from 'react'
import theme from '../theme/theme'
import HeadTag from '../common/components/HeadTag'
import Layout from '../common/components/Layout'
import { Router } from 'next/router'
import { onRouteChange } from '../utils/routing'
import ToastWrapper from '../common/components/ToastWrapper'
import API from '../API'
import { Provider, useDispatch } from 'react-redux'
import store from '../store'
import { setUser } from '../modules/user/action'
import { ThemeProvider } from '@mui/styles'
import { setStorage } from '../utils/storage'
import { StorageKeys } from '../constants/storage'
import PopUpWrapper from '../common/components/PopUp'

const MyApp = ({ Component, pageProps, ...rest }) => {
  useEffect(() => {
    Router.events.on('routeChangeComplete', onRouteChange)
  }, [])
  
  return <Provider store={store}>
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
  </Provider>
}

const WithValidatedProfile = ({ children }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    API.users.validateUser()
      .then((user) => dispatch(setUser(user)))
      .catch((error = {}) => {
        if (error.token) {
          setStorage(StorageKeys.DUMMY, error)
        }
      })
  }, [])
  
  return <>{children}</>
}

export default MyApp

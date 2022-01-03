import React, { useEffect } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from '../theme/theme'
import HeadTag from '../common/components/HeadTag'
import Layout from '../common/components/Layout'
import { Router } from 'next/router'
import { onRouteChange } from '../utils/routing'
import ToastWrapper from '../common/components/ToastWrapper'
import { ROUTES } from '../config/routes'
import API from '../API'
import { Provider, useDispatch } from 'react-redux'
import store from '../store'
import { setUser } from '../modules/user/action'

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

const WithValidatedProfile = ({ children, ...rest }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    const pathname = Router.pathname || rest.router.pathname
    if (pathname !== ROUTES.LOGIN && pathname !== ROUTES.OAUTH) {
      API.users.validateUser()
        .then((user) => dispatch(setUser(user)))
    }
  }, [])
  
  return <>{children}</>
}

export default MyApp

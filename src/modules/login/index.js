import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../API'
import Loader from '../../common/components/Loader'
import { Box, Button, Link, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import PageError from '../../common/components/PageError'
import { setStorage } from '../../utils/storage'
import { StorageKeys } from '../../constants/storage'

const Container = styled(Box)(() => ({
  height: '100vh',
  flexGrow: 1,
  transform: 'translateZ(0)',
  '@media all and (-ms-high-contrast: none)': { display: 'none' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}))

const Login = () => {
  const [clientId, setClientId] = useState(null)
  const [error, setError] = useState(false)
  const site = useSelector((state) => state.site)
  
  useEffect(() => {
    const url = window ? window.location.toString().split('url=')[1] : ''
    setStorage(StorageKeys.LOGIN_REDIRECT_URL, url)
    setError(false)
    API.oauth.getClientId()
      .then(setClientId)
      .catch(() => setError(true))
  }, [])
  
  if (!clientId && !error) {
    return <Loader />
  }
  
  if (error) {
    return <PageError />
  }
  
  return <Container>
    <Typography variant={'h4'}>{site.title} Login</Typography>
    <Typography variant={'body1'}>{site.tagLine}</Typography>
    <Button variant={'contained'} color={'primary'} component={Link}
            href={`https://github.com/login/oauth/authorize?client_id=${clientId.value}&scope=user`}>
      <Typography variant={'h6'}> Login with Github</Typography>
    </Button>
  </Container>
}

export default Login

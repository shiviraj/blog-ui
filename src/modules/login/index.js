import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import API from '../../API'
import Loader from '../../common/components/Loader'
import { Box, Button, Link, Typography } from '@mui/material'
import { styled } from '@mui/styles'

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
  const site = useSelector((state) => state.site)
  
  useEffect(() => {
    API.oauth.getClientId()
      .then(setClientId)
  }, [])
  
  if (!clientId) {
    return <Loader />
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

import React from 'react'
import { styled } from '@mui/styles'
import { AppBar, Box, Toolbar } from '@mui/material'
import SiteIdentifier from './SiteIdentifier'
import UserProfile from './UserProfile'

const AppbarContainer = styled(AppBar)(({ theme }) => ({
  margin: theme.spacing(-1, 0),
  height: theme.spacing(7)
}))

const Grow = styled(Box)(() => ({
  flexGrow: 1
}))

const Appbar = () => <Box sx={{ flexGrow: 1 }}>
  <AppbarContainer position='fixed'>
    <Toolbar>
      <SiteIdentifier />
      <Grow />
      <UserProfile />
    </Toolbar>
  </AppbarContainer>
</Box>

export default Appbar

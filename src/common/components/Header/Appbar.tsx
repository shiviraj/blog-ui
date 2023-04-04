import React from 'react'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import SiteIdentifier from './SiteIdentifier'
import { Menu } from '@mui/icons-material'
import { useMedia } from '../../../hooks'

type AppbarProps = { setOpen: () => void }

const Appbar = ({ setOpen }: AppbarProps): JSX.Element => {
  const media = useMedia()
  return (
    <AppBar position="fixed">
      <Box>
        <Toolbar>
          {!media.md && (
            <IconButton onClick={setOpen} color={'inherit'}>
              <Menu />
            </IconButton>
          )}
          <SiteIdentifier />
        </Toolbar>
      </Box>
    </AppBar>
  )
}

export default Appbar

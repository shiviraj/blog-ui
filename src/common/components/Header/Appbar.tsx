import React from 'react'
import { AppBar, IconButton, styled, Toolbar } from '@mui/material'
import SiteIdentifier from './SiteIdentifier'
import { Menu } from '@mui/icons-material'
import { useMedia } from '../../../hooks'

const ToolbarContainer = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(0, 'auto'),
  [theme.breakpoints.up('md')]: {
    width: '80%'
  }
}))
type AppbarProps = { setOpen: () => void }

const Appbar = ({ setOpen }: AppbarProps): JSX.Element => {
  const media = useMedia()
  return (
    <AppBar>
      <ToolbarContainer>
        {!media.lg && (
          <IconButton onClick={setOpen} color={'inherit'}>
            <Menu />
          </IconButton>
        )}
        <SiteIdentifier />
      </ToolbarContainer>
    </AppBar>
  )
}

export default Appbar

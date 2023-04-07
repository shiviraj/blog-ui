import React from 'react'
import { Drawer, Link, MenuItem, Stack, styled } from '@mui/material'
import useMedia from '../../../hooks/useMedia'

const Container = styled('div')(({ theme }) => ({
  color: theme.palette.common.white,
  display: 'flex',
  justifyContent: 'flex-start',
  '& > *': {
    width: theme.spacing(20),
    textAlign: 'center',
    borderRadius: 0
  }
}))

type NavLinkProps = { path: string; text: string }
const NavLink = ({ path, text }: NavLinkProps) => {
  return (
    <Link href={path} underline={'none'} textAlign={'center'}>
      <MenuItem>{text}</MenuItem>
    </Link>
  )
}

type MenubarProps = { open: boolean; setOpen: (open: boolean) => void }
const Menubar = ({ open, setOpen }: MenubarProps): JSX.Element => {
  const media = useMedia()

  if (media.md) {
    return (
      <Container>
        <NavLink path="/" text="HOME" />
        <NavLink path="/posts/page/1" text="POSTS" />
      </Container>
    )
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer anchor={'left'} open={open} onClose={handleClose}>
      <Stack minWidth={'70vw'}>
        <NavLink path="/" text="HOME" />
        <NavLink path="/posts/page/1" text="POSTS" />
      </Stack>
    </Drawer>
  )
}

export default Menubar

import React from 'react'
import { useRouter } from 'next/router'
import { styled } from '@mui/styles'
import { Drawer, Link, MenuItem, Stack } from '@mui/material'
import useMedia from '../../../hooks/useMedia'

const Container = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(6),
  backgroundColor: theme.palette.common.white,
  borderBottom: `1px solid ${theme.palette.primary.light}`,
  boxShadow: theme.shadows[4],
  display: 'flex',
  justifyContent: 'flex-start',
  '& > *': {
    width: theme.spacing(20),
    textAlign: 'center',
    borderRadius: 0
  },
  '& .active': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    borderBottom: `2px solid ${theme.palette.primary.dark}`
  }
}))

const NavLink = ({ path, text }) => {
  const pathName = useRouter().pathname
  return <Link href={path} underline={'none'} textAlign={'center'}>
    <MenuItem>{text}</MenuItem>
  </Link>
}

const Menubar = ({ open, setOpen }) => {
  const media = useMedia()
  
  if (media.sm) {
    return <Drawer anchor={'left'} open={open} onClose={() => setOpen(close)}>
      <Stack minWidth={'70vw'}>
        <NavLink path='/' text='HOME' />
        <NavLink path='/posts/page/1' text='POSTS' />
      </Stack>
    </Drawer>
  }
  
  return <Container>
    <NavLink path='/' text='HOME' />
    <NavLink path='/posts/page/1' text='POSTS' />
  </Container>
}

export default Menubar

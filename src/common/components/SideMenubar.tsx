import React from 'react'
import { Divider, Stack, styled, Typography } from '@mui/material'
import { Link } from './atom'
import { useRouter } from 'next/router'
import api from '../../api'
import { clearStorage, StorageKeys } from '../../utils'
import { useToast } from './ToastWrapper'
import useSite from '../../hooks/useSite'

const Container = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  height: '100vh',
  position: 'fixed',
  '& > *': {
    width: theme.spacing(24),
    color: theme.palette.common.white
  },
  '& > *:hover': {
    backgroundColor: theme.palette.grey[600]
  }
}))

const LinkItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  cursor: 'pointer',
  height: theme.spacing(3),
  padding: theme.spacing(1.5),
  '&.active': {
    fontWeight: '900',
    backgroundColor: theme.palette.grey[700]
  }
}))

const NavLink = ({ path, text }: { path: string; text: string }): JSX.Element => {
  const router = useRouter()

  return (
    <Link href={path} style={{ width: '100%' }}>
      <LinkItem className={path === router.asPath ? 'active' : ''}>{text}</LinkItem>
    </Link>
  )
}

const SideMenubar = (): JSX.Element => {
  const site = useSite()
  const toast = useToast()

  const handleLogout = () => {
    api.authors
      .logout()
      .then(() => {
        clearStorage(StorageKeys.AUTH)
      })
      .catch(() => {
        toast.error('Failed to logout')
      })
  }

  return (
    <Container>
      <Stack>
        <Typography variant={'h4'}>{site.title}</Typography>
        <Typography variant={'h5'}>{'Shiviraj'}</Typography>
        <Divider />
      </Stack>
      <NavLink path={'/author'} text="Dashboard" />
      <NavLink path={'/author/pages'} text="Pages" />
      <NavLink path={'/author/posts'} text="Posts" />
      <NavLink path={'/author/comments'} text="Comments" />
      <LinkItem onClick={handleLogout}>Logout</LinkItem>
    </Container>
  )
}

export default SideMenubar

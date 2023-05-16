import React from 'react'
import { Avatar, Stack, styled, Typography } from '@mui/material'
import { Link } from './atom'
import { useRouter } from 'next/router'
import api from '../../api'
import { clearStorage, StorageKeys } from '../../utils'
import { useToast } from './ToastWrapper'
import { useAuthor, useSite } from '../../context'

const Container = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  overflowX: 'hidden',
  width: theme.spacing(28),
  height: '100vh',
  position: 'fixed',
  color: theme.palette.common.white
}))

const SiteContainer = styled(Stack)(({ theme }) => ({
  width: '100%',
  background: theme.palette.common.black
}))

const LinkItem = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  width: '100%',
  cursor: 'pointer',
  height: theme.spacing(3),
  padding: theme.spacing(1.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[600]
  },
  '&.active': {
    fontWeight: '900',
    backgroundColor: theme.palette.grey[700]
  }
}))

const NavLink = ({ path, text }: { path: string; text: string }): JSX.Element => {
  const router = useRouter()

  return (
    <Link href={path}>
      <LinkItem className={path === router.asPath ? 'active' : ''}>{text}</LinkItem>
    </Link>
  )
}

const SideMenubar = (): JSX.Element => {
  const site = useSite()
  const toast = useToast()
  const author = useAuthor()

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
      <SiteContainer>
        <Link href={'/'}>
          <Typography variant={'h4'} m={1.5} mb={0} textAlign={'center'}>
            {site.shortTitle}
          </Typography>
        </Link>
        <Stack direction={'row'} m={1.5} mt={0} spacing={1} alignItems={'center'} flexWrap={'wrap'}>
          <Avatar src={author.profile} alt={author.displayName} />
          <Typography variant={'h5'}>{author.displayName}</Typography>
        </Stack>
      </SiteContainer>
      <NavLink path={'/author'} text="Dashboard" />
      <NavLink path={'/author/pages'} text="Pages" />
      <NavLink path={'/author/posts'} text="Posts" />
      <NavLink path={'/author/comments'} text="Comments" />
      <LinkItem onClick={handleLogout}>Logout</LinkItem>
    </Container>
  )
}

export default SideMenubar

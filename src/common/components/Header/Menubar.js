import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@mui/styles'
import { Button } from '@mui/material'

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
  '& > *:hover': {
    backgroundColor: theme.palette.primary.extraLight,
    color: theme.palette.common.black
  },
  '& .active': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
    borderBottom: `2px solid ${theme.palette.primary.dark}`
  }
}))

const NavLink = ({ path, text }) => {
  const pathName = useRouter().pathname
  return <Link href={path}>
    <Button className={path === pathName ? 'active' : ''}>{text}</Button>
  </Link>
}

const Menubar = () => {
  return <Container id='back-to-top-anchor'>
    <NavLink path='/' text='HOME' />
    <NavLink path='/posts' text='POSTS' />
  </Container>
}

export default Menubar

import React from 'react'
import { Stack, styled } from '@mui/material'
import LinksView from './LinksView'
import type { SideBarLinksWithTitle } from '../../../context'
import { useMedia } from '../../../hooks'

const Container = styled(Stack)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '30%'
  }
}))

const Sidebar = ({ sideBarLinks }: { sideBarLinks: SideBarLinksWithTitle[] }): JSX.Element => {
  const media = useMedia()
  return (
    <Container spacing={media.md ? 3 : 1.5}>
      {sideBarLinks.map(({ title, links }) => {
        return <LinksView links={links} title={title} key={title} />
      })}
    </Container>
  )
}

export default Sidebar

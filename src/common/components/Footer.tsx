import type { PropsWithChildren } from 'react'
import React from 'react'
import { Fab, styled, Typography, useScrollTrigger, Zoom } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import moment from 'moment'
import { Link } from './atom'
import { useScroll } from '../../hooks'
import { useSite } from '../../context'

const Scroll = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}))

const FooterContainer = styled('footer')(({ theme }) => ({
  background: theme.palette.common.white,
  marginTop: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  textAlign: 'center'
}))

const ScrollTop = ({ children }: PropsWithChildren) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
    target: typeof window !== 'undefined' ? window : undefined
  })
  const { scroll } = useScroll()
  const handleScroll = () => {
    scroll()
  }

  return (
    <Zoom in={trigger}>
      <Scroll onClick={handleScroll} role="presentation">
        {children}
      </Scroll>
    </Zoom>
  )
}

const Footer = (): JSX.Element => {
  const { site } = useSite()
  return (
    <FooterContainer>
      <Typography variant={'subtitle1'}>
        © {moment().format('YYYY')} {site.title} • Developed by{' '}
        <Link href={site.developer.url} target={'_blank'} color={'primary'} underlineonhover={'true'}>
          {site.developer.name}
        </Link>
      </Typography>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </FooterContainer>
  )
}

export default Footer

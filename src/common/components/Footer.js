import React from 'react'
import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import { styled } from '@mui/styles'
import { KeyboardArrowUp } from '@mui/icons-material'
import useScroll from '../../hooks/useScroll'

const Scroll = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2)
}))

const ScrollTop = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({
    // eslint-disable-next-line no-undefined
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  })
  const scroller = useScroll()
  
  return (
    <Zoom in={trigger}>
      <Scroll
        onClick={scroller.scroll}
        role='presentation'
      >
        {children}
      </Scroll>
    </Zoom>
  )
}

const Footer = () => <ScrollTop>
  <Fab color='primary' size='small' aria-label='scroll back to top'>
    <KeyboardArrowUp />
  </Fab>
</ScrollTop>

export default Footer

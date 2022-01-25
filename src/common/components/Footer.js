import React from 'react'
import PropTypes from 'prop-types'
import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import { KeyboardArrowUp } from '@mui/icons-material'
import { styled } from '@mui/styles'

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
  
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')
    
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }
  
  return (
    <Zoom in={trigger}>
      <Scroll
        onClick={handleClick}
        role='presentation'
      >
        {children}
      </Scroll>
    </Zoom>
  )
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
}

const Footer = (props) => <ScrollTop {...props}>
  <Fab color='primary' size='small' aria-label='scroll back to top'>
    <KeyboardArrowUp />
  </Fab>
</ScrollTop>

export default Footer

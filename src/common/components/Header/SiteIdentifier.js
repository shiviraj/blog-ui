import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { Box, Typography } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  lineHeight: theme.spacing(0.1)
}))

const SiteIdentifier = () => {
  const site = useSelector((state) => state.site)
  return <Container>
    <Box><Typography variant={'h5'}>{site.title}</Typography></Box>
    <Box><span>{site.tagLine}</span></Box>
  </Container>
}

export default SiteIdentifier

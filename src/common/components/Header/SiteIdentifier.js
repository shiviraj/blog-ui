import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from '@mui/styles'
import { Box, Typography } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  lineHeight: theme.spacing(0.1)
}))

const SiteIdentifier = () => {
  const site = useSelector((state) => state.site)
  return <Container>
    <Typography variant={'h5'}>{site.title}</Typography>
    {Boolean(site.tagLine) && <Box mb={1.4}>{site.tagLine}</Box>}
  </Container>
}

export default SiteIdentifier

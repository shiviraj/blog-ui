import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import { useSite } from '../../../store'
import Link from 'next/link'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  lineHeight: theme.spacing(0.1)
}))

const HomeLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.common.white
}))

const SiteIdentifier = (): JSX.Element => {
  const site = useSite()
  return (
    <Container>
      <HomeLink href={'/'}>
        <Typography variant={'h5'}>{site.title}</Typography>
      </HomeLink>
      {Boolean(site.tagLine) && <Box mb={1.4}>{site.tagLine}</Box>}
    </Container>
  )
}

export default SiteIdentifier

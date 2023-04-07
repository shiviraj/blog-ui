import React from 'react'
import { Box, styled, Typography } from '@mui/material'
import { useSite } from '../../../store'
import { Link } from '../atom'

const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}))

const SiteIdentifier = (): JSX.Element => {
  const site = useSite()
  return (
    <Container>
      <Link href={'/'}>
        <Typography variant={'h5'}>{site.title}</Typography>
      </Link>
      {Boolean(site.tagLine) && <Box mb={1.4}>{site.tagLine}</Box>}
    </Container>
  )
}

export default SiteIdentifier

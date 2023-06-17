import type { NextPage } from 'next'
import type { StackProps } from '@mui/material'
import { Stack, styled, Typography } from '@mui/material'
import type { SiteType } from '../context'
import { fetchSite } from '../context'
import type { PageType } from '../common/components'
import { SEODetails } from '../common/components'
import { useEffect, useState } from 'react'

const Container = styled(Stack)<StackProps>(({ theme }) => ({
  background: theme.palette.common.white,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

const Error404Page: NextPage = () => {
  const [site, setSite] = useState<SiteType | null>(null)
  useEffect(() => {
    fetchSite().then(setSite)
  }, [])
  const page: PageType = { description: 'page not found!', keywords: [], title: 'Not Found!' }
  return (
    <Container spacing={2}>
      {site && <SEODetails site={site} page={page} />}
      <Typography variant={'h3'}>Oops! That page can’t be found.</Typography>
      <Typography variant={'subtitle1'}>
        Oops! It seems like the page you were trying to find isn't around anymore (or at least isn't here).
      </Typography>
    </Container>
  )
}

export default Error404Page

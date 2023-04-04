import {Box, Link, MenuItem, Stack, styled, Typography} from '@mui/material'
import useMedia from '../../../hooks/useMedia'

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1),
  [theme.breakpoints.down('lg')]: {
    margin: theme.spacing(0.5, 0)
  }
}))

const LinkItem = styled(MenuItem)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    minHeight: theme.spacing(0),
    padding: theme.spacing(0.5, 1)
  }
}))

const LinksView = ({ links, title }) => {
  const media = useMedia()
  return <Container>
    <Stack m={media.sm ? 0.5 : 1.5}>
      <Typography variant={'h5'}>{title}</Typography>
    </Stack>
    <Stack>
      {links.map(({ name, url }) => <LinkItem key={url}>
        <Link href={url} underline={'none'}>{name}</Link>
      </LinkItem>)}
    </Stack>
  </Container>
}

export default LinksView

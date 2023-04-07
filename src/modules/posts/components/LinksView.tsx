import { Box, Stack, styled, Typography } from '@mui/material'
import { useMedia } from '../../../hooks'
import { Link } from '../../../common/components'

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.common.white,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4)
  }
}))

type LinksViewProps = { links: Array<{ name: string; url: string }>; title: string }

const LinksView = ({ links, title }: LinksViewProps): JSX.Element => {
  const media = useMedia()
  return (
    <Container>
      <Stack m={media.sm ? 0.5 : 2}>
        <Typography variant={'h5'}>{title}</Typography>
      </Stack>
      <Stack spacing={1} p={1}>
        {links.map(({ name, url }) => (
          <Link key={url} href={url} underlineonhover color={'primary'}>
            {name}
          </Link>
        ))}
      </Stack>
    </Container>
  )
}

export default LinksView

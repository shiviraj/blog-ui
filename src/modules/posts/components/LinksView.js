import { Box, Link, MenuItem, Stack, Typography } from '@mui/material'
import { styled } from '@mui/styles'

const Container = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[500]}`,
  margin: theme.spacing(2),
  borderRadius: theme.spacing(1)
}))


const LinksView = ({ links, title }) => {
  return <Container>
    <Stack m={1.5}>
      <Typography variant={'h5'}>{title}</Typography>
    </Stack>
    <Stack>
      {links.map(({ name, url }) => <MenuItem key={url}>
        <Link href={url} underline={'none'}>{name}</Link>
      </MenuItem>)}
    </Stack>
  </Container>
}

export default LinksView

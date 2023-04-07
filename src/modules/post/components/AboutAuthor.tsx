import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import type { AuthorType } from '../../../api/dto'

const Profile = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  '&>*': {
    margin: theme.spacing(0.1, 0.15),
    height: theme.spacing(16),
    width: theme.spacing(16),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0.1, 0.15),
      height: theme.spacing(8),
      width: theme.spacing(8)
    }
  }
}))

const Bio = styled(Typography)(({ theme }) => ({
  height: theme.spacing(12)
}))

const AboutAuthor = ({ author }: { author: AuthorType }): JSX.Element => {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={2}>
      <Profile>
        <Avatar src={author.profile} />
      </Profile>
      <Stack>
        <Typography variant={'button'}>Written By</Typography>
        <Typography variant={'h5'}>{author.name}</Typography>
        {/*<Stack direction={'row'} spacing={4}>*/}
        {/*  <Chip label={'Follow'} color={'success'} />*/}
        {/*  <Chip label={'Subscribe'} color={'success'} />*/}
        {/*</Stack>*/}
        {author.bio && <Bio>{author.bio}</Bio>}
      </Stack>
    </Stack>
  )
}

export default AboutAuthor

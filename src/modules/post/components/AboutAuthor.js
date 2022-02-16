import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { styled } from '@mui/styles'

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

const AboutAuthor = ({ author }) => {
  return <FlexContainer m={[1, 0]}>
    <Profile><Avatar src={author.profile} /></Profile>
    <FlexContainer m={[0, 0, 0, 2]} direction={'column'}>
      <Typography variant={'button'}>Written By</Typography>
      <Stack direction={'row'} spacing={4}>
        <Typography variant={'h5'}>{author.name}</Typography>
        <Stack direction={'row'} spacing={1}>
          <Chip label={'Follow'} color={'success'} />
          <Chip label={'Subscribe'} color={'success'} />
        </Stack>
      </Stack>
      {author.bio && <Bio>{author.bio}</Bio>}
    </FlexContainer>
  </FlexContainer>
}

export default AboutAuthor

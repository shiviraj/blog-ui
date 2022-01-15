import { Avatar, Box, Chip, Stack, Typography } from '@mui/material'
import { FlexContainer } from '../../../common/components/styled/FlexContainer'
import { styled } from '@mui/styles'

const Profile = styled(Box)(({ theme }) => ({
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  '&>*': {
    margin: theme.spacing(0.1, 0.15),
    height: theme.spacing(16),
    width: theme.spacing(16)
  }
}))

const Bio = styled(Typography)(({ theme }) => ({
  height: theme.spacing(12)
}))

const AboutAuthor = ({ post }) => {
  return <FlexContainer m={[2, 0, 0, 0]}>
    <Profile><Avatar src={post.author.profile} /></Profile>
    <FlexContainer m={[0, 0, 0, 2]} direction={'column'}>
      <Typography variant={'button'}>Written By</Typography>
      <Stack direction={'row'} spacing={4}>
        <Typography variant={'h5'}>{post.author.name}</Typography>
        <Stack direction={'row'} spacing={1}>
          <Chip label={'Follow'} color={'success'} />
          <Chip label={'Subscribe'} color={'success'} />
        </Stack>
      </Stack>
      {post.author.bio && <Bio>{post.author.bio}</Bio>}
    </FlexContainer>
  </FlexContainer>
}

export default AboutAuthor

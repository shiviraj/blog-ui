import { Stack } from '@mui/material'

// const Container = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   marginRight: theme.spacing(4),
//   '&>*': {
//     cursor: 'pointer',
//     display: 'flex',
//     marginRight: theme.spacing(1)
//   }
// }))

const UserActivity = (): JSX.Element => {
  // const { likes, dislikes, handleLikeOrDislike, list, handleClick, viewReply, visible = true, ...rest } = props
  //
  // const user = { userId: '0001' }
  return (
    <Stack direction={'row'} mt={1} mb={1}>
      {/*<Container onClick={handleLikeOrDislike('like')}>*/}
      {/*  {likes.includes(user.userId) ? <ThumbUp /> : <ThumbUpOutlined />}*/}
      {/*  <Typography variant={'body1'}>{likes.length}</Typography>*/}
      {/*</Container>*/}
      {/*<Container onClick={handleLikeOrDislike('dislike')}>*/}
      {/*  {dislikes.includes(user.userId) ? <ThumbDown /> : <ThumbDownOutlined />}*/}
      {/*  <Typography variant={'body1'}>{dislikes.length}</Typography>*/}
      {/*</Container>*/}
      {/*{list && visible && (*/}
      {/*  <Container onClick={handleClick}>*/}
      {/*    <Comment />*/}
      {/*    <Typography variant={'body1'}>*/}
      {/*      {viewReply ? 'Hide' : list.length} {handleClick && (list.length > 1 ? 'replies' : 'reply')}*/}
      {/*    </Typography>*/}
      {/*  </Container>*/}
      {/*)}*/}
    </Stack>
  )
}

export default UserActivity

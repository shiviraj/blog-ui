import { Stack } from '@mui/material'
import UserActivity from './UserActivity'

// const Container = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   marginRight: theme.spacing(4),
//   cursor: 'pointer',
//   '&>*': {
//     display: 'flex',
//     marginRight: theme.spacing(1)
//   }
// }))

type UserResponseOnCommentProps = {
  comment: Comment[]
  setExpand: () => void
  setViewReply: (viewReply: boolean) => void
  viewReply: boolean
  level: number
}
const UserResponseOnComment = ({ setViewReply, viewReply }: UserResponseOnCommentProps): JSX.Element => {
  // const visible = level < 3

  const handleLikeOrDislike = (_type: 'like' | 'dislike') => () => {
    // eslint-disable-next-line no-console
    console.log(_type)
    // if (user.userId) {
    //   const action = comment[`${type}s`].includes(user.userId) ? 'REMOVE' : 'ADD'
    //   API.comments
    //     .addLikeOrDislike(comment.commentId, { action: `${action}_${type}`.toUpperCase() })
    //     .then(comment => dispatch(updatePostComment(comment)))
    // } else {
    //   popup.onOpen(`${type} on ${comment.user.name}'s comment`)
    // }
  }

  // const handleReply = () => {
  //   setExpand()
  // }

  const handleToggleReply = () => {
    setViewReply(!viewReply)
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <UserActivity
        // visible={visible}
        likes={[]}
        dislikes={[]}
        handleLikeOrDislike={handleLikeOrDislike}
        commentsCount={0}
        handleClick={handleToggleReply}
        viewReply={viewReply}
      />
      {/*{visible && (*/}
      {/*  <Container onClick={handleReply}>*/}
      {/*    <Reply />*/}
      {/*    <Typography variant={'body1'}>Reply</Typography>*/}
      {/*  </Container>*/}
      {/*)}*/}
    </Stack>
  )
}

export default UserResponseOnComment

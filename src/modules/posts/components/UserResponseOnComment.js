import { Box, Stack, Typography } from '@mui/material'
import { Comment, Reply, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import { styled } from '@mui/styles'
import API from '../../../API'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostComment } from '../action'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4),
  cursor: 'pointer',
  '&>*': {
    display: 'flex',
    marginRight: theme.spacing(1)
  }
}))

const UserResponseOnComment = ({ comment, setExpand, setViewReply, viewReply, level }) => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  const handleLikeOrDislike = (type) => () => {
    const key = `${type}s`
    const action = comment[key].includes(user.userId) ? 'REMOVE' : 'ADD'
    API.comments.addLikeOrDislike(comment.commentId, { action: `${action}_${type}`.toUpperCase() })
      .then((comment) => dispatch(updatePostComment(comment)))
  }
  
  
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <Stack direction={'row'} mt={1} mb={1}>
      <Container onClick={handleLikeOrDislike('like')}>
        {comment.likes.includes(user.userId) ? <ThumbUp /> : <ThumbUpOutlined />}
        <Typography variant={'body1'}>{comment.likes.length}</Typography>
      </Container>
      <Container onClick={handleLikeOrDislike('dislike')}>
        {comment.dislikes.includes(user.userId) ? <ThumbDown /> : <ThumbDownOutlined />}
        <Typography variant={'body1'}>{comment.dislikes.length}</Typography>
      </Container>
      {comment.child && <Container onClick={() => setViewReply(!viewReply)}>
        <Comment />
        <Typography variant={'body1'}>
          {viewReply ? 'Hide' : comment.child.length} {comment.child.length > 1 ? 'replies' : 'reply'}
        </Typography>
      </Container>}
    </Stack>
    {level < 3 && <Container onClick={() => setExpand()}>
      <Reply />
      <Typography variant={'body1'}>Reply</Typography>
    </Container>}
  </Stack>
}

export default UserResponseOnComment

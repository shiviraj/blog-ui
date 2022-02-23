import { Box, Stack, Typography } from '@mui/material'
import { Reply } from '@mui/icons-material'
import { styled } from '@mui/styles'
import API from '../../../../API'
import { useDispatch, useSelector } from 'react-redux'
import { updatePostComment } from '../../action'
import UserActivity from './UserActivity'
import { usePopUp } from '../../../../common/components/PopUp'

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
  const popup = usePopUp()
  
  const visible = level < 3
  
  const handleLikeOrDislike = (type) => () => {
    if (user.userId) {
      const action = comment[`${type}s`].includes(user.userId) ? 'REMOVE' : 'ADD'
      API.comments.addLikeOrDislike(comment.commentId, { action: `${action}_${type}`.toUpperCase() })
        .then((comment) => dispatch(updatePostComment(comment)))
    } else {
      popup.onOpen(`${type} on ${comment.user.name}'s comment`)
    }
  }
  
  const handleReply = () => {
    return user.userId ? setExpand() : popup.onOpen(`reply on ${comment.user.name}'s comment`)
  }
  
  return <Stack direction={'row'} justifyContent={'space-between'}>
    <UserActivity visible={visible} likes={comment.likes} dislikes={comment.dislikes}
                  handleLikeOrDislike={handleLikeOrDislike}
                  list={comment.child} handleClick={() => setViewReply(!viewReply)} viewReply={viewReply} />
    {visible && <Container onClick={handleReply}>
      <Reply />
      <Typography variant={'body1'}>Reply</Typography>
    </Container>}
  </Stack>
}

export default UserResponseOnComment

import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/styles'
import moment from 'moment'
import UserResponseOnComment from './UserResponseOnComment'
import DisplayAllComments from './DisplayAllComments'
import CommentInput from './CommentInput'

const Container = styled(Box)(({ theme }) => ({
  '& .time': {
    fontSize: theme.spacing(1.6),
    lineHeight: theme.spacing(1)
  }
}))

const ReplyContainer = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.grey[400]}`,
  marginLeft: theme.spacing(2)
}))

const DisplayComment = ({ comment, postId, level }) => {
  const [expand, setExpand] = useState(false)
  const [viewReply, setViewReply] = useState(false)
  
  return <Container>
    <Box pl={2} pr={2} mt={1} mb={1}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Avatar src={comment.user.profile} alt={comment.user.username} />
        <Stack>
          <Typography>{comment.user.name}</Typography>
          <Typography>{moment(comment.commentedOn).fromNow()}</Typography>
        </Stack>
      </Stack>
      <Typography>{comment.message}</Typography>
      <UserResponseOnComment comment={comment} level={level} setExpand={() => setExpand(!expand)}
                             setViewReply={setViewReply} viewReply={viewReply} />
    </Box>
    <CommentInput postId={postId} parentComment={comment.commentId} expand={expand} placeholderDisable
                  placeholder={`Replying to ${comment.user.name}`} />
    {comment.child && <ReplyContainer>
      <DisplayAllComments comments={comment.child} postId={postId} visible={viewReply} level={level + 1} />
    </ReplyContainer>}
  </Container>
}

export default DisplayComment

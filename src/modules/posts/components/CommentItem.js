import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/styles'
import moment from 'moment'
import CommentResponse from './CommentResponse'
import CommentInput from './CommentInput'

const Container = styled(Box)(({ theme }) => ({
  '& .time': {
    fontSize: theme.spacing(1.6),
    lineHeight: theme.spacing(1)
  }
}))

const CommentItem = ({ comment }) => {
  const [expand, setExpand] = useState(false)
  
  return <Container>
    <Box pl={2} pr={2} mt={1} mb={1}>
      <Stack direction={'row'} spacing={1} alignItems={'center'}>
        <Avatar src={comment.user.profile} alt={comment.user.username} />
        <Stack>
          <Typography>{comment.user.name}</Typography>
          <Typography className={'time'}>{moment(comment.commentedOn).fromNow()}</Typography>
        </Stack>
      </Stack>
      <Typography>{comment.message}</Typography>
      <CommentResponse likes={comment.likes} dislikes={comment.dislikes} comments={[]}
                       setExpand={() => setExpand(!expand)} />
    </Box>
    <CommentInput placeholder={`Replying to ${comment.user.name}`} expand={expand}
                  setExpand={setExpand} placeholderDisable />
  </Container>
}

export default CommentItem

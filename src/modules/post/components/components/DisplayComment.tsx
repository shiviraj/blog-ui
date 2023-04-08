import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import { useState } from 'react'
import moment from 'moment'
import UserResponseOnComment from './UserResponseOnComment'
import DisplayAllComments from './DisplayAllComments'
import CommentInput from './CommentInput'
import type { CommentType } from '../../../../api/dto'

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

type DisplayCommentProps = { comment: CommentType; postId: string; level: number }
const DisplayComment = ({ comment, postId, level }: DisplayCommentProps): JSX.Element => {
  const [expand, setExpand] = useState(false)
  const [viewReply, setViewReply] = useState(false)

  const handleToggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <Container>
      <Stack pl={2} pr={2} mt={1} mb={1} spacing={1.5}>
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <Avatar src={comment.user.profile} alt={comment.user.name} />
          <Stack spacing={0}>
            <Typography variant={'subtitle1'} lineHeight={1}>
              {comment.user.name}
            </Typography>
            <Typography lineHeight={1} variant={'subtitle2'}>
              {moment(comment.commentedOn).fromNow()}
            </Typography>
          </Stack>
        </Stack>
        <Typography>{comment.message}</Typography>
        <UserResponseOnComment
          comment={comment}
          level={level}
          setExpand={handleToggleExpand}
          setViewReply={setViewReply}
          viewReply={viewReply}
        />
      </Stack>
      {expand && (
        <CommentInput
          postId={postId}
          parentComment={comment.commentId}
          expand={expand}
          handleCancel={handleToggleExpand}
          placeholderDisable
          placeholder={`Replying to ${comment.user.name}`}
        />
      )}
      {comment.child && (
        <ReplyContainer>
          <DisplayAllComments comments={comment.child} postId={postId} visible={viewReply} level={level + 1} />
        </ReplyContainer>
      )}
    </Container>
  )
}

export default DisplayComment

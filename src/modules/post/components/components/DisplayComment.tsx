import { Avatar, Box, Stack, styled, Typography } from '@mui/material'
import { useState } from 'react'
import moment from 'moment'
import UserResponseOnComment from './UserResponseOnComment'
import DisplayAllComments from './DisplayAllComments'
import CommentInput from './CommentInput'
import type { CommentType } from '../../../../api/dto'
import { RawHTML } from '../../../../common/components'

const ReplyContainer = styled(Box)(({ theme }) => ({
  borderLeft: `2px solid ${theme.palette.grey[400]}`,
  marginLeft: theme.spacing(1.5)
}))

type DisplayCommentProps = { comment: CommentType; postId: string; level: number }
const DisplayComment = ({ comment, postId, level }: DisplayCommentProps): JSX.Element => {
  const [expand, setExpand] = useState(false)

  const handleToggleExpand = () => {
    setExpand(!expand)
  }

  return (
    <Stack pl={level.isGreaterThanZero() ? 1.5 : 0} spacing={1.5}>
      <Stack spacing={1.5}>
        <Stack direction={'row'} spacing={1.5} alignItems={'center'}>
          <Avatar src={comment.user.profile} alt={comment.user.name} />
          <Stack>
            <Typography variant={'subtitle1'} lineHeight={1}>
              {comment.user.name}
            </Typography>
            <Typography lineHeight={1} variant={'subtitle2'}>
              {moment(comment.commentedOn).fromNow()}
            </Typography>
          </Stack>
        </Stack>
        <Typography variant={'body1'}>
          <RawHTML n2br>{comment.message}</RawHTML>
        </Typography>
        <UserResponseOnComment comment={comment} level={level} setExpand={handleToggleExpand} />
      </Stack>
      {expand && (
        <CommentInput
          postId={postId}
          parentComment={comment.commentId}
          handleCancel={handleToggleExpand}
          placeholder={`Replying to ${comment.user.name}`}
          expand
        />
      )}
      {comment.child && (
        <ReplyContainer>
          <DisplayAllComments comments={comment.child} postId={postId} level={level + 1} />
        </ReplyContainer>
      )}
    </Stack>
  )
}

export default DisplayComment

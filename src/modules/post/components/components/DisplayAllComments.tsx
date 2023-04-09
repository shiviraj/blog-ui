import { Chip, Divider, Stack, styled } from '@mui/material'
import React, { useState } from 'react'
import DisplayComment from './DisplayComment'
import type { CommentType } from '../../../../api/dto'

const ViewMoreChip = styled(Chip)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(-2),
  background: theme.palette.grey[300],
  border: `1px solid ${theme.palette.divider}`,
  cursor: 'pointer',
  borderRadius: theme.spacing(2),
  '&:hover': {
    border: `1px solid ${theme.palette.grey[500]}`,
    background: theme.palette.grey[300],
    boxShadow: theme.shadows[2]
  }
}))

const commentCount = 5
type DisplayAllCommentsPropsType = { postId: string; comments: CommentType[]; level?: number }

const DisplayAllComments = (props: DisplayAllCommentsPropsType): JSX.Element => {
  const { postId, comments, level = 0 } = props
  const [visibleCommentCount, setVisibleCommentCount] = useState(commentCount)

  const handleViewMore = () => {
    setVisibleCommentCount(visibleCommentCount + commentCount)
  }

  const visibleComments = comments.slice(0, visibleCommentCount)

  return (
    <Stack spacing={2}>
      {visibleComments.map((comment, index) => (
        <Stack key={comment.commentId} spacing={2}>
          <DisplayComment comment={comment} postId={postId} level={level} />
          {visibleComments.lastIndex().isGreaterThan(index) && <Divider />}
        </Stack>
      ))}
      {comments.length.isGreaterThan(visibleCommentCount) && (
        <Stack direction={'row'} justifyContent={'center'}>
          <ViewMoreChip label={'View More'} onClick={handleViewMore} />
        </Stack>
      )}
    </Stack>
  )
}

export default DisplayAllComments

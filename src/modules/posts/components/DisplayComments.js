import { Box, Chip, Divider, Stack } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/styles'
import CommentItem from './CommentItem'

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

const commentCount = 1

const DisplayComments = ({ postId, comments }) => {
  const [visibleCommentCount, setVisibleCommentCount] = useState(commentCount)
  
  const handleViewMore = () => setVisibleCommentCount(visibleCommentCount + commentCount)
  const visibleComments = comments.slice(0, visibleCommentCount)
  
  return <Box>
    {visibleComments.map((comment, index) =>
      <React.Fragment key={comment.commentId + index}>
        <CommentItem comment={comment} />
        {(index < visibleComments.length - 1) && <Divider style={{ margin: '0 16px' }} />}
      </React.Fragment>)}
    {visibleCommentCount < comments.length && <Stack direction={'row'} justifyContent={'center'}>
      <ViewMoreChip label={'View More'} onClick={handleViewMore} />
    </Stack>}
  </Box>
}

export default DisplayComments

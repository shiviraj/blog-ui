import { Box, Chip, Divider, Stack } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/styles'
import DisplayComment from './DisplayComment'

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

const DisplayAllComments = ({ postId, comments, visible = true, level = 0 }) => {
  const [visibleCommentCount, setVisibleCommentCount] = useState(commentCount)
  
  const handleViewMore = () => setVisibleCommentCount(visibleCommentCount + commentCount)
  const visibleComments = comments.slice(0, visibleCommentCount)
  
  if (!visible) {
    return <></>
  }
  
  return <Box>
    {visibleComments.map((comment, index) =>
      <div key={comment.commentId + index}>
        <DisplayComment comment={comment} postId={postId} level={level} />
        {(index < visibleComments.length - 1) && <Divider style={{ margin: '0 16px' }} />}
      </div>)}
    {visibleCommentCount < comments.length && <Stack direction={'row'} justifyContent={'center'}>
      <ViewMoreChip label={'View More'} onClick={handleViewMore} />
    </Stack>}
  </Box>
}

export default DisplayAllComments

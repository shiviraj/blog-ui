import { Stack, styled, Typography } from '@mui/material'
import UserActivity from './UserActivity'
import { getVisitorId } from '../../../../utils'
import api from '../../../../api'
import type { CommentType } from '../../../../api/dto'
import { usePostDetails } from '../../../../context'
import { Reply } from '@mui/icons-material'
import React from 'react'

const Container = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginRight: theme.spacing(4),
  cursor: 'pointer',
  '&>*': {
    display: 'flex',
    marginRight: theme.spacing(1)
  }
}))

type UserResponseOnCommentProps = { level: number; comment: CommentType; setExpand: () => void }
const UserResponseOnComment = (props: UserResponseOnCommentProps): JSX.Element => {
  const { comment, level, setExpand } = props
  const { post, updatePost } = usePostDetails()
  const visible = level < 3

  const handleLike = () => {
    getVisitorId().then((visitorId: string) => {
      api.comments.toggleLike(comment.commentId, visitorId).then(({ likes }) => {
        comment.likes = likes
        updatePost('comments', [...post.comments])
      })
    })
  }

  const handleReply = () => {
    setExpand()
  }

  const handleToggleReply = () => {
    setExpand()
  }

  return (
    <Stack direction={'row'} justifyContent={'space-between'}>
      <UserActivity
        visible={visible}
        likes={comment.likes}
        handleLike={handleLike}
        commentsCount={comment.child?.length ?? 0}
        handleClick={handleToggleReply}
      />
      {visible && (
        <Container direction={'row'} onClick={handleReply}>
          <Reply />
          <Typography variant={'body1'}>Reply</Typography>
        </Container>
      )}
    </Stack>
  )
}

export default UserResponseOnComment

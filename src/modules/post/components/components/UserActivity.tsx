import { Box, Stack, styled, Typography } from '@mui/material'
import { Comment, ThumbDown, ThumbDownOutlined, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React from 'react'
import { Integer } from '../../../../utils/extensions'
import { useScroll } from '../../../../hooks'

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(4),
  '&>*': {
    cursor: 'pointer',
    display: 'flex',
    marginRight: theme.spacing(1)
  }
}))

type UserActivityProps = {
  likes: string[]
  dislikes: string[]
  handleLikeOrDislike: (action: 'like' | 'dislike') => () => void
  commentsCount: number
  viewReply?: boolean
  handleClick?: () => void
}

const UserActivity = (props: UserActivityProps): JSX.Element => {
  const { likes, dislikes, handleLikeOrDislike, commentsCount, viewReply, handleClick } = props
  const visitorId = ''
  const { scroll } = useScroll('#comment')

  const handleScroll = () => {
    scroll()
  }

  return (
    <Stack direction={'row'}>
      <Container onClick={handleLikeOrDislike('like')}>
        {likes.includes(visitorId) ? <ThumbUp /> : <ThumbUpOutlined />}
        <Typography variant={'body1'}>{likes.length}</Typography>
      </Container>
      <Container onClick={handleLikeOrDislike('dislike')}>
        {dislikes.includes(visitorId) ? <ThumbDown /> : <ThumbDownOutlined />}
        <Typography variant={'body1'}>{dislikes.length}</Typography>
      </Container>
      {commentsCount.isGreaterThanZero() && (
        <Container onClick={handleScroll}>
          <Comment />
          <Typography variant={'body1'}>
            {commentsCount}
            {viewReply ? 'Hide' : ''} {handleClick && (commentsCount.isGreaterThan(Integer.ONE) ? 'replies' : 'reply')}
          </Typography>
        </Container>
      )}
    </Stack>
  )
}

export default UserActivity

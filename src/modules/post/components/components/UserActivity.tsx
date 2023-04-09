import { Box, Stack, styled, Typography } from '@mui/material'
import { Comment, ThumbUp, ThumbUpOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Integer } from '../../../../utils/extensions'
import { useScroll } from '../../../../hooks'
import { getVisitorId } from '../../../../utils'

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
  handleLike: () => void
  commentsCount: number
  visible: boolean
  handleClick?: () => void
}

const UserActivity = (props: UserActivityProps): JSX.Element => {
  const { likes, handleLike, commentsCount, visible, handleClick } = props
  const [visitorId, setVisitorId] = useState('')
  const { scroll } = useScroll('#comment')

  useEffect(() => {
    getVisitorId().then((visitorId: string) => {
      setVisitorId(visitorId)
    })
  }, [])

  const handleScroll = () => {
    scroll()
  }

  return (
    <Stack direction={'row'}>
      <Container onClick={handleLike}>
        {likes.includes(visitorId) ? <ThumbUp /> : <ThumbUpOutlined />}
        <Typography variant={'body1'}>{likes.length}</Typography>
      </Container>
      {visible && (
        <Container onClick={handleClick ?? handleScroll}>
          <Comment />
          <Typography variant={'body1'}>
            {commentsCount} {handleClick && (commentsCount.isGreaterThan(Integer.ONE) ? 'replies' : 'reply')}
          </Typography>
        </Container>
      )}
    </Stack>
  )
}

export default UserActivity

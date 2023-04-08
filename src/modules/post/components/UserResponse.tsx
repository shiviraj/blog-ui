import React from 'react'
import UserActivity from './components/UserActivity'
import { usePostDetails } from '../../../context'

const UserResponse = (): JSX.Element => {
  const { post } = usePostDetails()
  const handleLikeOrDislike = (action: 'like' | 'dislike') => () => {
    // eslint-disable-next-line no-console
    console.log(action)
  }
  return (
    <UserActivity
      likes={post.likes}
      dislikes={post.dislikes}
      handleLikeOrDislike={handleLikeOrDislike}
      commentsCount={post.comments.length}
    />
  )
}

export default UserResponse

import React from 'react'
import UserActivity from './components/UserActivity'
import { usePostDetails } from '../../../context'
import api from '../../../api'
import { getVisitorId } from '../../../utils'

const UserResponse = (): JSX.Element => {
  const { post, updatePost } = usePostDetails()

  const handleLike = () => {
    getVisitorId().then((visitorId: string) => {
      api.posts.toggleLike(post.postId, visitorId).then(({ likes }) => {
        updatePost('likes', likes)
      })
    })
  }
  return <UserActivity visible likes={post.likes} handleLike={handleLike} commentsCount={post.comments.length} />
}

export default UserResponse

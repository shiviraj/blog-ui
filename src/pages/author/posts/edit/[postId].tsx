import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AuthorPostProvider } from '../../../../context'
import EditPost from '../../../../modules/author/posts/EditPost'

const EditPostPage: NextPage = () => {
  const router = useRouter()
  return (
    <AuthorPostProvider postId={router.query.postId as string}>
      <EditPost />
    </AuthorPostProvider>
  )
}

export default EditPostPage

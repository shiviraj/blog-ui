import React, { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { AuthorPostProvider } from '../../../../context'
import EditPost from '../../../../modules/author/posts/EditPost'
import { Loader } from '../../../../common/components'

const EditPostPage: NextPage = () => {
  const [isUI, setIsUI] = useState(false)

  useEffect(() => {
    setIsUI(true)
  }, [])

  if (!isUI) {
    return <Loader />
  }

  const router = useRouter()
  return (
    <AuthorPostProvider postId={router.query.postId as string}>
      <EditPost />
    </AuthorPostProvider>
  )
}

export default EditPostPage

import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import type { AuthorCommentType } from '../../api/dto'
import { CommentGateway } from '../../api'
import { Loader } from '../../common/components'
import TableData from '../../modules/author/components/TableData'
import { ActionBar } from '../../modules/author/comments'

const columns: Array<{ id: string; label: string }> = [
  { id: 'commentId', label: 'CommentId' },
  { id: 'user.name', label: 'Name' },
  { id: 'user.email', label: 'Email' },
  { id: 'message', label: 'Message' },
  { id: 'status', label: 'Status' }
]
const CommentsPage: NextPage = () => {
  const [comments, setComments] = useState<AuthorCommentType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    CommentGateway.getAllAuthorPostsComments()
      .then(setComments)
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <TableData
      columns={columns}
      rows={comments}
      Action={{ id: 'commentId', Component: ActionBar(comments, setComments) }}
    />
  )
}

export default CommentsPage

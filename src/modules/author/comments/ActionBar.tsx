import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Delete, Publish, Reply, Unpublished } from '@mui/icons-material'
import type { AuthorCommentType } from '../../../api/dto'
import { CommentGateway } from '../../../api'
import { useToast } from '../../../common/components'

type ActionBarReturnType = (props: { id: string }) => JSX.Element
const ActionBar = (
  comments: AuthorCommentType[],
  updateComments: (value: AuthorCommentType[]) => void
): ActionBarReturnType => {
  return ({ id }: { id: string }): JSX.Element => {
    const router = useRouter()
    const toast = useToast()
    const path = router.asPath
    const comment = comments.find(comment => comment.commentId === id)
    const commentStatus = comment?.status

    const handleApprove = () => {
      if (comment) {
        const updatedStatus = commentStatus === 'UNAPPROVED' ? 'APPROVED' : 'UNAPPROVED'
        CommentGateway.updateStatus(comment.commentId, updatedStatus)
          .then(() => {
            comment.status = updatedStatus
            updateComments(comments.slice())
          })
          .catch(() => {
            toast.error('Failed to update the status of comment')
          })
      }
    }

    return (
      <Stack spacing={0.5} direction={'row'} color={'primary'}>
        <Link href={`${path}/edit/${id}`}>
          <Tooltip title="Reply" placement={'top'}>
            <IconButton aria-label="edit">
              <Reply />
            </IconButton>
          </Tooltip>
        </Link>
        <Tooltip title={commentStatus === 'APPROVED' ? 'Unapproved' : 'Approved'} placement={'top'}>
          <IconButton aria-label="Approve" onClick={handleApprove}>
            {commentStatus === 'APPROVED' ? <Unpublished /> : <Publish />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement={'top'}>
          <IconButton aria-label="delete">
            <Delete />
          </IconButton>
        </Tooltip>
      </Stack>
    )
  }
}
export default ActionBar

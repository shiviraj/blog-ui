import Accordion from '../../../../common/components/Accordion'
import { formatDateTime } from '../../../../utils/utils'
import { Typography } from '@mui/material'

// eslint-disable-next-line no-warning-comments
// TODO: visibility (public, private, password protected) and schedule publish
const StatusAndVisibility = ({ post }) => <Accordion title={'Status & Visibility'}>
  <Typography>Visibility : {post.visibility}</Typography>
  <Typography>Post Status : {post.postStatus}</Typography>
  <Typography>Created At : {formatDateTime(post.postDate.createdAt)}</Typography>
</Accordion>


export default StatusAndVisibility

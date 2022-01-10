import { Typography } from '@material-ui/core'
import Accordion from '../../../../common/components/Accordion'
import { formatDateTime } from '../../../../utils/utils'

const StatusAndVisibility = ({ savePost, post }) => {
  // TODO: visibility (public, private, password protected) and schedule publish
  
  return <Accordion title={'Status & Visibility'}>
    <Typography>Visibility : {post.visibility}</Typography>
    <Typography>Post Status : {post.postStatus}</Typography>
    <Typography>Created At : {formatDateTime(post.postDate.createdAt)}</Typography>
  </Accordion>
}

export default StatusAndVisibility

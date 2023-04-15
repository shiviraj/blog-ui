import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Delete, Edit, Publish } from '@mui/icons-material'

const ActionBar = ({ id }: { id: string }): JSX.Element => {
  const router = useRouter()
  const path = router.asPath

  return (
    <Stack spacing={0.5} direction={'row'} color={'primary'}>
      <Link href={`${path}/edit/${id}`}>
        <Tooltip title="Edit" placement={'top'}>
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
        </Tooltip>
      </Link>
      <Tooltip title="Publish" placement={'top'}>
        <IconButton aria-label="publish">
          <Publish />
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

export default ActionBar

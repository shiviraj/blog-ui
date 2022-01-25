import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { Delete, Edit, Publish } from '@mui/icons-material'

const ActionBar = ({ id }) => {
  const router = useRouter()
  const path = router.asPath
  
  return <Stack spacing={0.5} direction={'row'} justifyContent={'center'}>
    <Link href={`${path}/edit/${id}`}>
      <Tooltip title='Edit'>
        <IconButton aria-label='edit' size='small'>
          <Edit fontSize='inherit' color={'inherit'} />
        </IconButton>
      </Tooltip>
    </Link>
    <Tooltip title='Publish'>
      <IconButton aria-label='publish' size='small'>
        <Publish fontSize='inherit' />
      </IconButton>
    </Tooltip>
    <Tooltip title='Delete'>
      <IconButton aria-label='delete' size='small'>
        <Delete fontSize='inherit' />
      </IconButton>
    </Tooltip>
  </Stack>
}

export default ActionBar

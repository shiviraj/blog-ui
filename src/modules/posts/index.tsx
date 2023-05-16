import React from 'react'
import { Stack } from '@mui/material'
import { Posts, SideBar } from './components'
import { PageError } from '../../common/components'
import { useMedia } from '../../hooks'
import { usePostsSummary } from '../../context'
import '../../utils/extensions'

const PostsSummary = (): JSX.Element => {
  const media = useMedia()
  const { posts, sideBarLinks } = usePostsSummary()

  if (posts.isEmpty()) {
    return <PageError message={'No Posts Found!!'} />
  }

  return (
    <Stack direction={media.lg ? 'row' : 'column'} spacing={media.md ? 3 : 1.5}>
      <Posts />
      <SideBar sideBarLinks={sideBarLinks} />
    </Stack>
  )
}

export default PostsSummary

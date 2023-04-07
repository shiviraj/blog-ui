import PostView from './PostView'
import { Box, Pagination, Stack, styled } from '@mui/material'
import React from 'react'
import { Integer } from '../../../utils/extensions'
import { usePostsSummary } from '../../../context'
import { useRouter } from 'next/router'
import { useMedia } from '../../../hooks'

const Container = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '70%'
  }
}))

const PaginationContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.common.white,
  margin: theme.spacing(1.5, 0),
  padding: theme.spacing(2, 2, 0)
}))

const Posts = (): JSX.Element => {
  const { posts, totalPage, page } = usePostsSummary()
  const router = useRouter()
  const media = useMedia()
  const handleChange = (event: unknown, page: number) => router.push(`/posts/page/${page}`)

  return (
    <Container spacing={media.md ? 3 : 1.5}>
      {posts.map(post => (
        <PostView post={post} key={post.postId} />
      ))}
      <PaginationContainer>
        <Stack alignSelf={'center'} mb={2}>
          {totalPage.isGreaterThan(Integer.ONE) && (
            <Pagination
              color={'primary'}
              page={page}
              onChange={(...props) => {
                handleChange(...props).then()
              }}
              count={totalPage}
              showFirstButton
              showLastButton
            />
          )}
        </Stack>
      </PaginationContainer>
    </Container>
  )
}

export default Posts

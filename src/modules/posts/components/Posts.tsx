import PostView from './PostView'
import { Box, Pagination, Stack, styled } from '@mui/material'
import React from 'react'
import { Integer } from '../../../utils/extensions'
import { usePostsSummary } from '../../../context'
import { useRouter } from 'next/router'
import { useMedia } from '../../../hooks'
import PostsTitle from './PostsTitle'

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
  const { posts, totalPage, page, title } = usePostsSummary()
  const router = useRouter()
  const media = useMedia()

  const handleChange = function (event: unknown, page: number) {
    const path = router.pathname
    const pathname = path.endsWith('[page]') ? path : path.concat('/page/[page]')
    return router.push({ pathname, query: { ...router.query, page } })
  }

  return (
    <Container spacing={media.md ? 3 : 1.5}>
      {title && <PostsTitle title={title} />}
      {posts.map(post => (
        <PostView post={post} key={post.postId} />
      ))}
      {totalPage.isGreaterThan(Integer.ONE) && (
        <PaginationContainer>
          <Stack alignSelf={'center'} mb={2}>
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
          </Stack>
        </PaginationContainer>
      )}
    </Container>
  )
}

export default Posts

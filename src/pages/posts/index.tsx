import React from 'react'
import type { InferGetStaticPropsType, NextPage } from 'next'
import { getStaticProps as staticPropsFn } from './page/[page]'
import { PostsSummaryProvider } from '../../context'
import PostsSummary from '../../modules/posts'

const PostsFirstPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, posts, sideBarLinks } = props
  return (
    <PostsSummaryProvider sideBarLinks={sideBarLinks} posts={posts} page={1} totalPage={pageCount}>
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const getStaticProps = staticPropsFn

export default PostsFirstPage

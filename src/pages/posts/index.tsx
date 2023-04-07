import React from 'react'
import type { InferGetStaticPropsType, NextPage } from 'next'
import PostsSummaryPage, { getStaticProps as staticPropsFn } from './page/[page]'

const PostsFirstPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, posts, sideBarLinks } = props
  return <PostsSummaryPage posts={posts} pageCount={pageCount} sideBarLinks={sideBarLinks} page={1} />
}

export const getStaticProps = staticPropsFn

export default PostsFirstPage

import React from 'react'
import type { InferGetStaticPropsType, NextPage } from 'next'
import PostsSummary from '../modules/posts'
import { getStaticProps as staticPropsFn } from './posts/page/[page]'
import { PostsSummaryProvider } from '../context'

const HomePage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, posts, sideBarLinks } = props
  return (
    <PostsSummaryProvider sideBarLinks={sideBarLinks} posts={posts} page={1} totalPage={pageCount}>
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const getStaticProps = staticPropsFn

export default HomePage

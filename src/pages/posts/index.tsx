import React from 'react'
import type { InferGetStaticPropsType, NextPage } from 'next'
import PostsSummaryPage, { getStaticProps as staticPropsFn } from './page/[page]'

const PostsFirstPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, posts, sideBarLinks, site, pageSEO } = props
  return (
    <PostsSummaryPage
      posts={posts}
      pageCount={pageCount}
      sideBarLinks={sideBarLinks}
      page={1}
      pageSEO={pageSEO}
      site={site}
    />
  )
}

export const getStaticProps = staticPropsFn

export default PostsFirstPage

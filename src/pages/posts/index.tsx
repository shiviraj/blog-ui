import Posts from '../../modules/posts'
import React from 'react'
import type { NextPage } from 'next'

const PostsPage: NextPage = (): JSX.Element => {
  return <Posts page={1} totalPosts={10} />
}

export default PostsPage

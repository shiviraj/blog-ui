import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Loader } from '../../common/components'
import api from '../../api'
import type { PostCount, PostDetailsType as PostDetailsType, PostSummaryType } from '../../api/dto'
import { fetchSidebarLinks } from './page/[page]'
import { Integer } from '../../utils/extensions'
import type { SideBarLinksWithTitle } from '../../context'
import { PostDetailsProvider } from '../../context'
import { useRouter } from 'next/router'
import { useMedia } from '../../hooks'
import { Stack } from '@mui/material'
import { SideBar } from '../../modules/posts/components'
import PostDetails from '../../modules/post'

type PostsDetailsPageProps = { sideBarLinks: SideBarLinksWithTitle[]; post: PostDetailsType }
const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sideBarLinks, post }) => {
  const router = useRouter()
  const media = useMedia()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <PostDetailsProvider post={post} sideBarLinks={sideBarLinks}>
      <Stack direction={media.lg ? 'row' : 'column'} spacing={media.md ? 3 : 1.5}>
        <PostDetails />
        <SideBar sideBarLinks={sideBarLinks} />
      </Stack>
    </PostDetailsProvider>
  )
}

export const getStaticProps: GetStaticProps<PostsDetailsPageProps> = async ({ params }) => {
  const post: PostDetailsType = await api.posts.getPostByUrl(params?.postUrl as string)

  const sideBarLinks = await fetchSidebarLinks()

  return { props: { post, sideBarLinks }, revalidate: 8640 }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response: PostCount = await api.posts.getPostsCount()
  const pages: number[] = new Array(response.pageCount).fill('').map((_str, index) => index + Integer.ONE)

  const urls: string[] = []
  await Promise.all(
    pages.map((page: number) => {
      return api.posts.getPosts(page).then((posts: PostSummaryType[]) => {
        return posts.map((post: PostSummaryType) => {
          urls.push(post.url)
          return post.url
        })
      })
    })
  )

  return { paths: urls.map(url => ({ params: { postUrl: url } })), fallback: true }
}

export default PostPage

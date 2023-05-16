import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import api from '../../api'
import type { AuthorType, PostCount, PostDetailsType as PostDetailsType, PostSummaryType } from '../../api/dto'
import { fetchSidebarLinks } from './page/[page]'
import { Integer } from '../../utils/extensions'
import type { SideBarLinksWithTitle } from '../../context'
import { PostDetailsProvider } from '../../context'
import { useMedia } from '../../hooks'
import { Stack } from '@mui/material'
import { SideBar } from '../../modules/posts/components'
import PostDetails from '../../modules/post'
import { useRouter } from 'next/router'
import { Loader } from '../../common/components'

type PostsDetailsPageProps = { sideBarLinks: SideBarLinksWithTitle[]; post: PostDetailsType }
const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sideBarLinks, post }) => {
  const media = useMedia()
  const router = useRouter()

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
  try {
    const post: PostDetailsType = await api.posts.getPostByUrl(params?.postUrl as string)
    const sideBarLinks = await fetchSidebarLinks()
    return { props: { post, sideBarLinks }, revalidate: 21600 }
  } catch (error: unknown) {
    const author: AuthorType = { authorId: '', bio: '', displayName: '', name: '', profile: '' }
    const post: PostDetailsType = {
      author,
      categories: [],
      comments: [],
      commentsAllowed: false,
      content: { time: '', blocks: [] },
      lastUpdateOn: new Date(),
      likes: [],
      postId: '',
      publishedOn: '',
      tags: [],
      title: '',
      url: ''
    }
    return { props: { post, sideBarLinks: [] }, revalidate: 30 }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
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
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default PostPage

import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import api from '../../api'
import type { PostCount, PostDetailsType as PostDetailsType, PostSummaryType } from '../../api/dto'
import { fetchSidebarLinks } from './page/[page]'
import { Integer } from '../../utils/extensions'
import type { SideBarLinksWithTitle, SiteType } from '../../context'
import { fetchSite, PostDetailsProvider } from '../../context'
import { useMedia } from '../../hooks'
import { Stack } from '@mui/material'
import { SideBar } from '../../modules/posts/components'
import PostDetails from '../../modules/post'
import { useRouter } from 'next/router'
import type { PageType } from '../../common/components'
import { Loader, SEODetails } from '../../common/components'

type PostsDetailsPageProps = {
  sideBarLinks: SideBarLinksWithTitle[]
  post: PostDetailsType
  site: SiteType
  page: PageType
}

const PostPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ sideBarLinks, post, site, page }) => {
  const media = useMedia()
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <>
      <SEODetails site={site} page={page} />
      <PostDetailsProvider post={post} sideBarLinks={sideBarLinks}>
        <Stack direction={media.lg ? 'row' : 'column'} spacing={media.md ? 3 : 1.5}>
          <PostDetails />
          <SideBar sideBarLinks={sideBarLinks} />
        </Stack>
      </PostDetailsProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps<PostsDetailsPageProps> = async ({ params }) => {
  try {
    const post: PostDetailsType = await api.posts.getPostByUrl(params?.postUrl as string)
    const sideBarLinks = await fetchSidebarLinks()
    const site = await fetchSite()
    const page: PageType = { description: post.summary, keywords: [], title: post.title }
    return { props: { post, sideBarLinks, site, page }, revalidate: 21600 }
  } catch (error: unknown) {
    return { notFound: true }
  }
}

export const getAllPosts = async (): Promise<PostSummaryType[]> => {
  const response: PostCount = await api.posts.getPostsCount()
  const pages: number[] = new Array(response.pageCount).fill('').map((_str, index) => index + Integer.ONE)
  const allPosts: PostSummaryType[] = []
  await Promise.all(
    pages.map((page: number) => {
      return api.posts.getPosts(page).then((posts: PostSummaryType[]) => {
        allPosts.push(...posts)
      })
    })
  )
  return allPosts
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const allPosts = await getAllPosts()
    const paths = allPosts.map(postSummary => ({ params: { postUrl: postSummary.url } }))
    return { paths, fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default PostPage

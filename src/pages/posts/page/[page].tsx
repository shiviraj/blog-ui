import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import PostsSummary from '../../../modules/posts'
import type { CategoryType, PostCount, PostSummaryType, TagType } from '../../../api/dto'
import api from '../../../api'
import { Integer } from '../../../utils/extensions'
import type { SideBarLinksWithTitle } from '../../../context'
import { PostsSummaryProvider } from '../../../context'
import { getNumbersFrom1 } from '../../../utils'
import { useRouter } from 'next/router'
import { Loader } from '../../../common/components'

type PostsSummaryPageProps = {
  page: number
  pageCount: number
  posts: PostSummaryType[]
  sideBarLinks: SideBarLinksWithTitle[]
}
const PostsSummaryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, page, posts, sideBarLinks } = props
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <PostsSummaryProvider sideBarLinks={sideBarLinks} posts={posts} page={page} totalPage={pageCount}>
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const fetchSidebarLinks = async (): Promise<SideBarLinksWithTitle[]> => {
  try {
    const recentPosts = await api.posts.getPosts(Integer.ONE).then((posts: PostSummaryType[]) => {
      return posts.map(({ title, url }) => ({ name: title, url: `/posts/${url}` }))
    })
    const categories = await api.categories.getAllCategories().then((categories: CategoryType[]) => {
      return categories.map(({ name, url }) => ({ name, url: `/categories/${url}` }))
    })
    const tags = await api.tags.getAllTags().then((tags: TagType[]) => {
      return tags.map(({ name, url }) => ({ name, url: `/tags/${url}` }))
    })

    return [
      { title: 'Recent Posts', links: recentPosts },
      { title: 'Categories', links: categories },
      { title: 'Tags', links: tags }
    ]
  } catch (error: unknown) {
    return []
  }
}

export const getStaticProps: GetStaticProps<PostsSummaryPageProps> = async ({ params }) => {
  try {
    const { pageCount }: PostCount = await api.posts.getPostsCount()
    const page = Number(params?.page ?? Integer.ONE)
    const posts: PostSummaryType[] = await api.posts.getPosts(page)
    const sideBarLinks = await fetchSidebarLinks()
    return { props: { pageCount, posts, sideBarLinks, page }, revalidate: 21600 }
  } catch (error: unknown) {
    return { props: { pageCount: 0, posts: [], sideBarLinks: [], page: 0 }, revalidate: 30 }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response: PostCount = await api.posts.getPostsCount().catch(() => ({ postCount: 0, pageCount: 0 }))
    const paths: Array<{ params: { page: string } }> = getNumbersFrom1(response.pageCount).map(page => ({
      params: { page: page.toString() }
    }))

    return { paths, fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default PostsSummaryPage

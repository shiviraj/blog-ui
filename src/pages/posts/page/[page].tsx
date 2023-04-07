import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { Loader } from '../../../common/components'
import PostsSummary from '../../../modules/posts'
import type { PostCount, PostSummaryType } from '../../../api/dto'
import api from '../../../api'
import { Integer } from '../../../utils/extensions'
import type { SideBarLinksWithTitle } from '../../../context'
import { PostsSummaryProvider } from '../../../context'
import type { CategoryType } from '../../../api/dto'

type PostsSummaryPageProps = { pageCount: number; posts: PostSummaryType[]; sideBarLinks: SideBarLinksWithTitle[] }
const PostsSummaryPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { pageCount, posts, sideBarLinks } = props
  const router = useRouter()

  useEffect(() => {
    if (Number(router.query.page).isNotBetween(Integer.ONE, pageCount)) {
      router.push('/posts/page/1')
    }
  }, [router.query.page])

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <PostsSummaryProvider
      sideBarLinks={sideBarLinks}
      posts={posts}
      page={Number(router.query.page)}
      totalPage={pageCount}
    >
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const fetchSidebarLinks = async (): Promise<SideBarLinksWithTitle[]> => {
  const recentPosts = await api.posts.getPosts(Integer.ONE).then((posts: PostSummaryType[]) => {
    return posts.map(({ title, url }) => ({ name: title, url: `/posts/${url}` }))
  })
  const categories = await api.categories.getAllCategories().then((categories: CategoryType[]) => {
    return categories.map(({ name, url }) => ({ name, url: `/categories/${url}/page/1` }))
  })

  return [
    { title: 'Recent Posts', links: recentPosts },
    { title: 'Categories', links: categories }
  ]
}

export const getStaticProps: GetStaticProps<PostsSummaryPageProps> = async ({ params }) => {
  const { pageCount }: PostCount = await api.posts.getPostsCount()
  const posts: PostSummaryType[] = await api.posts.getPosts(Number(params?.page ?? Integer.ONE))

  const sideBarLinks = await fetchSidebarLinks()

  return { props: { pageCount, posts, sideBarLinks }, revalidate: 8640 }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response: PostCount = await api.posts.getPostsCount()
  const paths: Array<{ params: { page: string } }> = new Array(response.pageCount)
    .fill('')
    .map((_str, index) => index + Integer.ONE)
    .map(page => ({ params: { page: page.toString() } }))

  return { paths, fallback: true }
}

export default PostsSummaryPage

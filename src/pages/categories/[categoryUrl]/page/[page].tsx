import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import api from '../../../../api'
import type { CategoryType, PostSummaryType } from '../../../../api/dto'
import { Integer } from '../../../../utils/extensions'
import { fetchSidebarLinks } from '../../../posts/page/[page]'
import type { SideBarLinksWithTitle } from '../../../../context'
import { PostsSummaryProvider } from '../../../../context'
import { getNumbersFrom1 } from '../../../../utils'
import PostsSummary from '../../../../modules/posts'
import { useRouter } from 'next/router'
import { Loader } from '../../../../common/components'

type CategoriesPageProps = {
  category: CategoryType
  posts: PostSummaryType[]
  page: number
  pageCount: number
  sideBarLinks: SideBarLinksWithTitle[]
}
const CategoriesPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { posts, sideBarLinks, pageCount, page, category } = props
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <PostsSummaryProvider
      sideBarLinks={sideBarLinks}
      posts={posts}
      page={page}
      totalPage={pageCount}
      title={`Category: ${category.name}`}
    >
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const getStaticProps: GetStaticProps<CategoriesPageProps> = async ({ params }) => {
  try {
    const categoryUrl: string = params?.categoryUrl as string
    const page = Number(params?.page ?? Integer.ONE)
    const { pageCount } = await api.categories.getPostsCount(categoryUrl)
    const category: CategoryType = await api.categories.getCategory(categoryUrl)
    const posts: PostSummaryType[] = await api.categories.getPosts(categoryUrl, page)
    const sideBarLinks = await fetchSidebarLinks()

    return { props: { posts, sideBarLinks, page, pageCount, category }, revalidate: 21600 }
  } catch (error: unknown) {
    const category: CategoryType = { authorId: '', categoryId: '', createdAt: '', name: '', parentId: '', url: '' }
    return { props: { posts: [], sideBarLinks: [], page: 0, pageCount: 0, category }, revalidate: 30 }
  }
}
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const categories: CategoryType[] = await api.categories.getAllCategories()
    const urls: Array<{ categoryUrl: string; page: string }> = []

    await Promise.all(
      categories.map(async (category: CategoryType) => {
        const { pageCount } = await api.categories.getPostsCount(category.url)
        return getNumbersFrom1(pageCount).map((page: number) => {
          urls.push({ categoryUrl: category.url, page: page.toString() })
          return page
        })
      })
    )
    return { paths: urls.map(url => ({ params: url })), fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default CategoriesPage

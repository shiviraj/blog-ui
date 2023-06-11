import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { SideBarLinksWithTitle, SiteType } from '../../../../context'
import { defaultSite, fetchSite, PostsSummaryProvider } from '../../../../context'
import PostsSummary from '../../../../modules/posts'
import type { PostSummaryType } from '../../../../api/dto'
import { Integer } from '../../../../utils/extensions'
import { fetchSidebarLinks } from '../../../posts/page/[page]'
import { useRouter } from 'next/router'
import type { PageType } from '../../../../common/components'
import { defaultPage, Loader, SEODetails } from '../../../../common/components'
import {
  getAllPosts,
  getAuthorPaths,
  getCategoriesPaths,
  getPageCount,
  getTitle,
  validPaths
} from '../../../../modules/meta'

type MetaPageProps = {
  title: string
  posts: PostSummaryType[]
  page: number
  pageCount: number
  sideBarLinks: SideBarLinksWithTitle[]
  site: SiteType
  pageSEO: PageType
}

const MetaPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { posts, sideBarLinks, pageCount, page, title, site, pageSEO } = props
  const router = useRouter()

  if (router.isFallback) {
    return <Loader />
  }

  return (
    <>
      <SEODetails site={site} page={pageSEO} />
      <PostsSummaryProvider sideBarLinks={sideBarLinks} posts={posts} page={page} totalPage={pageCount} title={title}>
        <PostsSummary />
      </PostsSummaryProvider>
    </>
  )
}

export const getStaticProps: GetStaticProps<MetaPageProps> = async ({ params }) => {
  try {
    const meta: string = params?.meta as string

    if (!validPaths.includes(meta)) {
      return { notFound: true }
    }

    const page = Number(params?.page ?? Integer.ONE)
    const metaId: string = params?.metaId as string
    const posts = await getAllPosts(meta, metaId, page)
    const { pageCount } = await getPageCount(meta, metaId)
    const title = await getTitle(meta, metaId)
    const sideBarLinks = await fetchSidebarLinks()
    const site = await fetchSite()
    const pageSEO: PageType = { description: '', keywords: [meta, metaId, site.title], title }

    return { props: { posts, sideBarLinks, page, pageCount, title, site, pageSEO }, revalidate: 21600 }
  } catch (error: unknown) {
    return {
      props: {
        posts: [],
        sideBarLinks: [],
        page: 0,
        pageCount: 0,
        title: '',
        site: defaultSite,
        pageSEO: defaultPage
      },
      revalidate: 30
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const authorPaths = await getAuthorPaths()
    const categories = await getCategoriesPaths()

    return { paths: authorPaths.concat(categories), fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default MetaPage

import React from 'react'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { SideBarLinksWithTitle } from '../../../../context'
import { PostsSummaryProvider } from '../../../../context'
import PostsSummary from '../../../../modules/posts'
import type { AuthorType, PostSummaryType } from '../../../../api/dto'
import { Integer } from '../../../../utils/extensions'
import api from '../../../../api'
import { fetchSidebarLinks } from '../../../posts/page/[page]'
import { getNumbersFrom1 } from '../../../../utils/utils'

type AuthorPageProps = {
  author: AuthorType
  posts: PostSummaryType[]
  page: number
  pageCount: number
  sideBarLinks: SideBarLinksWithTitle[]
}
const AuthorPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  const { posts, sideBarLinks, pageCount, page, author } = props

  return (
    <PostsSummaryProvider
      sideBarLinks={sideBarLinks}
      posts={posts}
      page={page}
      totalPage={pageCount}
      title={`Author: ${author.name}`}
    >
      <PostsSummary />
    </PostsSummaryProvider>
  )
}

export const getStaticProps: GetStaticProps<AuthorPageProps> = async ({ params }) => {
  const authorId: string = params?.authorId as string
  const page = Number(params?.page ?? Integer.ONE)
  const { pageCount } = await api.authors.getPostsCount(authorId)
  const author: AuthorType = await api.authors.getAuthor(authorId)
  const posts: PostSummaryType[] = await api.authors.getPosts(authorId, page)
  const sideBarLinks = await fetchSidebarLinks()

  return { props: { posts, sideBarLinks, page, pageCount, author }, revalidate: 8640 }
}
export const getStaticPaths: GetStaticPaths = async () => {
  const authors: AuthorType[] = await api.authors.getAllAuthors()
  const urls: Array<{ authorId: string; page: string }> = []

  await Promise.all(
    authors.map(async (author: AuthorType) => {
      const { pageCount } = await api.authors.getPostsCount(author.authorId)
      return getNumbersFrom1(pageCount).map((page: number) => {
        urls.push({ authorId: author.authorId, page: page.toString() })
        return page
      })
    })
  )
  return { paths: urls.map(url => ({ params: url })), fallback: false }
}

export default AuthorPage

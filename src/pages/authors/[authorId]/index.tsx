import React from 'react'
import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import AuthorPage, { getStaticProps as getStaticPropsFn } from './page/[page]'
import type { AuthorType } from '../../../api/dto'
import api from '../../../api'

const Author: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  return <AuthorPage {...props} />
}

export const getStaticProps = getStaticPropsFn
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const authors: AuthorType[] = await api.authors.getAllAuthors()
    const urls = authors.map(author => author.authorId)
    return { paths: urls.map(url => ({ params: { authorId: url } })), fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default Author

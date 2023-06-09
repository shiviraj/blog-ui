import React from 'react'
import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import MetaPage, { getStaticProps as getStaticPropsFn } from './page/[page]'
import type { AuthorType } from '../../../api/dto'
import api from '../../../api'

const Meta: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  return <MetaPage {...props} />
}

export const getStaticProps = getStaticPropsFn
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const authors: AuthorType[] = await api.authors.getAllAuthors()
    const authorPaths = authors.map(author => ({
      params: { metaId: author.username, meta: 'authors' }
    }))

    const categories = await api.categories.getAllCategories()
    const categoryPaths = categories.map(category => ({
      params: { metaId: category.url, meta: 'categories' }
    }))

    const tags = await api.tags.getAllTags()
    const tagPaths = tags.map(tag => ({ params: { metaId: tag.url, meta: 'tags' } }))

    const paths = authorPaths.concat(categoryPaths).concat(tagPaths)

    return { paths, fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default Meta

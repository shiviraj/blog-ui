import React from 'react'
import type { GetStaticPaths, InferGetStaticPropsType, NextPage } from 'next'
import MetaPage, { getStaticProps as getStaticPropsFn } from './page/[page]'
import type { AuthorType, CategoryType } from '../../../api/dto'
import { AuthorGateway, CategoryGateway, TagGateway } from '../../../api'

const Meta: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = props => {
  return <MetaPage {...props} />
}

export const getStaticProps = getStaticPropsFn
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const authors: AuthorType[] = await AuthorGateway.getAllAuthors()
    const authorPaths = authors.map(author => ({
      params: { metaId: author.username, meta: 'authors' }
    }))

    const categories: CategoryType[] = await CategoryGateway.getAllCategories()
    const categoryPaths = categories.map(category => ({
      params: { metaId: category.url, meta: 'categories' }
    }))

    const tags = await TagGateway.getAllTags()
    const tagPaths = tags.map(tag => ({ params: { metaId: tag.url, meta: 'tags' } }))

    const paths = authorPaths.concat(categoryPaths).concat(tagPaths)

    return { paths, fallback: true }
  } catch (error: unknown) {
    return { paths: [], fallback: true }
  }
}

export default Meta

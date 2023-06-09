import api from '../../api'
import type { PostSummaryType } from '../../api/dto'
import type { AuthorType, CategoryType } from '../../api/dto'
import { getNumbersFrom1 } from '../../utils'

enum Meta {
  TAGS = 'tags',
  CATEGORIES = 'categories',
  AUTHORS = 'authors'
}

export type MetaParamsType = { metaId: string; meta: Meta; page: string }

const validPaths: string[] = [Meta.TAGS, Meta.CATEGORIES, Meta.AUTHORS]

const getAllPosts = async (meta: string, metaId: string, page: number): Promise<PostSummaryType[]> => {
  if (meta === Meta.AUTHORS) {
    return await api.authors.getPosts(metaId, page)
  }
  if (meta === Meta.CATEGORIES) {
    return await api.categories.getPosts(metaId, page)
  }
  return await api.tags.getPosts(metaId, page)
}

const getPageCount = async (meta: string, metaId: string): Promise<{ pageCount: number }> => {
  if (meta === Meta.AUTHORS) {
    return await api.authors.getPostsCount(metaId)
  }
  if (meta === Meta.CATEGORIES) {
    return await api.categories.getPostsCount(metaId)
  }
  return await api.tags.getPostsCount(metaId)
}

const getTitle = async (meta: string, metaId: string): Promise<string> => {
  if (meta === Meta.AUTHORS) {
    const author = await api.authors.getAuthor(metaId)
    return `Author: ${author.name}`
  }
  if (meta === Meta.CATEGORIES) {
    const category = await api.categories.getCategory(metaId)
    return `Category: ${category.name}`
  }
  const tag = await api.tags.getTag(metaId)
  return `Tag: ${tag.name}`
}

const getAuthorPaths = async (): Promise<Array<{ params: MetaParamsType }>> => {
  const authors: AuthorType[] = await api.authors.getAllAuthors()
  const paths: Array<{ params: MetaParamsType }> = []
  await Promise.all(
    authors.map(async author => {
      const { pageCount } = await api.authors.getPostsCount(author.username)
      return getNumbersFrom1(pageCount).map(page => {
        paths.push({
          params: { metaId: author.username, meta: Meta.AUTHORS, page: `${page}` }
        })
        return {}
      })
    })
  )
  return paths
}

const getCategoriesPaths = async (): Promise<Array<{ params: MetaParamsType }>> => {
  const categories: CategoryType[] = await api.categories.getAllCategories()
  const paths: Array<{ params: MetaParamsType }> = []
  await Promise.all(
    categories.map(async category => {
      const { pageCount } = await api.categories.getPostsCount(category.url)
      return getNumbersFrom1(pageCount).map(page => {
        paths.push({
          params: { metaId: category.url, meta: Meta.CATEGORIES, page: `${page}` }
        })
        return {}
      })
    })
  )
  return paths
}

export { getTitle, getAllPosts, getPageCount, Meta, validPaths, getCategoriesPaths, getAuthorPaths }

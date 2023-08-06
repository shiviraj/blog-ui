import api, { AuthorGateway, CategoryGateway } from '../../api'
import type { AuthorType, CategoryType, PostSummaryType, TagType } from '../../api/dto'
import { getNumbersFrom1 } from '../../utils'

enum Meta {
  TAGS = 'tags',
  CATEGORIES = 'categories',
  AUTHORS = 'authors'
}

export type MetaParamsType = { metaId: string; meta: Meta; page: string; createdAt: string }

const validPaths: string[] = [Meta.TAGS, Meta.CATEGORIES, Meta.AUTHORS]

const getAllPosts = async (meta: string, metaId: string, page: number): Promise<PostSummaryType[]> => {
  if (meta === Meta.AUTHORS) {
    return await AuthorGateway.getPosts(metaId, page)
  }
  if (meta === Meta.CATEGORIES) {
    return await CategoryGateway.getPosts(metaId, page)
  }
  return await api.tags.getPosts(metaId, page)
}

const getPageCount = async (meta: string, metaId: string): Promise<{ pageCount: number }> => {
  if (meta === Meta.AUTHORS) {
    return await AuthorGateway.getPostsCount(metaId)
  }
  if (meta === Meta.CATEGORIES) {
    return await CategoryGateway.getPostsCount(metaId)
  }
  return await api.tags.getPostsCount(metaId)
}

const getTitle = async (meta: string, metaId: string): Promise<string> => {
  if (meta === Meta.AUTHORS) {
    const author = await AuthorGateway.getAuthor(metaId)
    return `Author: ${author.name}`
  }
  if (meta === Meta.CATEGORIES) {
    const category = await CategoryGateway.getCategory(metaId)
    return `Category: ${category.name}`
  }
  const tag = await api.tags.getTag(metaId)
  return `Tag: ${tag.name}`
}

const getAuthorPaths = async (): Promise<Array<{ params: MetaParamsType }>> => {
  const authors: AuthorType[] = await AuthorGateway.getAllAuthors()
  const paths: Array<{ params: MetaParamsType }> = []
  await Promise.all(
    authors.map(async author => {
      const { pageCount } = await AuthorGateway.getPostsCount(author.username)
      return getNumbersFrom1(pageCount).map(page => {
        paths.push({
          params: { metaId: author.username, meta: Meta.AUTHORS, page: `${page}`, createdAt: author.registeredAt }
        })
        return {}
      })
    })
  )
  return paths
}

const getCategoriesPaths = async (): Promise<Array<{ params: MetaParamsType }>> => {
  const categories: CategoryType[] = await CategoryGateway.getAllCategories()
  const paths: Array<{ params: MetaParamsType }> = []
  await Promise.all(
    categories.map(async category => {
      const { pageCount } = await CategoryGateway.getPostsCount(category.url)
      return getNumbersFrom1(pageCount).map(page => {
        paths.push({
          params: { metaId: category.url, meta: Meta.CATEGORIES, page: `${page}`, createdAt: category.createdAt }
        })
        return {}
      })
    })
  )
  return paths
}

const getTagsPaths = async (): Promise<Array<{ params: MetaParamsType }>> => {
  const tags: TagType[] = await api.tags.getAllTags()
  const paths: Array<{ params: MetaParamsType }> = []
  await Promise.all(
    tags.map(async (tag: TagType) => {
      const { pageCount } = await api.tags.getPostsCount(tag.url)
      return getNumbersFrom1(pageCount).map(page => {
        paths.push({
          params: { metaId: tag.url, meta: Meta.TAGS, page: `${page}`, createdAt: tag.createdAt }
        })
        return {}
      })
    })
  )
  return paths
}

export { getTitle, getAllPosts, getPageCount, Meta, validPaths, getCategoriesPaths, getAuthorPaths, getTagsPaths }

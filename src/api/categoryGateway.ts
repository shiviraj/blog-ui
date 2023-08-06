import { config } from '../config'
import type { PostCount, PostSummaryType } from './dto'
import type { CategoryType } from './dto'
import WebClient from 'web-client-starter/lib'

const categoryConfig = config.category
const CategoryGateway = {
  getAllCategories(): Promise<CategoryType[]> {
    return WebClient.get<CategoryType[]>({ baseUrl: categoryConfig.baseUrl, path: '' })
  },

  getPosts(categoryUrl: string, page: number): Promise<PostSummaryType[]> {
    return WebClient.get<PostSummaryType[]>({
      baseUrl: categoryConfig.baseUrl,
      path: categoryConfig.getPostsPath,
      uriVariables: { categoryUrl, page }
    })
  },

  getPostsCount(categoryUrl: string): Promise<PostCount> {
    return WebClient.get<PostCount>({
      baseUrl: categoryConfig.baseUrl,
      path: categoryConfig.getPostsCountPath,
      uriVariables: { categoryUrl }
    })
  },

  getCategory(categoryUrl: string): Promise<CategoryType> {
    return WebClient.get<CategoryType>({
      baseUrl: categoryConfig.baseUrl,
      path: categoryConfig.getCategoryPath,
      uriVariables: { categoryUrl }
    })
  },

  addNewCategory(category: { name: string; parentCategory: string }): Promise<CategoryType> {
    return WebClient.post<CategoryType>({
      baseUrl: categoryConfig.baseUrl,
      path: '',
      body: category
    })
  }
}

export default CategoryGateway

import fetch from '../adapter'
import type { CategoryType, PostCount, PostSummaryType } from '../dto'
import { METHODS } from './constants'

class Categories {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  getAllCategories(): Promise<CategoryType[]> {
    return fetch<CategoryType[]>(this.url)
  }

  getPosts(categoryUrl: string, page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/${categoryUrl}/page/${page}`)
  }

  getPostsCount(categoryUrl: string): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/${categoryUrl}/count`)
  }

  getCategory(categoryUrl: string): Promise<CategoryType> {
    return fetch<CategoryType>(`${this.url}/${categoryUrl}`)
  }

  addNewCategory(category: { name: string; parentCategory: string }): Promise<CategoryType> {
    return fetch<CategoryType>(`${this.url}`, category, { method: METHODS.POST })
  }
}

export default Categories

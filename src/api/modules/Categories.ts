import fetch from '../adapter'
import type { CategoryType, PostCount, PostSummaryType } from '../dto'

class Categories {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  getAllCategories(): Promise<CategoryType[]> {
    return fetch<CategoryType[]>(this.url)
  }

  // addNewCategory(value) {
  //   const options = { method: METHODS.POST, data: value }
  //   return fetch(`${this.url}`, options)
  // }
  //
  // getCategories(categories) {
  //   const options = { method: METHODS.POST, data: categories }
  //   return fetch(`${this.url}/categories`, options)
  // }
  //
  getPosts(categoryUrl: string, page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/${categoryUrl}/page/${page}`)
  }

  getPostsCount(categoryUrl: string): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/${categoryUrl}/count`)
  }

  getCategory(categoryUrl: string): Promise<CategoryType> {
    return fetch<CategoryType>(`${this.url}/${categoryUrl}`)
  }
}

export default Categories

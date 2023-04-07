import fetch from '../adapter'
import type { CategoryType } from '../dto'

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
  // getPosts(categoryUrl, page) {
  //   return fetch(`${this.url}/${categoryUrl}/page/${page}`)
  // }
  //
  // getPostsCount(categoryUrl) {
  //   return fetch(`${this.url}/${categoryUrl}/count`)
  // }
}

export default Categories

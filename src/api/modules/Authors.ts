import fetch from '../adapter'
import type { AuthorType, PostCount, PostSummaryType } from '../dto'

class Authors {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  // validateUser() {
  //   return axios.fetch(`${host}/api/users/validate`)
  // }
  //
  // logout() {
  //   return axios.fetch(`${host}/api/users/logout`)
  // }

  getAuthor(authorId: string): Promise<AuthorType> {
    return fetch<AuthorType>(`${this.url}/${authorId}`)
  }

  getPostsCount(authorId: string): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/${authorId}/count`)
  }

  getPosts(authorId: string, page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/${authorId}/page/${page}`)
  }

  getAllAuthors(): Promise<AuthorType[]> {
    return fetch<AuthorType[]>(this.url)
  }
}

export default Authors

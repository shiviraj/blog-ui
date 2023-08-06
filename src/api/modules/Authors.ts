import fetch from '../adapter'
import type { AuthorType, PostCount, PostSummaryType } from '../dto'
import { METHODS } from './constants'
import WebClient from 'web-client-starter/lib'

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

  getAuthor(username: string): Promise<AuthorType> {
    return WebClient.get<AuthorType>({ baseUrl: this.url, path: '/{username}', uriVariables: { username } })
  }

  getPostsCount(username: string): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/${username}/count`)
  }

  getPosts(username: string, page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/${username}/page/${page}`)
  }

  getAllAuthors(): Promise<AuthorType[]> {
    return fetch<AuthorType[]>(this.url)
  }

  getVisitorId(): Promise<{ visitorId: string }> {
    return fetch<{ visitorId: string }>(`${this.url}/visitor`)
  }

  login(values: { password: string; email: string }): Promise<{ token: string }> {
    return fetch<{ token: string }>(`${this.url}/login`, values, { method: METHODS.POST })
  }

  logout(): Promise<{ status: boolean }> {
    return fetch<{ status: boolean }>(`${this.url}/logout`)
  }

  validate(): Promise<AuthorType> {
    return fetch<AuthorType>(`${this.url}/validate`)
  }
}

export default Authors

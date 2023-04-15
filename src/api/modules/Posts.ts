import fetch from '../adapter'
import type { AuthorPostType, PostCount, PostDetailsType, PostSummaryType } from '../dto'
import { METHODS } from './constants'

class Posts {
  private readonly url: string
  private readonly validateUrl: string

  constructor(url: string) {
    this.url = url
    this.validateUrl = `${url}/validate`
  }

  getPostByUrl(postUrl: string): Promise<PostDetailsType> {
    return fetch<PostDetailsType>(`${this.url}/${postUrl}`)
  }

  getPosts(page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/page/${page}`)
  }

  getPostsCount(): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/count`)
  }

  toggleLike(postId: string, visitorId: string): Promise<{ likes: string[] }> {
    const options = { method: METHODS.PUT }
    return fetch<{ likes: string[] }>(`${this.url}/${postId}/user-reaction`, { visitorId }, options)
  }

  getAllMyPosts(): Promise<AuthorPostType[]> {
    return fetch<AuthorPostType[]>(this.validateUrl)
  }

  addNew(): Promise<AuthorPostType> {
    return fetch<AuthorPostType>(this.validateUrl, {}, { method: METHODS.POST })
  }

  getPostByPostId(postId: string): Promise<AuthorPostType> {
    return fetch<AuthorPostType>(`${this.validateUrl}/${postId}`)
  }

  publish(postId: string): Promise<{ status: boolean }> {
    return fetch<{ status: boolean }>(`${this.validateUrl}/${postId}/publish`, {}, { method: METHODS.PUT })
  }

  isUrlAvailable(postId: string, url: string): Promise<{ status: boolean }> {
    return fetch<{ status: boolean }>(`${this.validateUrl}/${postId}/url-available`, { url }, { method: METHODS.POST })
  }

  updatePost(post: AuthorPostType): Promise<{ status: boolean }> {
    return fetch<{ status: boolean }>(`${this.validateUrl}/${post.postId}`, { post }, { method: METHODS.PATCH })
  }
}

export default Posts

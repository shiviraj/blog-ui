import fetch from '../adapter'
import type { PostCount, PostDetailsType, PostSummaryType } from '../dto'

class Posts {
  private readonly url: string

  constructor(url: string) {
    this.url = url
  }

  // addPost(): Promise<unknown> {
  //   const options = { method: METHODS.POST }
  //   return fetch(`${this.url}/author`, options)
  // }

  // getPost(postId) {
  //   return fetch(`${this.url}/${postId}/author`)
  // }
  //
  // updatePost(post) {
  //   const options = { method: METHODS.PUT, data: post }
  //   return fetch(`${this.url}/${post.postId}/author`, options)
  // }
  //
  // getAllMyPosts(page, limit) {
  //   return fetch(`${this.url}/author/my-posts/page/${page}/limit/${limit}`)
  // }
  //
  // getMyPostsCount() {
  //   return fetch(`${this.url}/author/my-posts/count`)
  // }
  //
  // isUrlAvailable(postId, url) {
  //   return fetch(`${this.url}/${postId}/author/url-available/${url}`)
  // }

  getPostByUrl(postUrl: string): Promise<PostDetailsType> {
    return fetch<PostDetailsType>(`${this.url}/${postUrl}`)
  }

  // addLikeOrDislike(postId, likeOrDislike) {
  //   const options = { method: METHODS.PUT, data: likeOrDislike }
  //   return fetch(`${this.url}/${postId}`, options)
  // }

  getPosts(page: number): Promise<PostSummaryType[]> {
    return fetch<PostSummaryType[]>(`${this.url}/page/${page}`)
  }

  getPostsCount(): Promise<PostCount> {
    return fetch<PostCount>(`${this.url}/count`)
  }

  // getPostsByAuthor(userId) {
  //   return fetch(`${this.url}/author/${userId}`)
  // }
}

export default Posts

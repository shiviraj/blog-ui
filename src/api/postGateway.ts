import { config } from '../config'
import type { AuthorPostType, PostCount, PostDetailsType, PostSummaryType } from './dto'
import WebClient from './webClient'

const postConfig = config.post
const PostGateway = {
  getPostByUrl(postUrl: string): Promise<PostDetailsType> {
    return WebClient.get<PostDetailsType>({
      baseUrl: postConfig.baseUrl,
      path: postConfig.getPostByUrlPath,
      uriVariables: { postUrl }
    })
  },

  getPosts(page: number): Promise<PostSummaryType[]> {
    return WebClient.get<PostSummaryType[]>({
      baseUrl: postConfig.baseUrl,
      path: postConfig.getPostsPath,
      uriVariables: { page }
    })
  },

  getPostsCount(): Promise<PostCount> {
    return WebClient.get<PostCount>({ baseUrl: postConfig.baseUrl, path: postConfig.getPostsCountPath })
  },

  toggleLike(postId: string, visitorId: string): Promise<{ likes: string[] }> {
    return WebClient.put<{ likes: string[] }>({
      baseUrl: postConfig.baseUrl,
      path: postConfig.toggleLikePath,
      body: { visitorId },
      uriVariables: { postId }
    })
  },

  getAllMyPosts(): Promise<AuthorPostType[]> {
    return WebClient.get<AuthorPostType[]>({ baseUrl: postConfig.validatedBaseUrl, path: '' })
  },

  addNew(): Promise<AuthorPostType> {
    return WebClient.post<AuthorPostType>({ baseUrl: postConfig.validatedBaseUrl, path: '', body: {} })
  },

  getPostByPostId(postId: string): Promise<AuthorPostType> {
    return WebClient.get<AuthorPostType>({
      baseUrl: postConfig.validatedBaseUrl,
      path: postConfig.getPostsByPostIdPath,
      uriVariables: { postId }
    })
  },

  publish(postId: string): Promise<{ status: boolean }> {
    return WebClient.put<{ status: boolean }>({
      baseUrl: postConfig.validatedBaseUrl,
      path: postConfig.publishPath,
      uriVariables: { postId }
    })
  },

  isUrlAvailable(postId: string, url: string): Promise<{ status: boolean }> {
    return WebClient.post<{ status: boolean }>({
      baseUrl: postConfig.validatedBaseUrl,
      path: postConfig.isUrlAvailablePath,
      body: { url },
      uriVariables: { postId }
    })
  },

  updatePost(post: AuthorPostType): Promise<{ status: boolean }> {
    return WebClient.patch<{ status: boolean }>({
      baseUrl: postConfig.validatedBaseUrl,
      path: postConfig.getPostsByPostIdPath,
      body: { post },
      uriVariables: { postId: post.postId }
    })
  }
}

export default PostGateway
